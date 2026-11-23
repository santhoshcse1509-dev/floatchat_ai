$files = @(
    "e:\minipro\index.html",
    "e:\minipro\app_component.js",
    "e:\minipro\FloatChat\index.html",
    "e:\minipro\FloatChat\FloatChat_Merged.html"
)

foreach ($f in $files) {
    if (Test-Path $f) {
        $raw = [System.IO.File]::ReadAllText($f, [System.Text.Encoding]::UTF8)
        $clean = $raw -replace "`f", "f"
        $clean = $clean -replace [char]12, ""
        [System.IO.File]::WriteAllText($f, $clean, [System.Text.Encoding]::UTF8)
        Write-Host "Cleaned $f"
    }
}
