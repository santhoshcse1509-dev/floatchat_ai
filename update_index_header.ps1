# update_index_header.ps1
$ErrorActionPreference = "Stop"

$payloadPath = "e:\minipro\multi_dataset_payload.json"
$payloadJson = [System.IO.File]::ReadAllText($payloadPath, [System.Text.Encoding]::UTF8)

$headerHtml = @"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FloatChat — Natural Conversational Ocean Data Assistant</title>
  <meta name="description" content="Explore ocean measurements collected by ARGO floats in simple, everyday English. Ask questions about water temperature, salinity, depth, and buoy positions with clear data and charts.">
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌊</text></svg>">
  
  <!-- Google Fonts: Inter, Outfit, JetBrains Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS CDN with Warm Ivory & Sage Green theme tokens -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            ivory: {
              DEFAULT: '#F7F5EF',
              50: '#FCFBF9',
              100: '#F7F5EF',
              200: '#EFECE2',
            },
            surface: '#FFFFFF',
            sage: {
              DEFAULT: '#758B72',
              dark: '#536B52',
              light: '#8E9C7A',
              subtle: '#EDF1EB',
              50: '#F4F7F4',
              100: '#EDF1EB',
              500: '#758B72',
              600: '#637960',
              700: '#536B52',
            },
            terracotta: {
              DEFAULT: '#C9795B',
              light: '#DF987D',
              dark: '#A85F44',
              subtle: '#FAF0EB',
            },
            charcoal: {
              DEFAULT: '#303B35',
              soft: '#424E48',
              muted: '#73776F',
            },
            beige: {
              DEFAULT: '#E5E0D6',
              light: '#EFECE6',
              dark: '#D8D1C4',
            }
          },
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            heading: ['Outfit', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          }
        }
      }
    }
  </script>

  <!-- Leaflet CSS & JS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js"></script>

  <!-- Chart.js CDN -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

  <!-- React 18 & Babel CDN -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.10/babel.min.js"></script>

  <style>
    body {
      background-color: #F7F5EF;
      color: #303B35;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #F7F5EF;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #D8D1C4;
      border-radius: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #758B72;
    }
    .leaflet-container {
      background: #F7F5EF !important;
      border-radius: 0.75rem;
      font-family: 'Inter', sans-serif !important;
    }
    .leaflet-popup-content-wrapper {
      background: #FFFFFF !important;
      color: #303B35 !important;
      border: 1px solid #E5E0D6 !important;
      box-shadow: 0 4px 16px rgba(48, 59, 53, 0.08) !important;
      border-radius: 0.75rem !important;
    }
    .leaflet-popup-tip {
      background: #FFFFFF !important;
    }
  </style>
</head>
<body class="bg-[#F7F5EF] text-[#303B35] selection:bg-[#758B72] selection:text-white overflow-x-hidden min-h-screen">
  <div id="root"></div>

  <!-- EMBEDDED IN-MEMORY MULTI-DATASET ARGO DATABASE -->
  <script>
    window.FLOAT_CHAT_DATA = $payloadJson;
  </script>
"@

[System.IO.File]::WriteAllText("e:\minipro\index_header.html", $headerHtml, [System.Text.Encoding]::UTF8)
Write-Host "index_header.html created successfully with $( $headerHtml.Length ) characters!"
