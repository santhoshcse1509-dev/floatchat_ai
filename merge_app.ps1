# merge_app.ps1
$ErrorActionPreference = "Stop"

$headerPath = "e:\minipro\index_header.html"
$componentPath = "e:\minipro\app_component.js"

if (-not (Test-Path $headerPath)) {
    Write-Host "Regenerating index_header.html..."
    & "e:\minipro\update_index_header.ps1"
}

Write-Host "Reading index_header.html..."
$headerContent = [System.IO.File]::ReadAllText($headerPath, [System.Text.Encoding]::UTF8)

Write-Host "Reading app_component.js..."
$componentContent = [System.IO.File]::ReadAllText($componentPath, [System.Text.Encoding]::UTF8)

# Build merged HTML
$builder = New-Object System.Text.StringBuilder
[void]$builder.AppendLine($headerContent)
[void]$builder.AppendLine("")
[void]$builder.AppendLine('  <script type="text/babel">')
[void]$builder.AppendLine($componentContent)
[void]$builder.AppendLine('  </script>')
[void]$builder.AppendLine('</body>')
[void]$builder.AppendLine('</html>')

$finalHtml = $builder.ToString()

# Target file paths
$targets = @(
    "e:\minipro\index.html",
    "e:\minipro\FloatChat\index.html",
    "e:\minipro\FloatChat\FloatChat_Merged.html"
)

foreach ($target in $targets) {
    [System.IO.File]::WriteAllText($target, $finalHtml, [System.Text.Encoding]::UTF8)
    Write-Host "Updated $target (size: $($finalHtml.Length) chars)"
}

Write-Host "Merge completed successfully!"
