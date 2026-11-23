$lines = [System.IO.File]::ReadAllLines("e:\minipro\index.html", [System.Text.Encoding]::UTF8)
for ($i = 0; $i -lt [Math]::Min(140, $lines.Length); $i++) {
    if ($lines[$i] -match "^\s*window\.FLOAT_CHAT_DATA\s*=") {
        Write-Host "window.FLOAT_CHAT_DATA at line $($i+1)"
        for ($j = $i + 1; $j -lt $i + 5; $j++) {
            if ($lines[$j] -match "^\s*</script>") {
                Write-Host "Found closing script at line $($j+1): $($lines[$j])"
                break
            }
        }
        break
    }
}
