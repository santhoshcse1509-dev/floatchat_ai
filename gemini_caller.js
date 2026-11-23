  // ========================================================================
  // GEMINI API DIRECT REST INTEGRATION (Browser-to-Cloud with Zero-Fabrication RAG)
  // ========================================================================
  async callGemini(query, lang = 'en') {
    const key = localStorage.getItem('floatchat_gemini_api_key');
    if (!key) return null;

    const allObs = this.data.observations || [];
    const floats = this.data.floats || [];
    const tStats = this.computeStats(allObs, 'temperature');
    const sStats = this.computeStats(allObs, 'salinity');

    // Sample 25 representative profiles across regions and depths
    const sampleObs = allObs.filter((_, i) => i % 50 === 0).slice(0, 25);
    const systemPrompt = `You are FloatChat, a student-built scientific oceanographic AI assistant for the Indian Ocean ARGO Float dataset (January 15 – June 20, 2024).

GROUNDED ARGO DATASET SPECIFICATIONS (ZERO-FABRICATION RULE):
1. Active Fleet: 4 Autonomous Profiling ARGO Buoys
   - Float 1902456: Arabian Sea (West Coast of India, 14.28°N, 68.25°E) — Hot desert evaporative basin, highest ocean salinity up to 37.78 PSU.
   - Float 2901633: Western Bay of Bengal (near Tamil Nadu / Sri Lanka, 11.15°N, 81.86°E) — Ganges river discharge dilution, surface salinity down to 33.10 PSU.
   - Float 5906421: Equatorial Indian Ocean (south of Sri Lanka, 4.43°N, 80.02°E) — Tropical open ocean warm pool, warmest surface temperatures up to 31.69°C.
   - Float 6903210: Eastern Bay of Bengal (near Andaman Sea, 13.02°N, 88.84°E) — Southwest monsoon onset transition.
2. Dataset Archives: 3 registered archives containing 1,720 deduplicated scientific depth observations.
3. Physical Variables:
   - Water Temperature: Mean ${tStats?.avg}°C (from 4.01°C at 2,000m to 31.69°C at surface).
   - Salinity: Mean ${sStats?.avg} PSU (from 33.10 PSU to 37.78 PSU).
   - Thermocline: Between 100m and 500m where temperature plunges by >16°C.
4. Float Mechanics: Robotic buoys adjust internal hydraulic bladder oil to dive to 2,000m on a 10-day cycle, measuring profiles during ascent. They do NOT carry fish-finding sensors, cameras, or sonar.

SAMPLE OBSERVATIONS:
${JSON.stringify(sampleObs.map(o => ({ id: o.float_id, date: o.date, depth: o.depth, temp: o.temperature, sal: o.salinity, lat: o.latitude, lon: o.longitude })))}

INSTRUCTIONS:
- Answer the user's question accurately, educationally, and conversationally based on these verified ARGO ocean measurements.
- If the question asks about fish, weather, or non-ARGO sensors, politely clarify that ARGO buoys record physical ocean variables (temperature, salinity, depth, pressure).
- Language: Reply fluently in ${lang === 'ta' ? 'Tamil (தமிழ்)' : (lang === 'hi' ? 'Hindi (हिन्दी)' : (lang === 'te' ? 'Telugu (తెలుగు)' : (lang === 'ml' ? 'Malayalam (മലയാളം)' : 'English')))}.
- Use clear markdown formatting (bold key numbers, bullet points).`;

    const candidateModels = [
      'gemini-1.5-flash',
      'gemini-2.5-flash',
      'gemini-flash-latest',
      'gemini-3.8-flash'
    ];

    const payload = {
      contents: [
        {
          role: "user",
          parts: [
            { text: `${systemPrompt}\n\nUser Question: ${query}` }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 800
      }
    };

    let lastError = null;
    for (const model of candidateModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key.trim())}`;
        const resp = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (resp.ok) {
          const data = await resp.json();
          const ans = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (ans) return ans;
        } else {
          const errData = await resp.json().catch(() => ({}));
          lastError = errData.error?.message || `Status ${resp.status}`;
        }
      } catch (err) {
        lastError = err.message;
      }
    }

    throw new Error(lastError || "Could not reach Gemini API");
  },
