import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const GEMINI_MODEL = 'gemini-4-hydrogen';
const TRANSCRIBE_MODEL = 'gemini-3.5-transcribe';
let resolvedTranscribeModel = TRANSCRIBE_MODEL;

app.use(express.json({ limit: '15mb' }));

function getGeminiClient() {
  const apiKey = (process.env.GEMINI_API_KEY || '').trim();
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const LANG_NAMES = {
  en: 'English',
  ta: 'Tamil (தமிழ்)',
  hi: 'Hindi (हिन्दी)',
  te: 'Telugu (తెలుగు)',
  ml: 'Malayalam (മലയാളം)',
};

function buildSystemInstruction(lang, datasetContext) {
  const langLabel = LANG_NAMES[lang] || 'English';
  const ctx = datasetContext || {};

  return `You are FloatChat, a knowledgeable, conversational AI Large Language Model assistant specializing in oceanography, climate science, marine engineering, data analysis, and general world knowledge — with live access to verified Indian Ocean ARGO Float datasets (January 2024 – February 2026).

YOUR DUAL CAPABILITIES:
1. **Beyond the Dataset (Open-Domain LLM Intelligence):** You can answer ANY question beyond the ARGO dataset — including global oceanography (Pacific, Atlantic, Southern, Arctic oceans, Mariana Trench, ENSO / El Niño, Indian Ocean Dipole, thermohaline circulation, ocean acidification, sea-level rise), marine engineering (how ARGO floats pump hydraulic oil to change buoyancy without propellers), meteorology, physics, chemistry, coding (Python, NetCDF, R, SQL), and general educational or everyday questions. Never refuse a valid question just because it is outside the dataset!
2. **Dataset-Grounded Precision (When Referring to Loaded ARGO Data):** When the user asks about our loaded ARGO floats (${ctx.floatCount ?? 9} buoys, ${(ctx.obsCount ?? 1960).toLocaleString()} observations across ${ctx.datasetCount ?? 4} datasets), specific float IDs, cycles, depths, or comparisons in those archives, rely strictly on the verified ARGO DATASET CONTEXT below and never fabricate measurements for those records. If both general science and dataset metrics help answer the question, clearly distinguish which numbers come from the loaded ARGO observations vs. broader scientific knowledge.

${ctx.summaryBlock ? `VERIFIED ARGO DATASET CONTEXT (FOR DATASET-RELATED QUERIES):
${ctx.summaryBlock}
` : ''}${ctx.matchedSummary ? `QUERY-SCOPED FILTER MATCH:
${ctx.matchedSummary}
` : ''}${ctx.sampleObservations && ctx.sampleObservations.length > 0 ? `RELEVANT ARGO SAMPLE OBSERVATIONS:
${JSON.stringify(ctx.sampleObservations)}
` : ''}
RESPONSE STYLE:
- Respond fluently in ${langLabel}.
- Keep responses clear, engaging, well-structured with concise markdown headings, bullet points, and bolded key values (aim for ~120–280 words unless the user asks for a detailed breakdown or code example).
- Support natural multi-turn follow-up questions seamlessly.`;
}

function classifyGeminiError(err) {
  const status = Number(err?.status || err?.code || 500);
  const msg = String(err?.message || 'Unexpected error communicating with Gemini API');

  if (status === 400 || msg.includes('API_KEY_INVALID') || msg.includes('API key not valid')) {
    return {
      httpStatus: 400,
      code: 'API_KEY_INVALID',
      error: 'The server Gemini API key is invalid. Please verify GEMINI_API_KEY in Settings > Secrets.',
    };
  }
  if (status === 403 || msg.includes('PERMISSION_DENIED')) {
    return {
      httpStatus: 403,
      code: 'PERMISSION_DENIED',
      error: 'Gemini API permission denied (403). Please check your API key in Settings > Secrets.',
    };
  }
  if (status === 429 || msg.includes('RESOURCE_EXHAUSTED')) {
    return {
      httpStatus: 429,
      code: 'RESOURCE_EXHAUSTED',
      error: 'Gemini API rate limit or quota reached (429). Please wait a moment or check your billing quota in Settings > Secrets.',
    };
  }
  if (status === 404 || msg.includes('NOT_FOUND')) {
    return {
      httpStatus: 404,
      code: 'MODEL_NOT_FOUND',
      error: 'Requested Gemini model was not found or is unavailable.',
    };
  }
  return {
    httpStatus: status >= 400 && status < 600 ? status : 500,
    code: 'UPSTREAM_ERROR',
    error: `Gemini LLM request failed: ${msg}`,
  };
}

app.get('/api/chat/status', (_req, res) => {
  const configured = Boolean((process.env.GEMINI_API_KEY || '').trim());
  res.json({
    configured,
    model: GEMINI_MODEL,
    transcribeModel: TRANSCRIBE_MODEL,
  });
});

app.post('/api/transcribe', async (req, res) => {
  const { audioBase64, mimeType = 'audio/webm', lang = 'en' } = req.body || {};

  if (typeof audioBase64 !== 'string' || !audioBase64.trim()) {
    return res.status(400).json({
      code: 'INVALID_AUDIO',
      error: 'Recorded audio data is required.',
    });
  }

  const ai = getGeminiClient();
  if (!ai) {
    return res.status(503).json({
      code: 'API_KEY_MISSING',
      error: 'Gemini API key is not configured on the server for voice transcription.',
    });
  }

  const cleanMime = String(mimeType || 'audio/webm').split(';')[0].trim().toLowerCase();
  const allowedMimes = ['audio/webm', 'audio/mp4', 'audio/ogg', 'audio/wav', 'audio/mpeg', 'audio/aac', 'audio/flac'];
  const safeMime = allowedMimes.includes(cleanMime) ? cleanMime : 'audio/webm';
  const langLabel = LANG_NAMES[lang] || 'English';

  const audioPart = {
    inlineData: {
      mimeType: safeMime,
      data: audioBase64.trim(),
    },
  };

  const candidateModels = resolvedTranscribeModel === GEMINI_MODEL ? [GEMINI_MODEL] : [TRANSCRIBE_MODEL, GEMINI_MODEL];
  let lastErr = null;
  for (const modelName of candidateModels) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: {
            parts: [
              audioPart,
              {
                text: `Listen carefully to this audio recording. Output ONLY the exact words clearly spoken by a person (in ${langLabel}), with no quotes or commentary. CRITICAL: If the audio contains only silence, static, clicks, or background noise with no intelligible spoken words, do NOT invent or guess a sentence — reply with exact token: [SILENCE]`,
              },
            ],
          },
        });

        const rawText = (response.text || '').trim();
        if (!rawText || rawText.includes('[SILENCE]')) {
          return res.json({ text: '', model: modelName });
        }
        return res.json({ text: rawText, model: modelName });
      } catch (err) {
        lastErr = err;
        const status = Number(err?.status || 0);
        if (status === 404 || String(err?.message || '').includes('NOT_FOUND')) {
          if (modelName === TRANSCRIBE_MODEL) {
            resolvedTranscribeModel = GEMINI_MODEL;
          }
          break;
        }
        const isTransient = !status || status === 429 || status >= 500;
        if (attempt === 0 && isTransient) {
          await new Promise((r) => setTimeout(r, 500));
          continue;
        }
        break;
      }
    }
  }

  const classified = classifyGeminiError(lastErr);
  return res.status(classified.httpStatus).json({
    code: classified.code,
    error: classified.error,
  });
});

