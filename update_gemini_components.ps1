# update_gemini_components.ps1
$ErrorActionPreference = "Stop"

$appPath = "e:\minipro\app_component.js"
$content = [System.IO.File]::ReadAllText($appPath, [System.Text.Encoding]::UTF8)

$callerCode = [System.IO.File]::ReadAllText("e:\minipro\gemini_caller.js", [System.Text.Encoding]::UTF8)
$modalCode = [System.IO.File]::ReadAllText("e:\minipro\gemini_modal.js", [System.Text.Encoding]::UTF8)

# 1. Replace callGemini block
$callerStartMarker = "  // ========================================================================"
$callerEndMarker = "  async answerQuestion(rawQuery, preferredLang = 'en') {"
$idxStart = $content.IndexOf($callerStartMarker)
$idxEnd = $content.IndexOf($callerEndMarker)

if ($idxStart -ge 0 -and $idxEnd -gt $idxStart) {
    $content = $content.Substring(0, $idxStart) + $callerCode.Trim() + "`r`n`r`n" + $content.Substring($idxEnd)
    Write-Host "Replaced callGemini method in FloatChatAI."
} else {
    Write-Host "Warning: Could not isolate old callGemini block, checking if fresh insertion is needed."
}

# 2. Replace GeminiModal block
$modalStartMarker = "// 4. Gemini AI Settings Modal Component"
$modalEndMarker = "// CHAT VIEW (With Responsive 'Who Can Use FloatChat?' Sidebar)"
$mStart = $content.IndexOf($modalStartMarker)
$mEnd = $content.IndexOf($modalEndMarker)

if ($mStart -ge 0 -and $mEnd -gt $mStart) {
    $content = $content.Substring(0, $mStart) + $modalCode.Trim() + "`r`n`r`n" + $content.Substring($mEnd)
    Write-Host "Replaced GeminiModal component."
} else {
    Write-Host "Warning: Could not isolate old GeminiModal component."
}

[System.IO.File]::WriteAllText($appPath, $content, [System.Text.Encoding]::UTF8)
Write-Host "Saved updated app_component.js."

# 3. Merge everything into all html bundles
& "e:\minipro\merge_app.ps1"
Write-Host "All bundles updated successfully!"
