$path = "e:\minipro\app_component.js"
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

$regex = "(\r?\n\s+</div>\r?\n\s+\);\r?\n}\r?\n\r?\n// =+\r?\n// ROOT APPLICATION COMPONENT)"

$modalCode = @"

      {/* Gemini AI Settings Modal */}
      <GeminiModal
        isOpen={geminiModalOpen}
        onClose={() => setGeminiModalOpen(false)}
        onUpdate={() => setIsGeminiActive(localStorage.getItem('floatchat_gemini_enabled') === 'true' && !!localStorage.getItem('floatchat_gemini_api_key'))}
      />
"@

if ($content -match $regex) {
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, "(\r?\n\s+</div>)(\r?\n\s+\);\r?\n}\r?\n\r?\n// =+\r?\n// ROOT APPLICATION COMPONENT)", "`$1$modalCode`$2")
    [System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Success: Inserted GeminiModal into ChatView in app_component.js!"
} else {
    Write-Host "Regex did not match."
}

& "e:\minipro\merge_app.ps1"