app.post('/api/chat', async (req, res) => {
  const { query, lang = 'en', history = [], datasetContext = null } = req.body || {};

  if (typeof query !== 'string' || !query.trim()) {
    return res.status(400).json({
      code: 'INVALID_INPUT',
      error: 'A non-empty question string is required.',
    });
  }

  const cleanQuery = query.trim().slice(0, 4000);
  const ai = getGeminiClient();

  if (!ai) {
    return res.status(503).json({
      code: 'API_KEY_MISSING',
      error: 'Gemini LLM API key is not configured on the server. Please add GEMINI_API_KEY in Settings > Secrets.',
    });
  }

  const sanitizedHistory = Array.isArray(history)
    ? history
        .filter((h) => h && typeof h.text === 'string' && h.text.trim())
        .slice(-10)
        .map((h) => ({
          role: h.role === 'assistant' || h.role === 'model' ? 'model' : 'user',
          parts: [{ text: h.text.trim().slice(0, 3000) }],
        }))
    : [];

  const contents = [
    ...sanitizedHistory,
    {
      role: 'user',
      parts: [{ text: cleanQuery }],
    },
  ];

  const systemInstruction = buildSystemInstruction(lang, datasetContext);

  let lastErr = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents,
        config: {
          systemInstruction,
        },
      });

      const answer = (response.text || '').trim();
      if (!answer) {
        return res.status(502).json({
          code: 'EMPTY_RESPONSE',
          error: 'Gemini LLM returned an empty response. Please try rephrasing your question.',
        });
      }

      return res.json({
        answer,
        model: GEMINI_MODEL,
      });
    } catch (err) {
      lastErr = err;
      const status = Number(err?.status || 0);
      const isTransient = !status || status === 429 || status >= 500;
      if (attempt < 2 && isTransient) {
        await new Promise((r) => setTimeout(r, 600 * Math.pow(2, attempt)));
        continue;
      }
      break;
    }
  }

  const classified = classifyGeminiError(lastErr);
  return res.status(classified.httpStatus).json({
    code: classified.code,
    error: classified.error,
  });
});

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`FloatChat server running at http://0.0.0.0:${PORT}`);
});
