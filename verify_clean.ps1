$files = @("e:\minipro\index.html", "e:\minipro\app_component.js")
foreach ($f in $files) {
    $raw = [System.IO.File]::ReadAllText($f, [System.Text.Encoding]::UTF8)
    $hasFF = $raw.IndexOf([char]12) -ge 0
    Write-Host "$f has form-feed: $hasFF"
}
