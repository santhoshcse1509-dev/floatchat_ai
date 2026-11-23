# add_gemini_to_app.ps1
$ErrorActionPreference = "Stop"

$appPath = "e:\minipro\app_component.js"
$geminiCallerPath = "e:\minipro\gemini_caller.js"
$geminiModalPath = "e:\minipro\gemini_modal.js"

Write-Host "Reading $appPath..."
$content = [System.IO.File]::ReadAllText($appPath, [System.Text.Encoding]::UTF8)

$callerCode = [System.IO.File]::ReadAllText($geminiCallerPath, [System.Text.Encoding]::UTF8)
$modalCode = [System.IO.File]::ReadAllText($geminiModalPath, [System.Text.Encoding]::UTF8)

# 1. Insert callGemini into FloatChatAI right before answerQuestion
$answerQMarker = "  async answerQuestion(rawQuery, preferredLang = 'en') {"
if (-not $content.Contains("callGemini(query, lang = 'en')")) {
    $idxAnswerQ = $content.IndexOf($answerQMarker)
    if ($idxAnswerQ -lt 0) { throw "Could not find answerQuestion in app_component.js" }
    
    $geminiCheckCode = @"
    // Check if Google Gemini AI is enabled and configured
    const geminiEnabled = localStorage.getItem('floatchat_gemini_enabled') === 'true';
    const geminiKey = localStorage.getItem('floatchat_gemini_api_key');
    if (geminiEnabled && geminiKey) {
      try {
        const geminiAnswer = await this.callGemini(query, activeLang);
        if (geminiAnswer) {
          const isMap = /where|map|location|position|float\s*positions/i.test(qLower);
          return {
            answer: geminiAnswer + "\n\n*(✨ Answered by Google Gemini 1.5 Flash grounded in ARGO ocean observations)*",
            visualization_type: isMap ? 'map' : 'depth_profile',
            visualization_data: isMap ? floats : allObs.slice(0, 35)
          };
        }
      } catch (geminiErr) {
        console.warn("Gemini API call failed, falling back to local engine:", geminiErr);
      }
    }

"@

    $insertCaller = $callerCode.Trim() + "`r`n`r`n"
    $content = $content.Substring(0, $idxAnswerQ) + $insertCaller + $answerQMarker + "`r`n" + $geminiCheckCode + $content.Substring($idxAnswerQ + $answerQMarker.Length)
    Write-Host "Added callGemini and Gemini check in FloatChatAI."
}

# 2. Insert GeminiModal component before ChatView
$chatViewMarker = "// CHAT VIEW (With Responsive 'Who Can Use FloatChat?' Sidebar)"
if (-not $content.Contains("function GeminiModal(")) {
    $idxChatView = $content.IndexOf($chatViewMarker)
    if ($idxChatView -lt 0) { throw "Could not find ChatView marker in app_component.js" }
    
    $content = $content.Substring(0, $idxChatView) + $modalCode.Trim() + "`r`n`r`n" + $content.Substring($idxChatView)
    Write-Host "Added GeminiModal component."
}

# 3. Add Gemini modal state in ChatView
$chatStateAnchor = "  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);"
$newStates = $chatStateAnchor + "`r`n" + @"
  const [geminiModalOpen, setGeminiModalOpen] = useState(false);
  const [isGeminiActive, setIsGeminiActive] = useState(() => {
    return localStorage.getItem('floatchat_gemini_enabled') === 'true' && !!localStorage.getItem('floatchat_gemini_api_key');
  });
"@
if (-not $content.Contains("const [geminiModalOpen, setGeminiModalOpen]")) {
    $content = $content.Replace($chatStateAnchor, $newStates)
    Write-Host "Added geminiModalOpen and isGeminiActive states."
}

# 4. Add Gemini button into Chat header
$chatHeaderAnchor = '<h1 className="text-sm sm:text-base font-bold text-charcoal font-heading truncate">{t.chatTitle}</h1>'
$buttonCode = @"
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-bold text-charcoal font-heading truncate">{t.chatTitle}</h1>
                <button
                  type="button"
                  onClick={() => setGeminiModalOpen(true)}
                  className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-semibold transition-all ${
                    isGeminiActive
                      ? 'bg-purple-100/80 border-purple-300 text-purple-700 shadow-xs'
                      : 'bg-ivory border-beige text-charcoal-muted hover:text-charcoal hover:border-sage'
                  }`}
                  title="Configure Google Gemini 1.5 Flash API Key"
                >
                  <span className="text-xs">✨</span>
                  <span>Gemini AI</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${isGeminiActive ? 'bg-purple-600 animate-pulse' : 'bg-charcoal-muted/30'}`}></span>
                </button>
              </div>
"@
if (-not $content.Contains("Configure Google Gemini 1.5 Flash API Key")) {
    $content = $content.Replace($chatHeaderAnchor, $buttonCode)
    Write-Host "Added Gemini AI button in chat header."
}

# 5. Render GeminiModal at the bottom of ChatView
$chatViewEndAnchor = "        {/* Mobile Slide-over Drawer */}"
$modalRender = @"
      {/* Gemini AI Settings Modal */}
      <GeminiModal
        isOpen={geminiModalOpen}
        onClose={() => setGeminiModalOpen(false)}
        onUpdate={() => setIsGeminiActive(localStorage.getItem('floatchat_gemini_enabled') === 'true' && !!localStorage.getItem('floatchat_gemini_api_key'))}
      />

"@
if (-not $content.Contains("<GeminiModal")) {
    $content = $content.Replace($chatViewEndAnchor, $modalRender + $chatViewEndAnchor)
    Write-Host "Rendered GeminiModal in ChatView."
}

[System.IO.File]::WriteAllText($appPath, $content, [System.Text.Encoding]::UTF8)
Write-Host "Updated app_component.js (new size: $($content.Length) chars)"

# Run merge_app.ps1
& "e:\minipro\merge_app.ps1"

Write-Host "GEMINI INTEGRATION COMPLETED AND BUNDLES REBUILT!"
