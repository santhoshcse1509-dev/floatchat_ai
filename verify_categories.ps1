$c = [System.IO.File]::ReadAllText('e:\minipro\index.html', [System.Text.Encoding]::UTF8)
$terms = @(
    'Who Can Use FloatChat?',
    'Students',
    'Scientists & Researchers',
    'Fishermen',
    'Teachers',
    'Environmental Enthusiasts',
    'General Public',
    'What is ocean temperature?',
    'What is salinity?',
    'Explain this ocean graph in simple English.',
    'Compare temperature observations across two available months.',
    'Summarize the available salinity measurements.',
    'What observations are available for a selected ocean region?',
    'Explain the available ocean observations near this location.',
    'What does the ocean temperature data indicate?',
    'Explain this information in simple Tamil.',
    'Explain ocean temperature to a school student.',
    'Summarize the available observations for a classroom presentation.',
    'Explain the difference between temperature and salinity.',
    'What ocean observations are available?',
    'Explain the temperature changes shown in this graph.',
    'Summarize the available ocean data for a selected period.',
    'Explain ocean temperature in simple words.',
    'What does salinity mean?',
    'What can we learn from this ocean dataset?'
)

$allFound = $true
foreach ($t in $terms) {
    $found = $c.Contains($t)
    Write-Host "$t : $found"
    if (-not $found) { $allFound = $false }
}

Write-Host "--- Overall Success: $allFound ---"
