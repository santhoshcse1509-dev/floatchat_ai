// 4. Gemini AI Settings Modal Component
function GeminiModal({ isOpen, onClose, onUpdate }) {
  const [keyInput, setKeyInput] = useState(() => localStorage.getItem('floatchat_gemini_api_key') || '');
  const [isEnabled, setIsEnabled] = useState(() => localStorage.getItem('floatchat_gemini_enabled') === 'true');
  const [status, setStatus] = useState(null);
  const [testing, setTesting] = useState(false);
  const [showKey, setShowKey] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    const trimmed = keyInput.trim();
    if (trimmed) {
      localStorage.setItem('floatchat_gemini_api_key', trimmed);
      localStorage.setItem('floatchat_gemini_enabled', isEnabled ? 'true' : 'false');
      setStatus({ type: 'success', msg: isEnabled ? 'Gemini API Key saved and enabled!' : 'Gemini API Key saved (currently disabled).' });
    } else {
      localStorage.removeItem('floatchat_gemini_api_key');
      localStorage.setItem('floatchat_gemini_enabled', 'false');
      setStatus({ type: 'info', msg: 'API Key cleared. FloatChat will use the offline scientific engine.' });
    }
    if (onUpdate) onUpdate();
    setTimeout(() => {
      onClose();
    }, 900);
  };

  const handleTestKey = async () => {
    const trimmed = keyInput.trim();
    if (!trimmed) {
      setStatus({ type: 'error', msg: 'Please enter a Gemini API Key first.' });
      return;
    }
    setTesting(true);
    setStatus(null);
    const candidateModels = ['gemini-1.5-flash', 'gemini-2.5-flash', 'gemini-flash-latest', 'gemini-3.8-flash'];
    let lastError = '';
    let connected = false;

    for (const model of candidateModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(trimmed)}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: 'Hello, confirm in one word: ready' }] }],
            generationConfig: { maxOutputTokens: 10 }
          })
        });
        if (res.ok) {
          setIsEnabled(true);
          localStorage.setItem('floatchat_gemini_api_key', trimmed);
          localStorage.setItem('floatchat_gemini_enabled', 'true');
          setStatus({ type: 'success', msg: `Success! Connected to Google Gemini (${model}).` });
          connected = true;
          if (onUpdate) onUpdate();
          break;
        } else {
          const errData = await res.json().catch(() => ({}));
          lastError = errData.error?.message || `HTTP ${res.status}`;
        }
      } catch (e) {
        lastError = e.message;
      }
    }

    if (!connected) {
      if (lastError.includes('denied access') || lastError.includes('PERMISSION_DENIED') || lastError.includes('403')) {
        setStatus({
          type: 'error',
          msg: `Google Cloud Error: Project access denied (403 Forbidden). Please generate a standard API key (starting with AIzaSy...) at aistudio.google.com.`
        });
      } else {
        setStatus({ type: 'error', msg: `Connection failed: ${lastError || 'Invalid API Key'}` });
      }
    }
    setTesting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-beige shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-beige bg-ivory-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white text-base shadow-xs">
              ✨
            </div>
            <div>
              <h3 className="text-sm font-bold text-charcoal font-heading">Google Gemini AI Setup</h3>
              <p className="text-[11px] text-charcoal-muted">Connect your Gemini API Key</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg border border-beige bg-white text-charcoal-muted hover:text-charcoal flex items-center justify-center text-xs"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 text-xs text-charcoal">
          <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200/80 text-purple-900 text-[11px] leading-relaxed">
            <div className="font-semibold mb-1 flex items-center gap-1.5">
              <span>🚀 Why connect Gemini?</span>
            </div>
            FloatChat will feed retrieved ARGO depth observations into Gemini, allowing the AI to answer <strong>any conversational phrasing</strong> with fluent, grounded explanations in English, Tamil, Hindi, Telugu, or Malayalam.
          </div>

          <div>
            <label className="block font-semibold mb-1 text-charcoal">Gemini API Key:</label>
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                value={keyInput}
                onChange={e => setKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-ivory-50 border border-beige rounded-lg px-3 py-2 pr-16 text-xs text-charcoal font-mono outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowKey(s => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-charcoal-muted hover:text-charcoal px-1.5 py-0.5 rounded border border-beige bg-white"
              >
                {showKey ? "Hide" : "Show"}
              </button>
            </div>
            <p className="text-[10px] text-charcoal-muted mt-1">
              Key is stored only in your browser's private <code className="bg-ivory px-1 rounded">localStorage</code> and never logged or shared.
            </p>
          </div>

          {/* Toggle Enable */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-ivory border border-beige">
            <div>
              <div className="font-semibold text-xs">Enable Generative Gemini Answers</div>
              <p className="text-[10px] text-charcoal-muted">Switch off anytime to use the offline statistical engine</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isEnabled}
                onChange={e => setIsEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-beige peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-beige after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {/* Status Message */}
          {status && (
            <div className={`p-2.5 rounded-lg text-[11px] font-medium leading-relaxed ${
              status.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
              status.type === 'error' ? 'bg-rose-50 text-rose-800 border border-rose-200' :
              'bg-blue-50 text-blue-800 border border-blue-200'
            }`}>
              {status.msg}
            </div>
          )}

          {/* AI Studio Link */}
          <div className="text-[11px] text-charcoal-muted">
            Don't have a Gemini API key?{' '}
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800 font-semibold underline"
            >
              Get a free API key at Google AI Studio ↗
            </a>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-beige bg-ivory-50 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleTestKey}
            disabled={testing || !keyInput.trim()}
            className="px-3 py-1.5 rounded-lg border border-beige bg-white text-xs font-semibold text-charcoal hover:bg-ivory disabled:opacity-40"
          >
            {testing ? "Testing..." : "⚡ Test Key"}
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg border border-beige bg-white text-xs font-medium text-charcoal hover:bg-ivory"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold hover:opacity-90 shadow-xs"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
