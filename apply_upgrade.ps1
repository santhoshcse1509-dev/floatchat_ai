# apply_upgrade.ps1
$ErrorActionPreference = "Stop"

$appPath = "e:\minipro\app_component.js"
$newIntentsPath = "e:\minipro\new_intents.js"
$newMonthPath = "e:\minipro\new_month.js"

Write-Host "Reading $appPath..."
$appContent = [System.IO.File]::ReadAllText($appPath, [System.Text.Encoding]::UTF8)

Write-Host "Reading $newIntentsPath..."
$newIntents = [System.IO.File]::ReadAllText($newIntentsPath, [System.Text.Encoding]::UTF8)

Write-Host "Reading $newMonthPath..."
$newMonth = [System.IO.File]::ReadAllText($newMonthPath, [System.Text.Encoding]::UTF8)

# 1. Add mentionedMonth detection if not already present
if (-not $appContent.Contains("let mentionedMonth = null;")) {
    $regionAnchor = "this.context.lastRegion = 'Equatorial Indian Ocean';" + "`r`n" + "    }"
    if (-not $appContent.Contains($regionAnchor)) {
        $regionAnchor = "this.context.lastRegion = 'Equatorial Indian Ocean';" + "`n" + "    }"
    }
    
    if ($appContent.Contains($regionAnchor)) {
        $monthBlock = $regionAnchor + "`r`n`r`n" + $newMonth.Trim()
        $appContent = $appContent.Replace($regionAnchor, $monthBlock)
        Write-Host "Added mentionedMonth parsing."
    } else {
        Write-Host "Region anchor not matched, searching with regex..."
        $rIdx = $appContent.IndexOf("Equatorial Indian Ocean")
        if ($rIdx -gt 0) {
            $closeBraceIdx = $appContent.IndexOf("}", $rIdx)
            if ($closeBraceIdx -gt 0) {
                $appContent = $appContent.Substring(0, $closeBraceIdx + 1) + "`r`n`r`n" + $newMonth.Trim() + $appContent.Substring($closeBraceIdx + 1)
                Write-Host "Added mentionedMonth parsing via offset."
            }
        }
    }
}

# 2. Find Intent 6 start
$intent6Marker = "// INTENT 6: GENERAL OCEAN SCIENCE CONCEPTS"
$idxStart = $appContent.IndexOf($intent6Marker)
if ($idxStart -lt 0) {
    throw "Could not locate Intent 6 in app_component.js"
}

# Walk backwards to start of comment block
$divider = "    // ========================================================================"
$idxStart = $appContent.LastIndexOf($divider, $idxStart)

# 3. Find end of FloatChatAI object: closing of answerQuestion and FloatChatAI
$objEndMarker = "// ============================================================================" + "`r`n" + "// REACT SUB-COMPONENTS"
$idxEnd = $appContent.IndexOf($objEndMarker, $idxStart)
if ($idxEnd -lt 0) {
    $objEndMarker = "// ============================================================================" + "`n" + "// REACT SUB-COMPONENTS"
    $idxEnd = $appContent.IndexOf($objEndMarker, $idxStart)
}

if ($idxEnd -lt 0) {
    throw "Could not locate end of FloatChatAI in app_component.js"
}

$finalAppContent = $appContent.Substring(0, $idxStart) + $newIntents.Trim() + "`r`n`r`n" + $appContent.Substring($idxEnd)

[System.IO.File]::WriteAllText($appPath, $finalAppContent, [System.Text.Encoding]::UTF8)
Write-Host "app_component.js successfully updated! Total length: $($finalAppContent.Length) chars."

# 4. Now run merge_app.ps1 to update index.html and FloatChat bundles
Write-Host "Running merge_app.ps1 to update index.html..."
& "e:\minipro\merge_app.ps1"

Write-Host "ALL WEB FILES UPDATED SUCCESSFULLY!"
