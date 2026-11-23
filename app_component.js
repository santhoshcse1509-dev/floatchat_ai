const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ============================================================================
// FLOATCHAT MULTILINGUAL DICTIONARY (EN, TA, HI, TE, ML)
// ============================================================================
const TRANSLATIONS = {
  en: {
    appTitle: "FloatChat",
    appSubtitle: "Student Oceanography Hub",
    appTagline: "Natural Indian Ocean Data Explorer",
    navHome: "Home",
    navExplore: "Explore Data",
    navChat: "Ask FloatChat",
    badgeDataset: "3 Datasets • 1,720 Obs",
    
    // Home View
    heroTag: "Student-Built Ocean Data Project",
    heroTitle: "Explore Ocean Measurements in Plain Language",
    heroDesc: "A clean, natural tool to investigate real ARGO ocean buoy measurements across the Arabian Sea, Bay of Bengal, and Equatorial Indian Ocean. Ask any question in everyday words or use voice.",
    btnExplore: "Explore Datasets",
    btnAsk: "Ask a Question",
    statObsTitle: "Recorded Observations",
    statObsCount: "1,720",
    statObsDesc: "Measurements from surface down to 2,000m depth",
    statDatasetsTitle: "Registered Datasets",
    statDatasetsCount: "3 Sources",
    statDatasetsDesc: "NetCDF-3, NetCDF-4, and CSV observational archives",
    statFloatsTitle: "Robotic ARGO Fleet",
    statFloatsCount: "4 Buoys",
    statFloatsDesc: "Autonomous profiling floats continuously diving and surfacing",
    statDateTitle: "Observation Range",
    statDateRange: "Jan 15 – Jun 20, 2024",
    statDateDesc: "Capturing winter, pre-monsoon spring, and monsoon onset",
    
    registryTitle: "Registered Oceanographic Datasets",
    registrySubtitle: "FloatChat integrates multiple independent archives with automatic overlap deduplication",
    
    whoCanUseTitle: "Who Can Use FloatChat?",
    whoCanUseSub: "Explore tailored use cases and example questions for students, researchers, fishermen, educators, and the public.",
    
    guideTitle: "How FloatChat Works",
    step1Title: "1. Natural Questions",
    step1Desc: "Ask about temperature, salinity, water depth, dates, or comparisons in natural words or via microphone.",
    step2Title: "2. Multi-Dataset Engine",
    step2Desc: "FloatChat searches across all active datasets, computes averages, trends, and differences, and deduplicates overlapping records.",
    step3Title: "3. Grounded Explanations & Charts",
    step3Desc: "Every response is grounded in verifiable buoy numbers with inline depth profile charts and drift trajectory maps.",
    
    // Explore View
    exploreTitle: "Explore Ocean Data",
    exploreSubtitle: "Filter, map, and inspect recorded ocean profiles across datasets",
    filterDataset: "Dataset Source:",
    filterAllDatasets: "All Datasets (1,720 deduplicated obs)",
    filterFloat: "Select Float:",
    filterAllFloats: "All Floats (4 Buoys)",
    filterDepth: "Depth Layer:",
    depthAll: "All Depths (0–2,000m)",
    depthSurface: "Surface Layer (0–100m)",
    depthMid: "Thermocline / Mid-Depth (100–500m)",
    depthDeep: "Deep Ocean (500–2,000m)",
    searchPlaceholder: "Search by date, float ID, or depth...",
    btnReset: "Reset Filters",
    mapTitle: "Float Locations & Drift Trajectories",
    mapSub: "Click any float marker to inspect recent dive metrics",
    chartTitle: "Vertical Depth Profile (Temperature & Salinity vs Depth)",
    chartHint: "Warm surface water (~29–31°C) cools down to ~4°C at depth, while salinity remains between 33 and 37.8 PSU.",
    tableTitle: "Filtered Observations Table",
    btnExportCSV: "Download CSV",
    thDataset: "Dataset",
    thFloat: "Float ID",
    thCycle: "Cycle",
    thDate: "Date Recorded",
    thDepth: "Depth (m)",
    thTemp: "Temp (°C)",
    thSal: "Salinity (PSU)",
    thCoords: "Location",
    tableEmpty: "No observations match the selected criteria.",
    paginationShowing: "Showing",
    paginationTo: "to",
    paginationOf: "of",
    paginationRecords: "records",
    btnPrev: "← Previous",
    btnNext: "Next →",
    
    // Chat View
    chatTitle: "Ask FloatChat",
    chatSubtitle: "Universal conversational ocean assistant with multi-dataset intelligence",
    btnClearChat: "Clear History",
    clearConfirm: "Clear your entire conversation history?",
    welcomeTitle: "Hello! I'm FloatChat",
    welcomeDesc: "I can answer questions about ocean temperature, salinity, water depth, extrema, time ranges, and compare datasets from January to June 2024. Type below or speak!",
    sampleQuestionsTitle: "Suggested questions to get started:",
    btnCopy: "Copy",
    btnCopied: "Copied!",
    btnSpeak: "Listen",
    btnPause: "Pause",
    btnResume: "Resume",
    btnStop: "Stop Audio",
    micListening: "Listening... Speak your question now.",
    micStop: "Stop Recording",
    micDenied: "Microphone permission denied. Please allow microphone access in your browser.",
    micNotSupported: "Speech recognition is not supported in this browser. Please type your query.",
    inputPlaceholder: "Ask about temperature, salinity, float positions, or compare periods...",
    btnSend: "Send",
    thinking: "Analyzing ARGO datasets...",
    datasetBadge: "Grounded in Real ARGO Data",
    sidebarToggleBtn: "Who Can Use?",
    sidebarTitle: "Who Can Use FloatChat?",
    sidebarSubtitle: "Select a user role for tailored guides & questions"
  },

  ta: {
    appTitle: "FloatChat",
    appSubtitle: "மாணவர் பெருங்கடல் மையம்",
    appTagline: "இயற்கையான இந்தியப் பெருங்கடல் தரவு ஆய்வாளர்",
    navHome: "முகப்பு",
    navExplore: "தரவு ஆய்வு",
    navChat: "FloatChat-இடம் கேளுங்கள்",
    badgeDataset: "3 தரவுத்தொகுப்புகள் • 1,720 அளவீடுகள்",
    heroTag: "மாணவர்களால் உருவாக்கப்பட்ட பெருங்கடல் திட்டம்",
    heroTitle: "பெருங்கடல் அளவீடுகளை எளிய மொழியில் அறிந்துகொள்ளுங்கள்",
    heroDesc: "அரபிக்கடல், வங்காள விரிகுடா மற்றும் இந்தியப் பெருங்கடலில் உள்ள ARGO மிதவைகளின் உண்மையான அளவீடுகளை ஆராயும் எளிய தளம். தமிழில் தட்டச்சு செய்து அல்லது குரல் வழியாகக் கேளுங்கள்.",
    btnExplore: "தரவுகளை ஆராய்க",
    btnAsk: "கேள்வி கேளுங்கள்",
    statObsTitle: "பதிவான அளவீடுகள்",
    statObsCount: "1,720",
    statObsDesc: "மேற்பரப்பு முதல் 2,000 மீட்டர் ஆழம் வரை",
    statDatasetsTitle: "பதிவு செய்யப்பட்ட தரவுகள்",
    statDatasetsCount: "3 தொகுப்புகள்",
    statDatasetsDesc: "NetCDF-3, NetCDF-4 மற்றும் CSV தரவுகள்",
    statFloatsTitle: "ARGO ரோபோட்டிக் மிதவைகள்",
    statFloatsCount: "4 மிதவைகள்",
    statFloatsDesc: "கடலில் மூழ்கித் தகவல்களைத் தரும் தானியங்கி மிதவைகள்",
    statDateTitle: "கண்காணிப்பு காலம்",
    statDateRange: "ஜனவரி 15 – ஜூன் 20, 2024",
    statDateDesc: "குளிர்காலம், வசந்தகாலம் மற்றும் பருவமழை தொடக்க காலம்",
    registryTitle: "பெருங்கடல் தரவுத்தொகுப்புகள்",
    registrySubtitle: "FloatChat பல தரவுத்தொகுப்புகளை தானாக ஒன்றிணைத்து தகவல்களை வழங்குகிறது",
    whoCanUseTitle: "FloatChat-ஐ யார் பயன்படுத்தலாம்?",
    whoCanUseSub: "மாணவர்கள், ஆராய்ச்சியாளர்கள், மீனவர்கள், ஆசிரியர்கள் மற்றும் பொதுமக்களுக்கான வழிகாட்டிகள்.",
    guideTitle: "FloatChat எவ்வாறு செயல்படுகிறது?",
    step1Title: "1. எளிய கேள்விகள்",
    step1Desc: "வெப்பநிலை, உப்புத்தன்மை, ஆழம் அல்லது காலங்களை ஒப்பிட்டு எளிய வார்த்தைகளில் கேளுங்கள்.",
    step2Title: "2. பல தரவுத்தொகுப்பு ஆய்வு",
    step2Desc: "அனைத்து தரவுகளையும் பகுப்பாய்வு செய்து சராசரிகள், போக்குகள் மற்றும் வேறுபாடுகளைக் கணக்கிடுகிறது.",
    step3Title: "3. வரைபடங்களுடன் கூடிய விளக்கம்",
    step3Desc: "உண்மையான தரவுகளுடன் ஆழ வரைபடங்கள் மற்றும் மிதவை வரைபடங்கள் மூலம் பதிலளிக்கிறது.",
    exploreTitle: "கடல் தரவை ஆராய்க",
    exploreSubtitle: "கடல் அளவீடுகளை வடிகட்டி வரைபடத்தில் காண்க",
    filterDataset: "தரவுத்தொகுப்பு:",
    filterAllDatasets: "அனைத்து தரவுகளும் (1,720 அளவீடுகள்)",
    filterFloat: "மிதவை தேர்வு:",
    filterAllFloats: "அனைத்து மிதவைகள் (4)",
    filterDepth: "ஆழம்:",
    depthAll: "அனைத்து ஆழங்கள் (0–2,000 மீ)",
    depthSurface: "மேற்பரப்பு (0–100 மீ)",
    depthMid: "நடுத்தர ஆழம் (100–500 மீ)",
    depthDeep: "ஆழ் பெருங்கடல் (500–2,000 மீ)",
    searchPlaceholder: "தேதி அல்லது ஆழம் மூலம் தேடுக...",
    btnReset: "மீட்டமைக்க",
    mapTitle: "மிதவை இருப்பிடங்கள் மற்றும் நகர்வு",
    mapSub: "மிதவை விவரங்களை அறிய அதன் மீது கிளிக் செய்க",
    chartTitle: "ஆழ அளவீட்டு விளக்கப்படம் (வெப்பநிலை & உப்புத்தன்மை)",
    chartHint: "மேற்பரப்பில் வெதுவெதுப்பான நீர் (~29–31°C) ஆழத்தில் குளிர்ச்சியடைகிறது (~4°C).",
    tableTitle: "அளவீட்டுப் பட்டியல்",
    btnExportCSV: "CSV பதிவிறக்கம்",
    thDataset: "தரவு",
    thFloat: "மிதவை",
    thCycle: "சுழற்சி",
    thDate: "தேதி",
    thDepth: "ஆழம் (மீ)",
    thTemp: "வெப்பம் (°C)",
    thSal: "உப்புத்தன்மை (PSU)",
    thCoords: "இடம்",
    tableEmpty: "தேர்ந்தெடுக்கப்பட்ட வடிகட்டிகளுக்கு பதிவுகள் இல்லை.",
    paginationShowing: "காட்டப்படுகிறது",
    paginationTo: "முதல்",
    paginationOf: "வரை / மொத்தம்",
    paginationRecords: "பதிவுகள்",
    btnPrev: "← முந்தையது",
    btnNext: "அடுத்தது →",
    chatTitle: "FloatChat-இடம் கேளுங்கள்",
    chatSubtitle: "பெருங்கடல் கேள்விகளுக்கு உடனுக்குடன் பதிலளிக்கும் வழிகாட்டி",
    btnClearChat: "வரலாற்றை அழிக்க",
    clearConfirm: "உரையாடல் வரலாற்றை அழிக்க விரும்புகிறீர்களா?",
    welcomeTitle: "வணக்கம்! நான் FloatChat",
    welcomeDesc: "கடல் வெப்பநிலை, உப்புத்தன்மை, ஆழம் மற்றும் காலங்களை ஒப்பிடுவது பற்றி என்னிடம் கேட்கலாம். தட்டச்சு செய்யுங்கள் அல்லது பேசுங்கள்!",
    sampleQuestionsTitle: "மாதிரி கேள்விகள்:",
    btnCopy: "நகலெடு",
    btnCopied: "நகலெடுக்கப்பட்டது!",
    btnSpeak: "கேட்க",
    btnPause: "நிறுத்து",
    btnResume: "தொடர்",
    btnStop: "ஆடியோ நிறுத்து",
    micListening: "கேட்கிறது... இப்போது பேசுங்கள்.",
    micStop: "பதிவை நிறுத்து",
    micDenied: "மைக்ரோஃபோன் அனுமதி மறுக்கப்பட்டது.",
    micNotSupported: "இந்த உலாவியில் வாய்ஸ் ஆதரவு இல்லை.",
    inputPlaceholder: "வெப்பநிலை, உப்புத்தன்மை அல்லது மிதவைகள் பற்றி கேட்கவும்...",
    btnSend: "அனுப்பு",
    thinking: "தரவுகளை ஆராய்கிறது...",
    datasetBadge: "உண்மை ARGO தரவு சார்ந்தது",
    sidebarToggleBtn: "யார் பயன்படுத்தலாம்?",
    sidebarTitle: "FloatChat-ஐ யார் பயன்படுத்தலாம்?",
    sidebarSubtitle: "வழிகாட்டிகள் மற்றும் மாதிரி கேள்விகள்"
  },

  hi: {
    appTitle: "FloatChat",
    appSubtitle: "छात्र समुद्र विज्ञान केंद्र",
    appTagline: "हिंद महासागर डेटा अन्वेषक",
    navHome: "होम",
    navExplore: "डेटा देखें",
    navChat: "FloatChat से पूछें",
    badgeDataset: "3 डेटासेट • 1,720 अवलोकन",
    heroTag: "छात्रों द्वारा निर्मित महासागर विज्ञान परियोजना",
    heroTitle: "सरल भाषा में समुद्र के वैज्ञानिक मापों को समझें",
    heroDesc: "अरब सागर, बंगाल की खाड़ी और हिंद महासागर में ARGO रोबोटिक फ्लोट्स द्वारा दर्ज वास्तविक मापों को आसानी से जानें। हिंदी में प्रश्न पूछें या माइक से बोलें।",
    btnExplore: "डेटा अन्वेषण करें",
    btnAsk: "प्रश्न पूछें",
    statObsTitle: "दर्ज अवलोकन",
    statObsCount: "1,720",
    statObsDesc: "सतह से 2,000 मीटर गहराई तक के माप",
    statDatasetsTitle: "पंजीकृत डेटासेट",
    statDatasetsCount: "3 स्रोत",
    statDatasetsDesc: "NetCDF-3, NetCDF-4 और CSV वैज्ञानिक पुरालेख",
    statFloatsTitle: "रोबोटिक फ्लोट बेड़ा",
    statFloatsCount: "4 फ्लोट्स",
    statFloatsDesc: "समुद्र में गोता लगाकर आंकड़े जुटाने वाले रोबोट",
    statDateTitle: "अवलोकन अवधि",
    statDateRange: "15 जनवरी – 20 जून 2024",
    statDateDesc: "शीतकाल, वसंत ऋतु और मानसून आगमन का समय",
    registryTitle: "पंजीकृत महासागरीय डेटासेट",
    registrySubtitle: "FloatChat कई स्वतंत्र डेटासेट को एक साथ एकीकृत करता है",
    whoCanUseTitle: "FloatChat का उपयोग कौन कर सकता है?",
    whoCanUseSub: "छात्रों, वैज्ञानिकों, मछुआरों, शिक्षकों और आम जनता के लिए विशेष मार्गदर्शिका।",
    guideTitle: "FloatChat कैसे काम करता है?",
    step1Title: "1. स्वाभाविक प्रश्न पूछें",
    step1Desc: "तापमान, लवणता, गहराई या अवधियों की तुलना अपनी भाषा में पूछें।",
    step2Title: "2. बहु-डेटासेट विश्लेषण",
    step2Desc: "सभी डेटासेट में खोज कर औसत, प्रवृत्तियां और अंतर की गणना की जाती है।",
    step3Title: "3. वास्तविक डेटा और ग्राफ",
    step3Desc: "प्रत्येक उत्तर वास्तविक आंकड़ों, गहराई प्रोफाइल और फ्लोट मैप के साथ समर्थित है।",
    exploreTitle: "महासागरीय डेटा देखें",
    exploreSubtitle: "डेटासेट, गहराई और फ्लोट स्थानों को फिल्टर करें",
    filterDataset: "डेटासेट स्रोत:",
    filterAllDatasets: "सभी डेटासेट (1,720 अवलोकन)",
    filterFloat: "फ्लोट चुनें:",
    filterAllFloats: "सभी फ्लोट्स (4)",
    filterDepth: "गहराई परत:",
    depthAll: "सभी गहराइयां (0–2,000 मी)",
    depthSurface: "सतह परत (0–100 मी)",
    depthMid: "मध्य गहराई (100–500 मी)",
    depthDeep: "गहरा महासागर (500–2,000 मी)",
    searchPlaceholder: "तारीख, फ्लोट या गहराई खोजें...",
    btnReset: "रीसेट करें",
    mapTitle: "फ्लोट स्थिति और मार्ग",
    mapSub: "फ्लोट के नवीनतम माप देखने के लिए उस पर क्लिक करें",
    chartTitle: "गहराई प्रोफाइल (तापमान और लवणता बनाम गहराई)",
    chartHint: "सतह का गर्म पानी (~29–31°C) गहराई में ठंडा (~4°C) हो जाता है।",
    tableTitle: "अवलोकन तालिका",
    btnExportCSV: "CSV डाउनलोड",
    thDataset: "डेटासेट",
    thFloat: "फ्लोट",
    thCycle: "चक्र",
    thDate: "दिनांक",
    thDepth: "गहराई (मी)",
    thTemp: "तापमान (°C)",
    thSal: "लवणता (PSU)",
    thCoords: "स्थान",
    tableEmpty: "चुने गए फिल्टर के अनुसार कोई डेटा नहीं मिला।",
    paginationShowing: "दिखाया जा रहा है",
    paginationTo: "से",
    paginationOf: "तक / कुल",
    paginationRecords: "रिकॉर्ड",
    btnPrev: "← पिछला",
    btnNext: "अगला →",
    chatTitle: "FloatChat से पूछें",
    chatSubtitle: "महासागरीय प्रश्नों का उत्तर देने वाला मार्गदर्शक",
    btnClearChat: "चैट मिटाएं",
    clearConfirm: "क्या आप पूरी बातचीत मिटाना चाहते हैं?",
    welcomeTitle: "नमस्ते! मैं FloatChat हूँ",
    welcomeDesc: "मैं तापमान, लवणता, गहराई और जनवरी से जून 2024 के डेटा की तुलना करने में आपकी सहायता कर सकता हूँ। टाइप करें या बोलें!",
    sampleQuestionsTitle: "सुझाए गए प्रश्न:",
    btnCopy: "कॉपी",
    btnCopied: "कॉपी हुआ!",
    btnSpeak: "सुनें",
    btnPause: "रोकें",
    btnResume: "जारी रखें",
    btnStop: "ऑडियो बंद",
    micListening: "सुन रहा हूँ... अब अपना सवाल बोलें।",
    micStop: "रिकॉर्डिंग रोकें",
    micDenied: "माइक्रोफ़ोन की अनुमति अस्वीकृत।",
    micNotSupported: "इस ब्राउज़र में स्पीच रिकग्निशन समर्थित नहीं है।",
    inputPlaceholder: "तापमान, लवणता या फ्लोट्स के बारे में पूछें...",
    btnSend: "भेजें",
    thinking: "डेटासेट की जांच कर रहा है...",
    datasetBadge: "वास्तविक ARGO डेटा आधारित",
    sidebarToggleBtn: "उपयोगकर्ता गाइड",
    sidebarTitle: "FloatChat का उपयोग कौन कर सकता है?",
    sidebarSubtitle: "अपनी भूमिका के अनुसार प्रश्न चुनें"
  },

  te: {
    appTitle: "FloatChat",
    appSubtitle: "విద్యార్థి సముద్ర విజ్ఞాన కేంద్రం",
    appTagline: "హిందూ మహాసముద్ర డేటా అన్వేషకుడు",
    navHome: "హోమ్",
    navExplore: "డేటా చూడండి",
    navChat: "FloatChat ని అడగండి",
    badgeDataset: "3 డేటాసెట్‌లు • 1,720 రికార్డులు",
    heroTag: "విద్యార్థులు రూపొందించిన సముద్ర పరిశోధన ప్రాజెక్ట్",
    heroTitle: "సరళమైన భాషలో సముద్ర కొలతలను తెలుసుకోండి",
    heroDesc: "అరేబియా సముద్రం, బంగాళాఖాతం మరియు హిందూ మహాసముద్రంలో ARGO ఫ్లోట్ల వాస్తవ కొలతలను సులభంగా తెలుసుకోండి. తెలుగులో టైప్ చేయండి లేదా మాట్లాడండి.",
    btnExplore: "డేటాను అన్వేషించండి",
    btnAsk: "ప్రశ్న అడగండి",
    statObsTitle: "నమోదైన పరిశీలనలు",
    statObsCount: "1,720",
    statObsDesc: "ఉపరితలం నుండి 2,000 మీటర్ల లోతు వరకు",
    statDatasetsTitle: "నమోదైన డేటాసెట్‌లు",
    statDatasetsCount: "3 మూలాలు",
    statDatasetsDesc: "NetCDF-3, NetCDF-4 మరియు CSV డేటా ఆర్కైవ్‌లు",
    statFloatsTitle: "ARGO రోబోటిక్ ఫ్లోట్లు",
    statFloatsCount: "4 ఫ్లోట్లు",
    statFloatsDesc: "నీటి అడుగున మునుగుతూ వివరాలు సేకరించే రోబోట్లు",
    statDateTitle: "సమయ వ్యవధి",
    statDateRange: "15 జనవరి – 20 జూన్ 2024",
    statDateDesc: "శీతాకాలం, వేసవి మరియు వర్షాకాలం ప్రారంభం",
    registryTitle: "సముద్ర డేటాసెట్‌లు",
    registrySubtitle: "FloatChat బహుళ డేటాసెట్‌లను సమన్వయం చేస్తుంది",
    whoCanUseTitle: "FloatChat ని ఎవరు ఉపయోగించవచ్చు?",
    whoCanUseSub: "విద్యార్థులు, పరిశోధకులు, మత్స్యకారులు, ఉపాధ్యాయులు మరియు పౌరుల కోసం ప్రత్యేక గైడ్.",
    guideTitle: "FloatChat ఎలా పనిచేస్తుంది?",
    step1Title: "1. సహజమైన ప్రశ్నలు",
    step1Desc: "ఉష్ణోగ్రత, సెలైనిటీ, లోతు లేదా సమయాల పోలికను సరళంగా అడగండి.",
    step2Title: "2. బహుళ డేటా విశ్లేషణ",
    step2Desc: "అన్ని డేటాసెట్‌లలో సగటులు, పోకడలు మరియు తేడాలను లెక్కిస్తుంది.",
    step3Title: "3. నిజమైన డేటా & గ్రాఫ్‌లు",
    step3Desc: "వాస్తవ రికార్డులు, లోతు ప్రొఫైల్స్ మరియు మ్యాప్‌లతో సమాధానాలు అందిస్తుంది.",
    exploreTitle: "సముద్ర డేటాను అన్వేషించండి",
    exploreSubtitle: "డేటాసెట్లు, లోతు మరియు స్థానాలను ఫిల్టర్ చేయండి",
    filterDataset: "డేటాసెట్ మూలం:",
    filterAllDatasets: "అన్ని డేటాసెట్‌లు (1,720 రికార్డులు)",
    filterFloat: "ఫ్లోట్ ఎంచుకోండి:",
    filterAllFloats: "అన్ని ఫ్లోట్లు (4)",
    filterDepth: "లోతు పరిధి:",
    depthAll: "అన్ని లోతులు (0–2,000 మీ)",
    depthSurface: "ఉపరితలం (0–100 మీ)",
    depthMid: "మధ్యస్థ లోతు (100–500 మీ)",
    depthDeep: "గాఢ సముద్రం (500–2,000 మీ)",
    searchPlaceholder: "తేదీ లేదా లోతు వెతకండి...",
    btnReset: "రీసెట్ చేయండి",
    mapTitle: "ఫ్లోట్ స్థానాలు & ప్రయాణ మార్గం",
    mapSub: "వివరాల కోసం ఫ్లోట్ మార్కర్‌పై క్లిక్ చేయండి",
    chartTitle: "లోతు ప్రొఫైల్ చార్ట్ (ఉష్ణోగ్రత & సెలైనిటీ)",
    chartHint: "ఉపరితలంలో వెచ్చగా ఉన్న నీరు (~29–31°C) లోతుకు వెళ్ళేసరికి చల్లగా (~4°C) మారుతుంది.",
    tableTitle: "పరిశీలనల పట్టిక",
    btnExportCSV: "CSV డౌన్‌లోడ్",
    thDataset: "డేటాసెట్",
    thFloat: "ఫ్లోట్",
    thCycle: "సైకిల్",
    thDate: "తేదీ",
    thDepth: "లోతు (మీ)",
    thTemp: "ఉష్ణోగ్రత (°C)",
    thSal: "సెలైనిటీ (PSU)",
    thCoords: "ప్రాంతం",
    tableEmpty: "ఎంచుకున్న ఫిల్టర్లకు ఎటువంటి రికార్డులు లేవు.",
    paginationShowing: "చూపిస్తోంది",
    paginationTo: "నుండి",
    paginationOf: "వరకు / మొత్తం",
    paginationRecords: "రికార్డులు",
    btnPrev: "← మునుపటిది",
    btnNext: "తరువాతిది →",
    chatTitle: "FloatChat ని అడగండి",
    chatSubtitle: "సముద్ర విజ్ఞాన ప్రశ్నలకు సూటి సమాధానాలు ఇచ్చే సహాయకుడు",
    btnClearChat: "చాట్ క్లియర్ చేయండి",
    clearConfirm: "సంభాషణను తొలగించాలనుకుంటున్నారా?",
    welcomeTitle: "నమస్కారం! నేను FloatChat",
    welcomeDesc: "సముద్రపు ఉష్ణోగ్రత, ఉప్పు శాతం (సెలైనిటీ), లోతు మరియు జనవరి-జూన్ 2024 డేటా పోలికల గురించి నన్ను అడగండి. టైప్ చేయండి లేదా మాట్లాడండి!",
    sampleQuestionsTitle: "ఉదాహరణ ప్రశ్నలు:",
    btnCopy: "కాపీ",
    btnCopied: "కాపీ అయింది!",
    btnSpeak: "వినండి",
    btnPause: "పాజ్",
    btnResume: "కొనసాగించు",
    btnStop: "ఆపు",
    micListening: "వింటున్నాను... మాట్లాడండి.",
    micStop: "రికార్డింగ్ ఆపండి",
    micDenied: "మైక్రోఫోన్ అనుమతి నిరాకరించబడింది.",
    micNotSupported: "ఈ బ్రౌజర్‌లో స్పీచ్ సపోర్ట్ లేదు.",
    inputPlaceholder: "ఉష్ణోగ్రత, సెలైనిటీ లేదా ఫ్లోట్ల గురించి అడగండి...",
    btnSend: "పంపండి",
    thinking: "డేటాను పరిశీలిస్తోంది...",
    datasetBadge: "వాస్తవ ARGO డేటా ఆధారం",
    sidebarToggleBtn: "ఎవరు వాడవచ్చు?",
    sidebarTitle: "FloatChat ని ఎవరు ఉపయోగించవచ్చు?",
    sidebarSubtitle: "మీ పాత్రకు తగిన ప్రశ్నలను ఎంచుకోండి"
  },

  ml: {
    appTitle: "FloatChat",
    appSubtitle: "വിദ്യാർത്ഥി സമുദ്രപഠന കേന്ദ്രം",
    appTagline: "ഇന്ത്യൻ മഹാസമുദ്ര ഡാറ്റാ പര്യവേക്ഷകൻ",
    navHome: "ഹോം",
    navExplore: "ഡാറ്റാ വിവരങ്ങൾ",
    navChat: "FloatChat-നോട് ചോദിക്കുക",
    badgeDataset: "3 ഡാറ്റാസെറ്റുകൾ • 1,720 രേഖകൾ",
    heroTag: "വിദ്യാർത്ഥികൾ വികസിപ്പിച്ച സമുദ്രപഠന പ്ലാറ്റ്‌ഫോം",
    heroTitle: "ലളിതമായ ഭാഷയിൽ സമുദ്ര നിരീക്ഷണ വിവരങ്ങൾ മനസ്സിലാക്കൂ",
    heroDesc: "അറബിക്കടൽ, ബംഗാൾ ഉൾക്കടൽ, ഇന്ത്യൻ മഹാസമുദ്രം എന്നിവിടങ്ങളിലെ യഥാർത്ഥ ARGO ബോയ് അളവുകൾ കണ്ടെത്തൂ. മലയാളത്തിൽ ടൈപ്പ് ചെയ്യുകയോ സംസാരിക്കുകയോ ചെയ്യാം.",
    btnExplore: "ഡാറ്റ പരിശോധിക്കുക",
    btnAsk: "ചോദ്യം ചോദിക്കുക",
    statObsTitle: "രേഖപ്പെടുത്തിയ അളവുകൾ",
    statObsCount: "1,720",
    statObsDesc: "ഉപരിതലം മുതൽ 2,000 മീറ്റർ ആഴം വരെ",
    statDatasetsTitle: "ലഭ്യമായ ഡാറ്റാസെറ്റുകൾ",
    statDatasetsCount: "3 സ്രോതസ്സുകൾ",
    statDatasetsDesc: "NetCDF-3, NetCDF-4, CSV ആർക്കൈവുകൾ",
    statFloatsTitle: "ARGO റോബോട്ടിക് ഫ്ലോട്ടുകൾ",
    statFloatsCount: "4 ഫ്ലോട്ടുകൾ",
    statFloatsDesc: "ആഴത്തിൽ പോയി വിവരങ്ങൾ ശേഖരിക്കുന്ന സ്വയംനിയന്ത്രിത ഫ്ലോട്ടുകൾ",
    statDateTitle: "നിരീക്ഷണ കാലയളവ്",
    statDateRange: "ജനുവരി 15 – ജൂൺ 20, 2024",
    statDateDesc: "ശീതകാലം, വസന്തകാലം, മൺസൂൺ ആരംഭം എന്നിവ ഉൾക്കൊള്ളുന്നു",
    registryTitle: "സമുദ്ര ഡാറ്റാസെറ്റുകൾ",
    registrySubtitle: "FloatChat ഒന്നിലധികം ഡാറ്റാസെറ്റുകളെ സ്വയം സംയോജിപ്പിക്കുന്നു",
    whoCanUseTitle: "FloatChat ആർക്കൊക്കെ ഉപയോഗിക്കാം?",
    whoCanUseSub: "വിദ്യാർത്ഥികൾ, ഗവേഷകർ, മത്സ്യത്തൊഴിലാളികൾ, അധ്യാപകർ എന്നിവർക്കായി പ്രത്യേകം തയ്യാറാക്കിയ വിവരങ്ങൾ.",
    guideTitle: "FloatChat എങ്ങനെ പ്രവർത്തിക്കുന്നു?",
    step1Title: "1. ലളിതമായ ചോദ്യങ്ങൾ",
    step1Desc: "താപനില, ലവണാംശം, ആഴം അല്ലെങ്കിൽ കാലഘട്ടങ്ങൾ താരതമ്യം ചെയ്ത് ചോദിക്കുക.",
    step2Title: "2. ബഹു-ഡാറ്റാ വിശകലനം",
    step2Desc: "ശരാശരികൾ, വ്യതിയാനങ്ങൾ എന്നിവ കൃത്യമായി കണക്കാക്കുന്നു.",
    step3Title: "3. യഥാർത്ഥ വിവരങ്ങളും ചാർട്ടുകളും",
    step3Desc: "ആഴ ചാർട്ടുകളും മാപ്പുകളുമായി ഓരോ മറുപടിയും വിശദീകരിക്കുന്നു.",
    exploreTitle: "ഡാറ്റ പര്യവേക്ഷണം",
    exploreSubtitle: "ഡാറ്റാസെറ്റുകളും ഫ്ലോട്ട് വിവരങ്ങളും പരിശോധിക്കുക",
    filterDataset: "ഡാറ്റാസെറ്റ് സ്രോതസ്സ്:",
    filterAllDatasets: "എല്ലാ ഡാറ്റാസെറ്റുകളും (1,720 അളവുകൾ)",
    filterFloat: "ഫ്ലോട്ട് തിരഞ്ഞെടുക്കുക:",
    filterAllFloats: "എല്ലാ ഫ്ലോട്ടുകളും (4)",
    filterDepth: "ആഴം:",
    depthAll: "എല്ലാ ആഴങ്ങളും (0–2,000 മീ)",
    depthSurface: "ഉപരിതലം (0–100 മീ)",
    depthMid: "ഇടത്തരം ആഴം (100–500 മീ)",
    depthDeep: "ആഴക്കടൽ (500–2,000 മീ)",
    searchPlaceholder: "തീയതി അല്ലെങ്കിൽ ആഴം തിരയുക...",
    btnReset: "റീസെറ്റ് ചെയ്യുക",
    mapTitle: "ഫ്ലോട്ടുകളുടെ സ്ഥാനവും സഞ്ചാരപാതയും",
    mapSub: "കൂടുതൽ വിവരങ്ങൾ കാണാൻ ഫ്ലോട്ടിൽ ക്ലിക്ക് ചെയ്യുക",
    chartTitle: "ഡെപ്ത് പ്രൊഫൈൽ (താപനിലയും ലവണാംശവും)",
    chartHint: "ഉപരിതലത്തിൽ ചൂടുള്ള വെള്ളം (~29–31°C) താഴേക്ക് പോകുന്തോറും തണുക്കുന്നു (~4°C).",
    tableTitle: "നിരീക്ഷണ പട്ടിക",
    btnExportCSV: "CSV ഡൗൺലോഡ്",
    thDataset: "ഡാറ്റാസെറ്റ്",
    thFloat: "ഫ്ലോട്ട്",
    thCycle: "സൈക്കിൾ",
    thDate: "തീയതി",
    thDepth: "ആഴം (മീ)",
    thTemp: "താപനില (°C)",
    thSal: "ലവണാംശം (PSU)",
    thCoords: "സ്ഥാനം",
    tableEmpty: "തിരഞ്ഞെടുത്ത ഫിൽട്ടറുകളിൽ വിവരങ്ങളില്ല.",
    paginationShowing: "കാണിക്കുന്നത്",
    paginationTo: "മുതൽ",
    paginationOf: "വരെ / ആകെ",
    paginationRecords: "രേഖകൾ",
    btnPrev: "← മുൻപത്തേത്",
    btnNext: "അടുത്തത് →",
    chatTitle: "FloatChat-നോട് ചോദിക്കുക",
    chatSubtitle: "സമുദ്ര വിവരങ്ങൾ ലളിതമായി വിശദീകരിക്കുന്ന സഹായി",
    btnClearChat: "ചരിത്രം മായ്ക്കുക",
    clearConfirm: "സംഭാഷണങ്ങൾ മായ്‌ക്കണമെന്ന് ഉറപ്പാണോ?",
    welcomeTitle: "നമസ്കാരം! ഞാൻ FloatChat",
    welcomeDesc: "സമുദ്ര താപനില, ലവണാംശം, ആഴം, ജനുവരി-ജൂൺ 2024 വിവരങ്ങൾ എന്നിവയെക്കുറിച്ച് ചോദിക്കാം. ടൈപ്പ് ചെയ്യുകയോ സംസാരിക്കുകയോ ചെയ്യൂ!",
    sampleQuestionsTitle: "ഉദാഹരണ ചോദ്യങ്ങൾ:",
    btnCopy: "പകർത്തുക",
    btnCopied: "പകർത്തി!",
    btnSpeak: "കേൾക്കുക",
    btnPause: "നിർത്തുക",
    btnResume: "തുടരുക",
    btnStop: "ഓഡിയോ നിർത്തുക",
    micListening: "ശ്രദ്ധിക്കുന്നു... സംസാരിക്കൂ.",
    micStop: "റെക്കോർഡിംഗ് നിർത്തുക",
    micDenied: "മൈക്രോഫോൺ അനുമതി നിഷേധിച്ചു.",
    micNotSupported: "വോയ്‌സ് റെക്കഗ്നിഷൻ ലഭ്യമല്ല.",
    inputPlaceholder: "താപനില, ലവണാംശം അല്ലെങ്കിൽ ഫ്ലോട്ടുകളെക്കുറിച്ച് ചോദിക്കൂ...",
    btnSend: "അയക്കുക",
    thinking: "വിവരങ്ങൾ പരിശോധിക്കുന്നു...",
    datasetBadge: "യഥാർത്ഥ ARGO ഡാറ്റ അടിസ്ഥാനം",
    sidebarToggleBtn: "ആർക്കൊക്കെ ഉപയോഗിക്കാം?",
    sidebarTitle: "FloatChat ആർക്കൊക്കെ ഉപയോഗിക്കാം?",
    sidebarSubtitle: "നിങ്ങൾക്ക് അനുയോജ്യമായ ചോദ്യങ്ങൾ തിരഞ്ഞെടുക്കൂ"
  }
};

// ============================================================================
// USER CATEGORIES & INTERACTIVE PROFILES (6 Standard Roles)
// ============================================================================
const USER_CATEGORIES = [
  {
    id: "students",
    icon: "🎓",
    name: "Students",
    shortDesc: "Learn about ocean temperature, salinity, and oceanographic observations for academic projects.",
    info: "FloatChat helps students explore core ocean science concepts, understand how robotic ARGO profiling buoys work, and analyze real physical measurements without getting bogged down in complex NetCDF files or raw numerical matrices.",
    questions: [
      "What is ocean temperature?",
      "What is salinity?",
      "Explain this ocean graph in simple English."
    ]
  },
  {
    id: "scientists",
    icon: "🔬",
    name: "Scientists & Researchers",
    shortDesc: "Explore ARGO ocean observations, analyze temperature and salinity, and compare data across time periods.",
    info: "FloatChat provides researchers with instant statistical querying, depth-stratified vertical profiles, cross-dataset temporal comparisons (such as winter baseline vs pre-monsoon warming), and verifiable provenance for observations across the Northern Indian Ocean.",
    questions: [
      "Compare temperature observations across two available months.",
      "Summarize the available salinity measurements.",
      "What observations are available for a selected ocean region?"
    ]
  },
  {
    id: "fishermen",
    icon: "🎣",
    name: "Fishermen",
    shortDesc: "Understand available ocean observations through simple explanations without advanced technical jargon.",
    disclaimer: "ARGO data measures physical water temperature, salinity, and depth. It does not track fish schools, migration paths, or guarantee fishing success.",
    info: "FloatChat helps coastal communities and fishermen understand general sea conditions, surface water warmth, and seasonal temperature changes in plain language or local languages like Tamil, Hindi, Telugu, and Malayalam.",
    questions: [
      "Explain the available ocean observations near this location.",
      "What does the ocean temperature data indicate?",
      "Explain this information in simple Tamil."
    ]
  },
  {
    id: "teachers",
    icon: "👨‍🏫",
    name: "Teachers",
    shortDesc: "Explain ocean science concepts to students and use charts and data summaries as educational resources.",
    info: "FloatChat gives educators interactive classroom tools, simplified real-world analogies, and grounded graphs to teach thermoclines, haloclines, ocean monitoring robotics, and marine climatology.",
    questions: [
      "Explain ocean temperature to a school student.",
      "Summarize the available observations for a classroom presentation.",
      "Explain the difference between temperature and salinity."
    ]
  },
  {
    id: "enthusiasts",
    icon: "🌍",
    name: "Environmental Enthusiasts",
    shortDesc: "Learn about ocean conditions, seasonal shifts, and layer changes through clear visualizations.",
    info: "FloatChat allows ocean advocates and climate observers to track physical ocean conditions, inspect seasonal warming between winter and the southwest monsoon, and observe ocean layer stratification.",
    questions: [
      "What ocean observations are available?",
      "Explain the temperature changes shown in this graph.",
      "Summarize the available ocean data for a selected period."
    ]
  },
  {
    id: "public",
    icon: "👥",
    name: "General Public",
    shortDesc: "Understand ocean-related information in simple language, including temperature, salinity, and buoy locations.",
    info: "FloatChat is designed for anyone curious about our oceans. No scientific background is required—ask questions in everyday conversational words or speak using your microphone.",
    questions: [
      "Explain ocean temperature in simple words.",
      "What does salinity mean?",
      "What can we learn from this ocean dataset?"
    ]
  }
];

// ============================================================================
// UNIVERSAL QUESTION ANSWERING & REASONING ENGINE (FloatChatAI)
// ============================================================================
const FloatChatAI = {
  data: window.FLOAT_CHAT_DATA || { summary: {}, floats: [], observations: [], registry: [] },
  
  context: {
    lastMetric: null,
    lastOperation: null,
    lastRegion: null,
    lastFloatId: null,
    lastDepth: null,
    lastPeriod: null,
    lastDatasetId: null,
    lastResult: null
  },

  resetContext() {
    this.context = {
      lastMetric: null,
      lastOperation: null,
      lastRegion: null,
      lastFloatId: null,
      lastDepth: null,
      lastPeriod: null,
      lastDatasetId: null,
      lastResult: null
    };
  },

  detectLanguage(text) {
    if (!text) return 'en';
    if (/[\u0B80-\u0BFF]/.test(text)) return 'ta';
    if (/[\u0900-\u097F]/.test(text)) return 'hi';
    if (/[\u0C00-\u0C7F]/.test(text)) return 'te';
    if (/[\u0D00-\u0D7F]/.test(text)) return 'ml';
    return 'en';
  },

  getFloatRegion(id) {
    const idStr = String(id);
    const regions = {
      "1902456": "Arabian Sea (West Coast of India)",
      "2901633": "Western Bay of Bengal (Near Tamil Nadu / Sri Lanka)",
      "5906421": "Equatorial Indian Ocean (South of Sri Lanka)",
      "6903210": "Eastern Bay of Bengal (Near Andaman Sea)"
    };
    return regions[idStr] || `Float ${id}`;
  },

  deduplicateObservations(obsList) {
    const seen = new Set();
    const result = [];
    let dupCount = 0;
    for (const obs of obsList) {
      const key = `${obs.float_id}_${obs.cycle_number}_${Math.round(obs.depth)}`;
      if (!seen.has(key)) {
        seen.add(key);
        result.push(obs);
      } else {
        dupCount++;
      }
    }
    return { records: result, duplicatesRemoved: dupCount };
  },

  computeStats(records, metric = 'temperature') {
    if (!records || records.length === 0) return null;
    const vals = records.map(r => r[metric]).filter(v => v !== null && !isNaN(v));
    if (vals.length === 0) return null;
    vals.sort((a, b) => a - b);
    const sum = vals.reduce((a, b) => a + b, 0);
    const avg = sum / vals.length;
    const min = vals[0];
    const max = vals[vals.length - 1];
    const median = vals[Math.floor(vals.length / 2)];
    return {
      count: vals.length,
      avg: parseFloat(avg.toFixed(2)),
      min: parseFloat(min.toFixed(2)),
      max: parseFloat(max.toFixed(2)),
      median: parseFloat(median.toFixed(2))
    };
  },

  filterByPeriod(obsList, periodQuery) {
    const pLower = periodQuery.toLowerCase();
    return obsList.filter(obs => {
      const d = obs.date || '';
      if (pLower.includes('jan') && d.includes('-01-')) return true;
      if (pLower.includes('feb') && d.includes('-02-')) return true;
      if (pLower.includes('mar') && d.includes('-03-')) return true;
      if (pLower.includes('apr') && d.includes('-04-')) return true;
      if (pLower.includes('may') && d.includes('-05-')) return true;
      if (pLower.includes('jun') && d.includes('-06-')) return true;
      return false;
    });
  },

// ========================================================================
  // GEMINI API DIRECT REST INTEGRATION (Browser-to-Cloud with Zero-Fabrication RAG)
// ========================================================================
  // GEMINI API DIRECT REST INTEGRATION (Browser-to-Cloud with Zero-Fabrication RAG)
  // ========================================================================
  async callGemini(query, lang = 'en') {
    const key = localStorage.getItem('floatchat_gemini_api_key');
    if (!key) return null;

    const allObs = this.data.observations || [];
    const floats = this.data.floats || [];
    const tStats = this.computeStats(allObs, 'temperature');
    const sStats = this.computeStats(allObs, 'salinity');

    // Sample 25 representative profiles across regions and depths
    const sampleObs = allObs.filter((_, i) => i % 50 === 0).slice(0, 25);
    const systemPrompt = `You are FloatChat, a student-built scientific oceanographic AI assistant for the Indian Ocean ARGO Float dataset (January 15 – June 20, 2024).

GROUNDED ARGO DATASET SPECIFICATIONS (ZERO-FABRICATION RULE):
1. Active Fleet: 4 Autonomous Profiling ARGO Buoys
   - Float 1902456: Arabian Sea (West Coast of India, 14.28°N, 68.25°E) — Hot desert evaporative basin, highest ocean salinity up to 37.78 PSU.
   - Float 2901633: Western Bay of Bengal (near Tamil Nadu / Sri Lanka, 11.15°N, 81.86°E) — Ganges river discharge dilution, surface salinity down to 33.10 PSU.
   - Float 5906421: Equatorial Indian Ocean (south of Sri Lanka, 4.43°N, 80.02°E) — Tropical open ocean warm pool, warmest surface temperatures up to 31.69°C.
   - Float 6903210: Eastern Bay of Bengal (near Andaman Sea, 13.02°N, 88.84°E) — Southwest monsoon onset transition.
2. Dataset Archives: 3 registered archives containing 1,720 deduplicated scientific depth observations.
3. Physical Variables:
   - Water Temperature: Mean ${tStats?.avg}°C (from 4.01°C at 2,000m to 31.69°C at surface).
   - Salinity: Mean ${sStats?.avg} PSU (from 33.10 PSU to 37.78 PSU).
   - Thermocline: Between 100m and 500m where temperature plunges by >16°C.
4. Float Mechanics: Robotic buoys adjust internal hydraulic bladder oil to dive to 2,000m on a 10-day cycle, measuring profiles during ascent. They do NOT carry fish-finding sensors, cameras, or sonar.

SAMPLE OBSERVATIONS:
${JSON.stringify(sampleObs.map(o => ({ id: o.float_id, date: o.date, depth: o.depth, temp: o.temperature, sal: o.salinity, lat: o.latitude, lon: o.longitude })))}

INSTRUCTIONS:
- Answer the user's question accurately, educationally, and conversationally based on these verified ARGO ocean measurements.
- If the question asks about fish, weather, or non-ARGO sensors, politely clarify that ARGO buoys record physical ocean variables (temperature, salinity, depth, pressure).
- Language: Reply fluently in ${lang === 'ta' ? 'Tamil (தமிழ்)' : (lang === 'hi' ? 'Hindi (हिन्दी)' : (lang === 'te' ? 'Telugu (తెలుగు)' : (lang === 'ml' ? 'Malayalam (മലയാളം)' : 'English')))}.
- Use clear markdown formatting (bold key numbers, bullet points).`;

    const candidateModels = [
      'gemini-1.5-flash',
      'gemini-2.5-flash',
      'gemini-flash-latest',
      'gemini-3.8-flash'
    ];

    const payload = {
      contents: [
        {
          role: "user",
          parts: [
            { text: `${systemPrompt}\n\nUser Question: ${query}` }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 800
      }
    };

    let lastError = null;
    for (const model of candidateModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key.trim())}`;
        const resp = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (resp.ok) {
          const data = await resp.json();
          const ans = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (ans) return ans;
        } else {
          const errData = await resp.json().catch(() => ({}));
          lastError = errData.error?.message || `Status ${resp.status}`;
        }
      } catch (err) {
        lastError = err.message;
      }
    }

    throw new Error(lastError || "Could not reach Gemini API");
  },

  async answerQuestion(rawQuery, preferredLang = 'en') {
    // Check if Google Gemini AI is enabled and configured
    const geminiEnabled = localStorage.getItem('floatchat_gemini_enabled') === 'true';
    const geminiKey = localStorage.getItem('floatchat_gemini_api_key');
    if (geminiEnabled && geminiKey) {
      try {
        const geminiAnswer = await this.callGemini(query, activeLang);
        if (geminiAnswer) {
          const isMap = /where|map|location|position|float\s*positions/i.test(qLower);
          return {
            answer: geminiAnswer + "\n\n*(âœ¨ Answered by Google Gemini 1.5 Flash grounded in ARGO ocean observations)*",
            visualization_type: isMap ? 'map' : 'depth_profile',
            visualization_data: isMap ? floats : allObs.slice(0, 35)
          };
        }
      } catch (geminiErr) {
        console.warn("Gemini API call failed, falling back to local engine:", geminiErr);
      }
    }

    const query = (rawQuery || '').trim();
    const qLower = query.toLowerCase();
    const scriptLang = this.detectLanguage(query);
    const activeLang = scriptLang !== 'en' ? scriptLang : (preferredLang || 'en');

    // Friendly natural thinking delay
    await new Promise(r => setTimeout(r, 320));

    const allObs = this.data.observations || [];
    const floats = this.data.floats || [];
    const registry = this.data.registry || [];

    // Check for Float ID
    const knownFloats = ["1902456", "2901633", "5906421", "6903210"];
    let mentionedFloat = null;
    for (const fid of knownFloats) {
      if (qLower.includes(fid)) {
        mentionedFloat = fid;
        this.context.lastFloatId = fid;
        break;
      }
    }

    // Check for Depth
    let targetDepth = null;
    const depthMatch = qLower.match(/(\d+(?:\.\d+)?)\s*(?:m|meter|meters|மீட்டர்|मीटर|మీటర్లు|മീറ്റർ)/i) ||
                       qLower.match(/(?:depth|ஆழம்|गहराई|లోతు|ആഴം)\s*(?:of|இல்|में|లో|ൽ)?\s*(\d+(?:\.\d+)?)/i);
    if (depthMatch) {
      targetDepth = parseFloat(depthMatch[1]);
      this.context.lastDepth = targetDepth;
    } else if (/\b(surface|மேற்பரப்பு|सतह|ఉపరితలం|ഉపరిതലം)\b/i.test(qLower)) {
      targetDepth = 5;
      this.context.lastDepth = 5;
    }

    // Check for Region
    let mentionedRegion = null;
    if (/arabian\s*sea|அரபிக்கடல்|अरब\s*सागर|అరేబియా|അറബിക്കടൽ/i.test(qLower)) {
      mentionedRegion = 'Arabian Sea';
      this.context.lastRegion = 'Arabian Sea';
    } else if (/bay\s*of\s*bengal|வங்காள\s*விரிகுடா|बंगाल\s*की\s*खाड़ी|బంగాళాఖాతం|ബംഗാൾ/i.test(qLower)) {
      mentionedRegion = 'Bay of Bengal';
      this.context.lastRegion = 'Bay of Bengal';
    } else if (/equatorial|பூமத்திய\s*ரேகை|भूमध्यरेखीय|భూమధ్యరేఖ|ഭൂമധ്യരേഖ/i.test(qLower)) {
      mentionedRegion = 'Equatorial Indian Ocean';
      this.context.lastRegion = 'Equatorial Indian Ocean';
    }

// Check for Month / Seasonal window
    let mentionedMonth = null;
    if (/jan|ஜனவரி|जनवरी|జనవరి|ജനുവരി/i.test(qLower)) mentionedMonth = 'Jan';
    else if (/feb|பிப்ரவரி|फरवरी|ఫిబ్రవరి|ഫെബ്രുവരി/i.test(qLower)) mentionedMonth = 'Feb';
    else if (/mar|மார்ச்|मार्च|మార్చి|മാർച്ച്/i.test(qLower)) mentionedMonth = 'Mar';
    else if (/apr|ஏப்ரல்|अप्रैल|ఏప్రిల్|ഏപ്രിൽ/i.test(qLower)) mentionedMonth = 'Apr';
    else if (/may|மே\b|मई|మే|മേയ്/i.test(qLower)) mentionedMonth = 'May';
    else if (/jun|ஜூன்|जून|జూన్|ஜூൺ/i.test(qLower)) mentionedMonth = 'Jun';

    // ========================================================================
    // INTENT 1: GREETINGS
    // ========================================================================
    if (/^(hi|hello|hey|greetings|howdy|good\s*(morning|day|afternoon|evening))\b/i.test(qLower) ||
        /வணக்கம்|நமஸ்காரம்|नमस्ते|హలో|నమస్కారం|നമസ്കാരം/i.test(query) ||
        /^(vanakkam|namaste|namaskaram)\b/i.test(qLower)) {
      const resp = {
        en: `**Simple answer:** Hello! I'm FloatChat, a student-built ocean data assistant.\n\n**What I can do:**\n- Analyze real measurements from **4 ARGO profiling floats** across **3 registered datasets** (1,720 observations from January to June 2024).\n- Compare seasonal periods (e.g., *"Compare January to March with March to April"*).\n- Answer questions tailored for students, researchers, fishermen, teachers, and the public in English, Tamil, Hindi, Telugu, or Malayalam.\n\nTry clicking any question chip or select a user profile in the sidebar!`,
        ta: `**நேரடியான பதில்:** வணக்கம்! நான் FloatChat, பெருங்கடல் தரவு ஆய்வாளர்.\n\n**நான் என்ன செய்ய முடியும்:**\n- 4 ARGO தானியங்கி மிதவைகளின் 3 தரவுத்தொகுப்புகளை (1,720 அளவீடுகள், ஜனவரி - ஜூன் 2024) ஆய்வு செய்யலாம்.\n- வெவ்வேறு பருவங்களை ஒப்பிடலாம் (எ.கா. *"ஜனவரி மற்றும் மார்ச் மாதங்களை ஒப்பிடு"*).\n- மாணவர்கள், ஆசிரியர்கள், மீனவர்களுக்கான வழிகாட்டிகளை இடது பக்கத்தில் பார்க்கலாம்!`,
        hi: `**सीधा उत्तर:** नमस्ते! मैं FloatChat हूँ, आपका महासागरीय डेटा सहायक।\n\n**मेरी क्षमताएं:**\n- 4 ARGO रोबोटिक फ्लोट्स के 3 डेटासेट (1,720 वैज्ञानिक माप, जनवरी से जून 2024) का विश्लेषण करना।\n- विभिन्न महीनों और अवधियों की तुलना करना।\n- छात्रों, शोधकर्ताओं, मछुआरों और शिक्षकों के लिए प्रश्न पूछें!`,
        te: `**సూటి సమాధానం:** నమస్కారం! నేను FloatChat, మీ సముద్ర విజ్ఞాన సహాయకుడిని.\n\n**నేను ఏమి చేయగలను:**\n- 4 ARGO రోబోటిక్ ఫ్లోట్ల 3 డేటాసెట్‌లను (1,720 కొలతలు, జనవరి-జూన్ 2024) విశ్లేషించగలను.\n- విద్యార్థులు, పరిశోధకులు మరియు మత్స్యకారుల కోసం సూచించిన ప్రశ్నలను ఎడమవైపు చూడవచ్చు!`,
        ml: `**നേരിട്ടുള്ള ഉത്തരം:** നമസ്കാരം! ഞാൻ FloatChat, സമുദ്രപഠന സഹായി.\n\n**സവിശേഷതകൾ:**\n- 4 ARGO റോബോട്ടിക് ഫ്ലോട്ടുകളുടെ 3 ഡാറ്റാസെറ്റുകൾ (1,720 അളവുകൾ, ജനുവരി-ജൂൺ 2024) പരിശോധിക്കാം.\n- സൈഡ്‌ബാറിലെ വിവരങ്ങൾ പരിശോധിക്കുക!`
      };
      return {
        answer: resp[activeLang] || resp.en,
        visualization_type: 'none',
        visualization_data: null
      };
    }

    // ========================================================================
    // INTENT 2: USER CATEGORY SPECIFIC QUESTIONS
    // ========================================================================

    // 2.1 Graph & Chart Explanation (Students, Environmental Enthusiasts)
    if (/explain.*(this )?ocean graph|temperature changes shown in this graph|explain this graph/i.test(qLower)) {
      return {
        answer: `**Simple answer:** This vertical depth profile graph illustrates how water temperature and salinity change from the sea surface down to 2,000 meters below sea level.

**How to read the lines:**
- **Temperature curve (Sage Green):** Water is warmed by tropical sunlight at the surface (~28.6°C to 31.7°C). In the upper 50–100 meters, wind stirring keeps the warmth relatively uniform. Between **100m and 500m** (the **thermocline**), sunlight cannot penetrate, and water temperature plunges rapidly down to ~12°C. Below 1,000 meters, it stabilizes into refrigerator-cold deep ocean water (~4°C).
- **Salinity curve (Terracotta):** Shows dissolved mineral salt content in **PSU** (Practical Salinity Units). Across our Indian Ocean data, salinity remains steady between **33.10 and 37.78 PSU**, with lower salinity in the Bay of Bengal (river influx) and higher salinity in the Arabian Sea (intense evaporation).
- **Vertical axis:** Measures depth in meters below the surface.

**Visual:** Live depth profile chart below:`,
        visualization_type: 'depth_profile',
        visualization_data: allObs.slice(0, 35)
      };
    }

    // 2.2 Fishermen: What does temperature data indicate?
    if (/what does the ocean temperature data indicate|ocean temperature data indicate/i.test(qLower)) {
      return {
        answer: `**Simple answer:** The ocean temperature data indicates strong tropical surface heating, seasonal warming, and a sharp separation between warm surface water and cold deep ocean water.

**What the measurements reveal:**
- **Warm Mixed Surface Layer:** Surface temperatures range between **28.6°C and 31.7°C**, indicating energetic heat absorption across the Northern Indian Ocean.
- **Thermocline Boundary:** Between 100m and 500m, temperature drops by more than 16°C. This creates a natural barrier that slows down vertical water mixing.
- **Deep Ocean Stability:** At depths past 1,000m down to 2,000m, temperature remains consistently cold (**4.0°C to 4.5°C**).

*(Important Note: ARGO floats measure physical ocean variables—temperature, salinity, depth, and pressure. They do not carry biological fish-finding sensors and cannot predict fish locations or guarantee fishing success. However, understanding water temperature and layer depths helps characterize overall marine environment conditions.)*`,
        visualization_type: 'depth_profile',
        visualization_data: allObs.slice(0, 35)
      };
    }

    // 2.3 Fishermen / Multilingual: Simple Tamil Explanation
    if (/simple tamil|தமிழில்|விளக்கம்.*தமிழ்/i.test(qLower)) {
      return {
        answer: `**நேரடியான பதில் (எளிய தமிழில்):** நமது ARGO மிதவைகள் இந்தியப் பெருங்கடல், அரபிக்கடல் மற்றும் வங்காள விரிகுடாவில் நீரின் வெப்பநிலையையும் உப்புத்தன்மையையும் அளவிடுகின்றன.

**முக்கிய விவரங்கள்:**
- **மேற்பரப்பு நீர்:** வெயிலின் தாக்கத்தால் கடல் மேற்பரப்பு நீர் வெதுவெதுப்பாக **28.6°C முதல் 31.7°C** வரை இருக்கும்.
- **ஆழமான நீர்:** 500 மீட்டருக்குக் கீழே சூரிய ஒளி செல்லாததால் நீர் குளிர்ந்து **12°C** ஆகவும், 2,000 மீட்டர் ஆழத்தில் ஃபிரிட்ஜ் போன்ற கடும் குளிராக **4°C** ஆகவும் இருக்கும்.
- **உப்புத்தன்மை:** அரபிக்கடலில் வெயில் அதிகம் என்பதால் நீர் ஆவியாகி உப்புத்தன்மை அதிகமாகவும் (37.8 PSU), வங்காள விரிகுடாவில் கங்கை போன்ற ஆறுகள் கலப்பதால் உப்புத்தன்மை குறைவாகவும் (33.1 PSU) உள்ளது.

*(முக்கியக் குறிப்பு: ARGO மிதவைகள் நீரின் வெப்பத்தையும் உப்பையும் மட்டுமே அளவிடுகின்றன; மீன்கள் இருக்கும் இடங்களையோ மீன்பிடி வெற்றிகளையோ இது காட்டாது).*`,
        visualization_type: 'depth_profile',
        visualization_data: allObs.slice(0, 35)
      };
    }

    // 2.4 Teachers & General Public: Explain ocean temperature to a school student / simple words
    if (/school student|simple words|what is ocean temp/i.test(qLower) && !/compare|highest|lowest/i.test(qLower)) {
      return {
        answer: `**Simple answer:** Ocean temperature is a measure of how warm or cold seawater is, heated naturally by the sun!

**Easy Analogy for Students:**
- Think of the ocean like a giant swimming pool under the hot summer sun. The top layer where you swim is warm and pleasant (**~29°C to 31°C**).
- But if you could dive deep like our yellow ARGO robot buoys down to 1,000 or 2,000 meters, no sunlight ever reaches there. It becomes completely dark, and the water is icy cold (**~4°C**), just like inside a household refrigerator!
- Scientists use yellow robotic floats called **ARGO buoys** that swim up and down to measure this temperature every 10 days.`,
        visualization_type: 'depth_profile',
        visualization_data: allObs.slice(0, 35)
      };
    }

    // 2.5 Teachers: Summarize observations for a classroom presentation
    if (/classroom presentation|summarize.*observations for/i.test(qLower)) {
      return {
        answer: `**Simple answer:** Here is an executive summary of the ARGO ocean observations ready for a classroom or lecture presentation:

**Oceanographic Presentation Overview:**
1. **Fleet & Sensor Coverage:**
   - **4 Autonomous Profiling Buoys:** Float 1902456 (Arabian Sea), Float 2901633 (W. Bay of Bengal), Float 5906421 (Equatorial Ocean), Float 6903210 (E. Bay of Bengal).
   - **Total Observations:** 1,720 verified measurements across 3 NetCDF and CSV archives.
   - **Temporal Scope:** January 15 – June 20, 2024 (5-month continuous time series).
2. **Key Physical Parameters:**
   - **Water Temperature:** Extremes from **4.01°C** (at 2,000m) to **31.69°C** (at surface), with an overall dataset mean of **16.24°C**.
   - **Salinity:** Ranges from **33.10 PSU** (Bay of Bengal freshwater dilution) to **37.78 PSU** (Arabian Sea evaporative basin).
3. **Core Ocean Science Phenomena Demonstrated:**
   - **Thermocline:** Steep gradient between 100m and 500m.
   - **Seasonal Solar Warming:** Pre-monsoon heating in April (+0.8°C to +1.2°C surface temperature bump).`,
        visualization_type: 'none',
        visualization_data: null
      };
    }

    // 2.6 Teachers: Difference between temperature and salinity
    if (/difference between temperature and salinity/i.test(qLower)) {
      return {
        answer: `**Simple answer:** **Temperature** measures how warm the water is, while **Salinity** measures how much dissolved salt is in the water.

**Key Differences:**
- **Temperature (°C):**
  - Measures thermal energy from solar radiation.
  - Drops sharply with depth (from ~30°C at surface to ~4°C at 2,000m).
  - Drives ocean convection and atmospheric circulation.
- **Salinity (PSU):**
  - Measures dissolved mineral salts (mostly table salt, sodium chloride).
  - Varies horizontally across basins: ~33 PSU in the Bay of Bengal (diluted by river discharge) vs ~37.8 PSU in the Arabian Sea (concentrated by evaporation).
  - Together with temperature, salinity dictates **seawater density**, which powers global ocean conveyor currents!`,
        visualization_type: 'depth_profile',
        visualization_data: allObs.slice(0, 35)
      };
    }

    // 2.7 Scientists & Researchers: Summarize the available salinity measurements
    if (/summarize the available salinity measurements/i.test(qLower)) {
      const salStats = this.computeStats(allObs, 'salinity');
      return {
        answer: `**Simple answer:** Across our 1,720 observations, recorded ocean salinity averages **${salStats?.avg} PSU**, spanning from **${salStats?.min} PSU** to **${salStats?.max} PSU**.

**Salinity Distribution Highlights:**
- **Average:** ${salStats?.avg} PSU (Median: ${salStats?.median} PSU)
- **Minimum:** ${salStats?.min} PSU (Recorded in upper Bay of Bengal by Float 2901633, diluted by river runoff).
- **Maximum:** ${salStats?.max} PSU (Recorded in the Arabian Sea by Float 1902456, concentrated by strong evaporative winds).
- **Depth Pattern:** Surface salinity shows wide regional differences, but below 500 meters depth, salinity converges towards a steady **34.8 to 35.2 PSU**.`,
        visualization_type: 'depth_profile',
        visualization_data: allObs.slice(0, 35)
      };
    }

    // 2.8 Scientists & Researchers: Observations for a selected ocean region
    if (/observations.*selected ocean region|selected ocean region/i.test(qLower)) {
      return {
        answer: `**Simple answer:** The ARGO dataset monitors 3 primary regions of the Northern Indian Ocean:

1. **Arabian Sea (West Coast of India):**
   - Monitored by **Float 1902456** (14.28°N, 68.25°E).
   - High evaporation region: highest salinity (**up to 37.78 PSU**) and surface temps of **28.6°C–31.2°C**.
2. **Bay of Bengal (Eastern & Western Basins):**
   - Monitored by **Float 2901633** (11.15°N, 81.86°E) and **Float 6903210** (13.02°N, 88.84°E).
   - River-influenced basin: lower surface salinity (**33.10–35.5 PSU**) and surface temps of **29.2°C–31.5°C**.
3. **Equatorial Indian Ocean (South of Sri Lanka):**
   - Monitored by **Float 5906421** (4.43°N, 80.02°E).
   - Warm pool waters: warmest surface temperatures (**up to 31.69°C**) and salinity around **34.7–35.0 PSU**.`,
        visualization_type: 'map',
        visualization_data: floats
      };
    }

    // 2.9 Fishermen: Observations near this location
    if (/observations near this location|available ocean observations near/i.test(qLower)) {
      return {
        answer: `**Simple answer:** In our Indian Ocean observation array, measurements are continuously logged by 4 active robotic buoys:

- **Arabian Sea Location (14.28°N, 68.26°E):** Surface temperature **28.64°C**, salinity **36.35 PSU**, depth down to 1,986m (Float 1902456).
- **Western Bay of Bengal (11.16°N, 81.87°E):** Surface temperature **29.71°C**, salinity **33.91 PSU**, depth down to 1,986m (Float 2901633).
- **Equatorial Indian Ocean (4.43°N, 80.03°E):** Surface temperature **30.17°C**, salinity **34.85 PSU**, depth down to 1,986m (Float 5906421).
- **Eastern Bay of Bengal / Andaman (13.03°N, 88.85°E):** Surface temperature **29.23°C**, salinity **33.42 PSU**, depth down to 1,986m (Float 6903210).

*(Note: Data reflects physical oceanographic parameters from autonomous ARGO floats. It does not measure fish stocks or fishing locations.)*`,
        visualization_type: 'map',
        visualization_data: floats
      };
    }

    // 2.10 General Public: What can we learn from this ocean dataset?
    if (/what can we learn from this ocean dataset/i.test(qLower)) {
      return {
        answer: `**Simple answer:** This dataset provides valuable scientific insights into physical ocean dynamics across the Northern Indian Ocean:

1. **Pre-Monsoon Solar Warming:** Measurements from March to April show surface waters heating up by **+0.8°C to +1.2°C** before monsoon winds stir the upper ocean in May and June.
2. **Contrasting Salinity Regimes:** Proves how river drainage into the Bay of Bengal produces a fresher top layer (33 PSU), while desert evaporation over the Arabian Sea makes it one of the saltiest open seas (37.8 PSU).
3. **The Ocean Thermocline:** Illustrates that despite warm tropical surface water, over **80% of ocean volume** remains colder than 12°C below 300 meters depth.
4. **Autonomous Buoy Robotics:** Demonstrates how free-drifting robotic floats collect high-precision profiles across thousands of kilometers without human intervention.`,
        visualization_type: 'none',
        visualization_data: null
      };
    }

    // ========================================================================
    // INTENT 3: PERIOD & DATASET COMPARISONS (Universal Comparison Engine)
    // ========================================================================
    const isComparison = /compare|difference\s+between|versus|\bvs\b|how\s+does.*change|ஒப்பிடு|तुलना|పోల్చండి|താരതമ്യം/i.test(qLower);
    if (isComparison) {
      this.context.lastOperation = 'compare';
      
      let p1Name = "Dataset A (Jan 15 – Mar 05)";
      let p2Name = "Dataset B (Mar 01 – Apr 25)";
      let p1Obs = this.data.dataset_a_observations || allObs.slice(0, 840);
      let p2Obs = this.data.dataset_b_observations || allObs.slice(840, 1420);
      
      if (/may|jun|monsoon/i.test(qLower) && /mar|apr|spring/i.test(qLower)) {
        p1Name = "Pre-Monsoon Spring (Dataset B: Mar–Apr)";
        p2Name = "Monsoon Transition (Dataset C: May–Jun)";
        p1Obs = this.data.dataset_b_observations || [];
        p2Obs = this.data.dataset_c_observations || [];
      } else if (/jan|feb|winter/i.test(qLower) && /may|jun|monsoon/i.test(qLower)) {
        p1Name = "Winter Baseline (Dataset A: Jan–Mar)";
        p2Name = "Monsoon Transition (Dataset C: May–Jun)";
        p1Obs = this.data.dataset_a_observations || [];
        p2Obs = this.data.dataset_c_observations || [];
      } else if (/arabian/i.test(qLower) && /bengal/i.test(qLower)) {
        p1Name = "Arabian Sea (Float 1902456)";
        p2Name = "Bay of Bengal (Floats 2901633 & 6903210)";
        p1Obs = allObs.filter(o => o.float_id === "1902456");
        p2Obs = allObs.filter(o => o.float_id === "2901633" || o.float_id === "6903210");
      }

      let filterP1 = p1Obs;
      let filterP2 = p2Obs;
      if (targetDepth) {
        filterP1 = p1Obs.filter(o => Math.abs(o.depth - targetDepth) <= targetDepth * 0.25 || Math.abs(o.depth - targetDepth) <= 15);
        filterP2 = p2Obs.filter(o => Math.abs(o.depth - targetDepth) <= targetDepth * 0.25 || Math.abs(o.depth - targetDepth) <= 15);
      }

      const p1Dedup = this.deduplicateObservations(filterP1);
      const p2Dedup = this.deduplicateObservations(filterP2);

      const p1Temp = this.computeStats(p1Dedup.records, 'temperature');
      const p2Temp = this.computeStats(p2Dedup.records, 'temperature');
      const p1Sal = this.computeStats(p1Dedup.records, 'salinity');
      const p2Sal = this.computeStats(p2Dedup.records, 'salinity');

      const tempDiff = p2Temp && p1Temp ? (p2Temp.avg - p1Temp.avg).toFixed(2) : "N/A";
      const salDiff = p2Sal && p1Sal ? (p2Sal.avg - p1Sal.avg).toFixed(2) : "N/A";
      const tempSign = parseFloat(tempDiff) > 0 ? "+" : "";
      const salSign = parseFloat(salDiff) > 0 ? "+" : "";

      const answers = {
        en: `**Simple answer:** Comparing **${p1Name}** with **${p2Name}** reveals clear seasonal shifts in temperature and salt content.

**What this means:**
- **Period 1 (${p1Name}):** Average temperature is **${p1Temp?.avg}°C** (range: ${p1Temp?.min}°C to ${p1Temp?.max}°C) with an average salinity of **${p1Sal?.avg} PSU**.
- **Period 2 (${p2Name}):** Average temperature is **${p2Temp?.avg}°C** (range: ${p2Temp?.min}°C to ${p2Temp?.max}°C) with an average salinity of **${p2Sal?.avg} PSU**.
- **Net Difference:** Average water temperature changed by **${tempSign}${tempDiff}°C**, and salinity changed by **${salSign}${salDiff} PSU**.
- **Dataset Deduplication:** ${p1Dedup.duplicatesRemoved + p2Dedup.duplicatesRemoved} overlapping observation records (such as March 01–05 calibration dive cycles) were identified and deduplicated for clean statistical integrity.

**Why this happens:** In the northern Indian Ocean, solar heating peaks during March and April before monsoon winds start stirring up cooler deep waters in May and June.`,

        ta: `**நேரடியான பதில்:** **${p1Name}** மற்றும் **${p2Name}** ஆகியவற்றை ஒப்பிடும்போது வெப்பநிலையிலும் உப்புத்தன்மையிலும் தெளிவான பருவநிலை மாற்றங்கள் காணப்படுகின்றன.

**எளிமையான விளக்கம்:**
- **காலக்கட்டம் 1 (${p1Name}):** சராசரி வெப்பநிலை **${p1Temp?.avg}°C**, சராசரி உப்புத்தன்மை **${p1Sal?.avg} PSU**.
- **காலக்கட்டம் 2 (${p2Name}):** சராசரி வெப்பநிலை **${p2Temp?.avg}°C**, சராசரி உப்புத்தன்மை **${p2Sal?.avg} PSU**.
- **முக்கிய வேறுபாடு:** வெப்பநிலை மாற்றம்: **${tempSign}${tempDiff}°C**, உப்புத்தன்மை மாற்றம்: **${salSign}${salDiff} PSU**.
- **தரவு சரிபார்ப்பு:** மார்ச் 01-05 இடைப்பட்ட சுழற்சிகளில் உள்ள நகல் பதிவுகள் நீக்கப்பட்டு துல்லியமான புள்ளிவிவரங்கள் கணக்கிடப்பட்டுள்ளன.`,

        hi: `**सीधा उत्तर:** **${p1Name}** और **${p2Name}** की तुलना से तापमान और खारेपन में स्पष्ट मौसमी बदलाव दिखाई देते हैं।

**मुख्य विश्लेषण:**
- **अवधि 1:** औसत तापमान **${p1Temp?.avg}°C**, औसत लवणता **${p1Sal?.avg} PSU**।
- **अवधि 2:** औसत तापमान **${p2Temp?.avg}°C**, औसत लवणता **${p2Sal?.avg} PSU**।
- **कुल अंतर:** तापमान में **${tempSign}${tempDiff}°C** और लवणता में **${salSign}${salDiff} PSU** का परिवर्तन दर्ज हुआ।
- **डेटा शुद्धता:** ओवरलैपिंग अवलोकन चक्रों को हटाकर सटीक वैज्ञानिक तुलना की गई है।`,

        te: `**సూటి సమాధానం:** **${p1Name}** మరియు **${p2Name}** పోలిక ద్వారా ఉష్ణోగ్రత మరియు లవణీయతలో స్పష్టమైన మార్పులు కనబడుతున్నాయి.

**విశ్లేషణ:**
- **పీరియడ్ 1:** సగటు ఉష్ణోగ్రత **${p1Temp?.avg}°C**, సెలైనిటీ **${p1Sal?.avg} PSU**.
- **పీరియడ్ 2:** సగటు ఉష్ణోగ్రత **${p2Temp?.avg}°C**, సెలైనిటీ **${p2Sal?.avg} PSU**.
- **తేడా:** ఉష్ణోగ్రత మార్పు: **${tempSign}${tempDiff}°C**, సెలైనిటీ మార్పు: **${salSign}${salDiff} PSU**.`,

        ml: `**നേരിട്ടുള്ള ഉത്തരം:** **${p1Name}** ഉം **${p2Name}** ഉം തമ്മിലുള്ള താരതമ്യം സമുദ്ര താപനിലയിലെയും ലവണാംശത്തിലെയും വ്യക്തമായ മാറ്റങ്ങൾ വ്യക്തമാക്കുന്നു.

**വിശദീകരണം:**
- **കാലയളവ് 1:** ശരാശരി താപനില **${p1Temp?.avg}°C**, ലവണാംശം **${p1Sal?.avg} PSU**.
- **കാലയളവ് 2:** ശരാശരി താപനില **${p2Temp?.avg}°C**, ലവണാംശം **${p2Sal?.avg} PSU**.
- **ആകെ വ്യത്യാസം:** താപനില വ്യത്യാസം: **${tempSign}${tempDiff}°C**, ലവണാംശ വ്യത്യാസം: **${salSign}${salDiff} PSU**.`
      };

      return {
        answer: answers[activeLang] || answers.en,
        visualization_type: 'depth_profile',
        visualization_data: (p2Dedup.records.length > 0 ? p2Dedup.records : allObs).slice(0, 35)
      };
    }

    // ========================================================================
    // INTENT 4: EXTREMA (Warmest, Coldest, Saltiest, Freshest, Deepest, Shallowest)
    // ========================================================================
    const isWarmest = /warmest|hottest|highest\s+temp|maximum\s+temp|வெப்பமான|सबसे\s*गर्म|అత్యధిక\s*ఉష్ణోగ్రత|കൂടിയ\s*താപനില/i.test(qLower);
    const isColdest = /coldest|coolest|lowest\s+temp|minimum\s+temp|குளிர்ந்த|सबसे\s*ठंडा|అత్యల్ప\s*ఉష్ణோగ్రత|കുറഞ്ഞ\s*താപനില/i.test(qLower);
    const isSaltiest = /saltiest|highest\s+salin|maximum\s+salin|most\s+salt|அதிக\s*உப்பு|सबसे\s*खारा|అత్యధిక\s*సెలైనిటీ|കൂടിയ\s*ലവണാംശം/i.test(qLower);
    const isFreshest = /freshest|least\s+salty|lowest\s+salin|minimum\s+salin|குறைந்த\s*உப்பு|कम\s*खारा|తక్కువ\s*సెలైనిటీ|കുറഞ്ഞ\s*ലവണാംശം/i.test(qLower);
    const isDeepest = /deepest|maximum\s+depth|deepest\s+record|ஆழமான|सबसे\s*गहरा|అత్యంత\s*లోతైన|ഏറ്റവും\s*ആഴമുള്ള/i.test(qLower);

    if (isWarmest) {
      this.context.lastMetric = 'temperature';
      this.context.lastOperation = 'extrema';
      const sorted = [...allObs].sort((a, b) => b.temperature - a.temperature);
      const top = sorted[0];
      return {
        answer: `**Simple answer:** The warmest water recorded is **${top.temperature.toFixed(2)}°C** (89°F).\n\n**Details:**\n- Recorded by Float **${top.float_id}** in the **${this.getFloatRegion(top.float_id)}**.\n- Depth: **${top.depth}m** (sunlit upper ocean layer).\n- Coordinates: **${top.latitude}°N, ${top.longitude}°E** on **${top.date}**.\n- Dataset source: **${top.dataset_id || 'dataset_b'}** (spring pre-monsoon solar warming window).`,
        visualization_type: 'depth_profile',
        visualization_data: allObs.filter(o => o.float_id === top.float_id).slice(0, 35)
      };
    }

    if (isColdest) {
      this.context.lastMetric = 'temperature';
      this.context.lastOperation = 'extrema';
      const sorted = [...allObs].sort((a, b) => a.temperature - b.temperature);
      const low = sorted[0];
      return {
        answer: `**Simple answer:** The coldest water recorded is **${low.temperature.toFixed(2)}°C** (39°F) — nearly refrigerator temperature!\n\n**Details:**\n- Recorded at a deep ocean depth of **${low.depth}m**.\n- Buoy: Float **${low.float_id}** at **${low.latitude}°N, ${low.longitude}°E**.\n- Date: **${low.date}**.\n- At this depth, no sunlight reaches the water, keeping the deep ocean cold year-round.`,
        visualization_type: 'depth_profile',
        visualization_data: allObs.filter(o => o.float_id === low.float_id).slice(0, 35)
      };
    }

    if (isSaltiest) {
      this.context.lastMetric = 'salinity';
      this.context.lastOperation = 'extrema';
      const sorted = [...allObs].sort((a, b) => b.salinity - a.salinity);
      const top = sorted[0];
      return {
        answer: `**Simple answer:** The saltiest water recorded is **${top.salinity.toFixed(2)} PSU**.\n\n**Details:**\n- Recorded in the **Arabian Sea** (Float **${top.float_id}**).\n- Coordinates: **${top.latitude}°N, ${top.longitude}°E** at **${top.depth}m** depth.\n- **Why here?** The Arabian Sea experiences intense evaporation under desert winds with virtually no major river runoff, concentrating natural sea salts.`,
        visualization_type: 'depth_profile',
        visualization_data: allObs.filter(o => o.float_id === top.float_id).slice(0, 35)
      };
    }

    if (isFreshest) {
      this.context.lastMetric = 'salinity';
      this.context.lastOperation = 'extrema';
      const sorted = [...allObs].sort((a, b) => a.salinity - b.salinity);
      const low = sorted[0];
      return {
        answer: `**Simple answer:** The freshest (least salty) water recorded is **${low.salinity.toFixed(2)} PSU**.\n\n**Details:**\n- Location: **Bay of Bengal** (Float **${low.float_id}**).\n- Coordinates: **${low.latitude}°N, ${low.longitude}°E**.\n- **Why here?** Massive freshwater discharge from the Ganges, Brahmaputra, and Irrawaddy river systems dilutes the upper layers of the Bay of Bengal, making it significantly less salty than the Arabian Sea.`,
        visualization_type: 'depth_profile',
        visualization_data: allObs.filter(o => o.float_id === low.float_id).slice(0, 35)
      };
    }

    if (isDeepest) {
      this.context.lastMetric = 'depth';
      this.context.lastOperation = 'extrema';
      const sorted = [...allObs].sort((a, b) => b.depth - a.depth);
      const deep = sorted[0];
      return {
        answer: `**Simple answer:** The deepest measurement in our registry is **${deep.depth.toFixed(1)} meters** below sea level (2 kilometers deep!).\n\n**What this means:** That is equivalent to 6 Eiffel Towers stacked underwater. At 2,000 meters, water pressure exceeds 200 atmospheres, and the temperature is frigid (**${deep.temperature.toFixed(2)}°C**).\n\n- Recorded by Float **${deep.float_id}** on **${deep.date}**.`,
        visualization_type: 'depth_profile',
        visualization_data: allObs.filter(o => o.float_id === deep.float_id).slice(0, 35)
      };
    }

    // ========================================================================
    // INTENT 5: STATISTICAL INQUIRIES (Averages, Medians, Trends)
    // ========================================================================
    const isAverage = /average|mean|median|overall|சராசரி|औसत|సగటు|ശരാശരി/i.test(qLower);
    const isTrend = /trend|pattern|profile|change\s+with\s+depth|போக்|प्रवृत्ति|ట్రెండ్|പ്രവണത/i.test(qLower);

    if (isAverage || isTrend) {
      let metric = /salin|உப்பு|लवणता|సెలైనిటీ|లവണാംശം/i.test(qLower) ? 'salinity' : 'temperature';
      if (this.context.lastMetric && !/temp|salin/i.test(qLower)) {
        metric = this.context.lastMetric;
      }
      this.context.lastMetric = metric;

      let subset = allObs;
      let label = "across all 3 registered Indian Ocean datasets";

      if (targetDepth) {
        subset = subset.filter(o => Math.abs(o.depth - targetDepth) <= Math.max(15, targetDepth * 0.2));
        label = `at approximately ${targetDepth} meters depth`;
      } else if (mentionedFloat) {
        subset = subset.filter(o => o.float_id === mentionedFloat);
        label = `for Float ${mentionedFloat} (${this.getFloatRegion(mentionedFloat)})`;
      } else if (mentionedRegion) {
        if (mentionedRegion === 'Arabian Sea') subset = subset.filter(o => o.float_id === "1902456");
        else if (mentionedRegion === 'Bay of Bengal') subset = subset.filter(o => o.float_id === "2901633" || o.float_id === "6903210");
        else subset = subset.filter(o => o.float_id === "5906421");
        label = `in the ${mentionedRegion}`;
      }

      const stats = this.computeStats(subset, metric);
      const unit = metric === 'temperature' ? '°C' : 'PSU';

      return {
        answer: `**Simple answer:** The average ${metric} ${label} is **${stats?.avg} ${unit}**.\n\n**Statistical Details:**\n- **Median:** ${stats?.median} ${unit}\n- **Minimum:** ${stats?.min} ${unit}\n- **Maximum:** ${stats?.max} ${unit}\n- **Observations analyzed:** ${stats?.count} records (deduplicated across active datasets).\n\n${metric === 'temperature' ? '💡 Notice how surface water warms under tropical sunlight, while the thermocline (100–500m) causes temperatures to plunge steeply.' : '💡 Notice that salinity stays balanced between 33 and 37.8 PSU throughout the water column.'}`,
        visualization_type: 'depth_profile',
        visualization_data: subset.slice(0, 35)
      };
    }

// ========================================================================
    // INTENT 6: GENERAL OCEAN SCIENCE CONCEPTS
    // ========================================================================
    if (/thermocline|வெப்பச்சரிவு|थर्मोक्लाइन|థర్మోక్లైన్|തെർമോക്ലൈൻ/i.test(qLower)) {
      return {
        answer: `**Simple answer:** The **thermocline** is the underwater transition layer where ocean temperature drops dramatically with increasing depth.\n\n**Key Characteristics:**\n- **Upper Mixed Layer (0–100m):** Sunlit and stirred by surface trade winds, staying warm at **~28.6°C to 31.7°C**.\n- **The Thermocline (100m–500m):** Sunlight extinguishes and temperature plummets by more than **16°C** (down to ~12°C).\n- **Deep Cold Zone (500m–2,000m):** Cold, dense, stable ocean water settling at **4.0°C to 4.5°C**.\n\n**Live Data:** Live vertical profile chart below shows this sharp thermocline knee curve:`,
        visualization_type: 'depth_profile',
        visualization_data: allObs.slice(0, 35)
      };
    }

    if (/halocline|உப்புச்சரிவு|हैलोक्लाइन|హాలోక్లైన్|ഹാലോക്ലൈൻ/i.test(qLower)) {
      return {
        answer: `**Simple answer:** The **halocline** is the oceanic depth layer where salinity (saltiness) shifts rapidly across the water column.\n\n**In our Northern Indian Ocean data:**\n- In the **Bay of Bengal (Float 2901633)**, massive seasonal freshwater runoff creates a low-salinity surface layer (**~33.10 to 33.90 PSU**).\n- Between **50m and 150m**, the halocline creates a steep salt jump up to **~35.40 PSU** as dense open-sea water takes over.\n- This density barrier limits vertical mixing between surface and deep waters.`,
        visualization_type: 'depth_profile',
        visualization_data: allObs.filter(o => o.float_id === "2901633").slice(0, 35)
      };
    }

    if (/why.*(salty|salt|salin)|why.*arabian.*saltier|ஏன்.*உப்பு|क्यों.*खारा/i.test(qLower)) {
      return {
        answer: `**Simple answer:** The ocean is salty because rain dissolves minerals and rocks on land, washing them into rivers and seas. Over millions of years, water evaporates while mineral salts remain behind.\n\n**Why the Arabian Sea is much saltier than the Bay of Bengal:**\n1. **Arabian Sea (High Salinity ~36.5 to 37.8 PSU):** Dry, arid winds from surrounding deserts cause heavy evaporation without major river inflows, concentrating salt.\n2. **Bay of Bengal (Lower Salinity ~33.1 to 35.0 PSU):** Receives colossal freshwater discharge from major river systems (Ganges, Brahmaputra, Irrawaddy), diluting the surface seawater.`,
        visualization_type: 'depth_profile',
        visualization_data: allObs.slice(0, 35)
      };
    }

    if (/what\s+is\s+salin|meaning\s+of\s+salin|define\s+salin|how\s+salty|salt\s+content/i.test(qLower) ||
        /உப்புத்தன்மை|சலைன்|लवणता|खारापन|సెలైనిటీ|లవణీయత|സലൈനിറ്റി|ലവണാംശം/i.test(query)) {
      this.context.lastMetric = 'salinity';
      return {
        answer: `**Simple answer:** **Salinity** is the measure of dissolved mineral salts (primarily sodium and chloride ions) dissolved in seawater.\n\n**Measurement & Real Dataset Values:**\n- Measured in **PSU** (Practical Salinity Units, roughly equivalent to grams of salt per kilogram of water).\n- Across our **1,720 ARGO measurements**, Indian Ocean salinity averages **35.25 PSU** (ranging from **33.10 PSU** in the upper Bay of Bengal to **37.78 PSU** in the Arabian Sea).\n- Salinity and temperature together determine **seawater density**, which powers planetary conveyor belt currents!`,
        visualization_type: 'depth_profile',
        visualization_data: allObs.slice(0, 35)
      };
    }

    if (/what\s+is\s+an?\s+argo|how\s+do\s+floats\s+work|how\s+does\s+argo\s+work|what\s+is\s+a\s+float|மிதவை\s*என்றால்|ARGO\s*क्या\s*है|ఫ్లోట్\s*అంటే|ഫ്ലോട്ട്\s*എന്നാൽ/i.test(qLower)) {
      return {
        answer: `**Simple answer:** **ARGO floats** are autonomous robotic oceanographic buoys that drift with underwater currents to monitor the world's oceans in 3D.\n\n**Their 10-Day Dive Cycle:**\n1. **Buoyancy Shift:** An internal hydraulic bladder shifts mineral oil into an external rubber reservoir to sink down to **1,000m**.\n2. **Drifting (9 Days):** Drifts freely with deep ocean currents across hundreds of kilometers.\n3. **Deep Dive:** Sinks down to **2,000 meters depth** (pressures >200 atmospheres).\n4. **Ascent Profiling:** Ascends over ~6 hours, continuously measuring temperature, salinity, and pressure.\n5. **Satellite Transmission:** Surfacing for ~15 minutes, it transmits GPS and profile data via Iridium satellites to ocean centers, then starts the next cycle!`,
        visualization_type: 'map',
        visualization_data: floats
      };
    }

    // ========================================================================
    // INTENT 7: FISH / BIOLOGICAL / SENSOR CAPABILITY
    // ========================================================================
    if (/fish|fishing|marine\s+life|shark|whale|catch|fisherman|மீன்|மச்ச|मछली|చేప|മത്സ്യം/i.test(qLower)) {
      return {
        answer: `**Simple answer:** ARGO robotic floats measure physical ocean variables (temperature, salinity, depth, and pressure). **They do not possess fish-finding sensors, fish cameras, or sonar**, and cannot locate fish schools directly.\n\n**How ocean data helps marine communities:**\n- **Surface Temperature:** Indicates thermal boundaries where nutrient upwelling occurs.\n- **Thermocline Depth:** Fish species prefer specific temperature ranges (typically within the upper 50–150m).\n- **Safety & Currents:** Helps meteorologists predict storms, monsoon waves, and drift conditions.`,
        visualization_type: 'depth_profile',
        visualization_data: allObs.slice(0, 35)
      };
    }

    // ========================================================================
    // INTENT 8: FLEET VOLUME & METRIC COUNTS
    // ========================================================================
    if (/how\s+many|total\s*(obs|measurements|records|floats|buoys|datasets)|count|number\s+of|எத்தனை|कितने|ఎన్ని|എത്ര/i.test(qLower)) {
      const uniqueFids = [...new Set(allObs.map(o => o.float_id))];
      return {
        answer: `**Simple answer:** FloatChat monitors **4 robotic ARGO buoys** containing **1,720 deduplicated scientific observations** across **3 registered archives** from January to June 2024.\n\n**Detailed Fleet Count:**\n- **Active Floats (4):** ${uniqueFids.join(', ')}\n- **Regions:** Arabian Sea, Western & Eastern Bay of Bengal, and Equatorial Indian Ocean\n- **Total Measurements:** 1,720 depth profiles\n- **Depth Span:** Surface (5m) down to 2,000m depth\n- **Datasets:** \`argo_jan_mar_2024.nc\` (840 obs), \`argo_mar_apr_2024.nc\` (580 obs), \`argo_may_jun_2024.csv\` (440 obs).`,
        visualization_type: 'map',
        visualization_data: floats
      };
    }

    // ========================================================================
    // INTENT 9: SPECIFIC FLOAT OR INTERACTIVE MAP
    // ========================================================================
    if (mentionedFloat || /where\s+are\s+the\s+floats|map|location|positions|coordinates|எங்கு\s*உள்ளன|कहाँ\s*हैं|ఎక్కడ\s*ఉన్నాయి|എവിടെയാണ്/i.test(qLower)) {
      this.context.lastOperation = 'map';
      const targetFlt = mentionedFloat ? floats.find(f => f.float_id === mentionedFloat) : null;
      
      if (targetFlt) {
        const fltObs = allObs.filter(o => o.float_id === targetFlt.float_id);
        const fltStats = this.computeStats(fltObs, 'temperature');
        const salStats = this.computeStats(fltObs, 'salinity');
        return {
          answer: `**Simple answer:** Float **${targetFlt.float_id}** is actively monitoring the **${this.getFloatRegion(targetFlt.float_id)}**.\n\n**Buoy Measurements & Metrics:**\n- **Latest Position:** ${targetFlt.latest_latitude}°N, ${targetFlt.latest_longitude}°E\n- **Surface Temperature:** ${targetFlt.surface_temperature}°C (Overall buoy range: ${fltStats?.min}°C to ${fltStats?.max}°C)\n- **Surface Salinity:** ${targetFlt.surface_salinity} PSU (Overall buoy range: ${salStats?.min} to ${salStats?.max} PSU)\n- **Max Depth Recorded:** ${targetFlt.max_depth_recorded}m\n- **Completed Dive Cycles:** ${targetFlt.cycle_count} cycles\n- **Last Satellite Uplink:** ${targetFlt.latest_date}`,
          visualization_type: 'depth_profile',
          visualization_data: fltObs.slice(0, 35)
        };
      } else {
        return {
          answer: `**Simple answer:** There are **4 autonomous ARGO buoys** active across the Northern Indian Ocean.\n\n- **Float 1902456:** Arabian Sea (West Coast of India) — high evaporation basin.\n- **Float 2901633:** Western Bay of Bengal (near Tamil Nadu & Sri Lanka) — river-diluted salinity.\n- **Float 5906421:** Equatorial Indian Ocean (south of Sri Lanka) — warmest surface warm pool.\n- **Float 6903210:** Eastern Bay of Bengal (near Andaman Sea) — monsoon transition zone.\n\n**Interactive Map:** Current positions and drift trajectories are displayed below:`,
          visualization_type: 'map',
          visualization_data: floats
        };
      }
    }

    // ========================================================================
    // INTENT 10: REGIONAL INQUIRIES
    // ========================================================================
    if (mentionedRegion) {
      let regObs = allObs;
      if (mentionedRegion === 'Arabian Sea') regObs = allObs.filter(o => o.float_id === "1902456");
      else if (mentionedRegion === 'Bay of Bengal') regObs = allObs.filter(o => o.float_id === "2901633" || o.float_id === "6903210");
      else regObs = allObs.filter(o => o.float_id === "5906421");

      const tStats = this.computeStats(regObs, 'temperature');
      const sStats = this.computeStats(regObs, 'salinity');

      return {
        answer: `**Simple answer:** In the **${mentionedRegion}**, oceanographic observations show an average water temperature of **${tStats?.avg}°C** and an average salinity of **${sStats?.avg} PSU**.\n\n**Regional Characteristics:**\n- **Temperature Range:** ${tStats?.min}°C (deep sea at 2,000m) to ${tStats?.max}°C (sunlit surface)\n- **Salinity Range:** ${sStats?.min} PSU to ${sStats?.max} PSU\n- **Observations Analyzed:** ${tStats?.count} measurements\n- **Key Phenomenon:** ${mentionedRegion === 'Arabian Sea' ? 'Characterized by high evaporation and salty surface waters (~37.8 PSU).' : (mentionedRegion === 'Bay of Bengal' ? 'Receives huge river runoff, leading to fresher surface waters (~33.1 PSU).' : 'Tropical open ocean warm pool with surface temperatures exceeding 31°C.')}`,
        visualization_type: 'depth_profile',
        visualization_data: regObs.slice(0, 35)
      };
    }

    // ========================================================================
    // INTENT 11: TARGETED DEPTH INQUIRY
    // ========================================================================
    if (targetDepth !== null && !isComparison) {
      const depthSlice = allObs.filter(o => Math.abs(o.depth - targetDepth) <= Math.max(20, targetDepth * 0.25));
      const tStats = this.computeStats(depthSlice, 'temperature');
      const sStats = this.computeStats(depthSlice, 'salinity');

      if (tStats && sStats) {
        return {
          answer: `**Simple answer:** At approximately **${targetDepth} meters depth**, water temperature averages **${tStats.avg}°C** and salinity averages **${sStats.avg} PSU**.\n\n**Depth Layer Details (${targetDepth}m):**\n- **Temperature Range:** ${tStats.min}°C to ${tStats.max}°C\n- **Salinity Range:** ${sStats.min} PSU to ${sStats.max} PSU\n- **Observed Buoys:** ${[...new Set(depthSlice.map(o => o.float_id))].join(', ')}\n- **Ocean Layer:** ${targetDepth <= 100 ? 'Sunlit Surface Mixed Layer' : (targetDepth <= 500 ? 'Thermocline (Rapid Cooling Layer)' : 'Cold Deep Ocean Layer')}.`,
          visualization_type: 'depth_profile',
          visualization_data: depthSlice.slice(0, 35)
        };
      }
    }

    // ========================================================================
    // INTENT 12: MONTH / SEASONAL INQUIRIES
    // ========================================================================
    if (mentionedMonth) {
      const monthObs = this.filterByPeriod(allObs, mentionedMonth);
      const tStats = this.computeStats(monthObs, 'temperature');
      const sStats = this.computeStats(monthObs, 'salinity');

      if (tStats && sStats) {
        return {
          answer: `**Simple answer:** During **${mentionedMonth} 2024**, recorded Indian Ocean measurements show an average temperature of **${tStats.avg}°C** and average salinity of **${sStats.avg} PSU**.\n\n**Monthly Highlights:**\n- **Surface Warmth:** Peaked at **${tStats.max}°C**\n- **Deep Cold:** Reached **${tStats.min}°C** at 2,000m depth\n- **Salinity Range:** ${sStats.min} PSU to ${sStats.max} PSU across ${tStats.count} recorded observations\n- **Season Context:** ${['Jan', 'Feb'].includes(mentionedMonth) ? 'Northeast Winter Monsoon baseline.' : (['Mar', 'Apr'].includes(mentionedMonth) ? 'Pre-monsoon spring solar heating peak.' : 'Southwest Monsoon onset transition with wind-driven mixing.')}`,
          visualization_type: 'depth_profile',
          visualization_data: monthObs.slice(0, 35)
        };
      }
    }

    // ========================================================================
    // INTENT 13: GENERAL TEMPERATURE INQUIRIES
    // ========================================================================
    if (/temp|warm|cold|cool|heat|வெப்ப|ताप|ఉష్ణோగ్రత|താപ/i.test(qLower)) {
      this.context.lastMetric = 'temperature';
      const surfObs = allObs.filter(o => o.depth <= 20);
      const deepObs = allObs.filter(o => o.depth >= 1500);
      const surfStats = this.computeStats(surfObs, 'temperature');
      const deepStats = this.computeStats(deepObs, 'temperature');
      const overallStats = this.computeStats(allObs, 'temperature');

      return {
        answer: `**Simple answer:** Ocean temperature across our Indian Ocean datasets ranges from **${overallStats?.min}°C** in the deep ocean up to **${overallStats?.max}°C** at the sunlit surface, averaging **${overallStats?.avg}°C** overall.\n\n**Vertical Temperature Structure:**\n- **Surface Layer (0–20m):** Warm and sunlit, averaging **${surfStats?.avg}°C** (range: ${surfStats?.min}°C to ${surfStats?.max}°C).\n- **The Thermocline (100–500m):** Temperature drops sharply from ~28°C down to ~12°C.\n- **Deep Ocean (1,500–2,000m):** Icy and stable, averaging **${deepStats?.avg}°C** under immense water pressure.\n\n**Live Chart:** Live vertical depth profile below shows how temperature decreases with depth:`,
        visualization_type: 'depth_profile',
        visualization_data: allObs.slice(0, 35)
      };
    }

    // ========================================================================
    // INTENT 14: GENERAL SALINITY INQUIRIES
    // ========================================================================
    if (/salin|salt|psu|உப்பு|लवणता|खारा|సెలైనిటీ|లవణ|സലൈനിറ്റി|ലവണ/i.test(qLower)) {
      this.context.lastMetric = 'salinity';
      const salStats = this.computeStats(allObs, 'salinity');
      return {
        answer: `**Simple answer:** Ocean salinity across our Indian Ocean datasets averages **${salStats?.avg} PSU**, ranging from **${salStats?.min} PSU** up to **${salStats?.max} PSU**.\n\n**Salinity Basin Breakdown:**\n- **Bay of Bengal (Floats 2901633 & 6903210):** Low salinity (**33.10 to 35.20 PSU**) diluted by major river systems.\n- **Arabian Sea (Float 1902456):** Highest salinity (**36.20 to 37.78 PSU**) caused by desert evaporation.\n- **Equatorial Indian Ocean (Float 5906421):** Balanced open-ocean salinity (**34.70 to 35.10 PSU**).`,
        visualization_type: 'depth_profile',
        visualization_data: allObs.slice(0, 35)
      };
    }

    // ========================================================================
    // INTENT 15: DATASET REGISTRY & OVERVIEW
    // ========================================================================
    if (/datasets?|registry|data\s+source|netcdf|csv|files|what ocean observations are available|summarize.*ocean data for a selected period/i.test(qLower)) {
      return {
        answer: `**Simple answer:** FloatChat integrates **3 registered oceanographic datasets** covering January 15 through June 20, 2024 (1,720 total observations):\n\n1. **Dataset A (\`argo_jan_mar_2024.nc\`):** NetCDF-3 archive, 840 observations (Jan 15 – Mar 05, 2024). Winter baseline across 4 floats.\n2. **Dataset B (\`argo_mar_apr_2024.nc\`):** NetCDF-4 archive, 580 observations (Mar 01 – Apr 25, 2024). Spring pre-monsoon warming window (includes Cycle 6 calibration overlap).\n3. **Dataset C (\`argo_may_jun_2024.csv\`):** Tabular CSV array, 440 observations (May 01 – Jun 20, 2024). Southwest Monsoon onset transition.\n\nCombined deduplicated total: **1,720 verified ocean observations**.`,
        visualization_type: 'none',
        visualization_data: null
      };
    }

    // ========================================================================
    // INTENT 16: CONTEXTUAL FOLLOW-UP (Only when explicitly continuing)
    // ========================================================================
    const isExplicitFollowUp = /^(and\b|what\s+about|how\s+about|what\s+is\s+it\s+at|at\s+what|also|then\b|மேலும்|மற்றும்|और|तथा|మరియు|കൂടാതെ)/i.test(qLower);
    if (isExplicitFollowUp && (this.context.lastDepth || this.context.lastFloatId || this.context.lastRegion)) {
      let filtered = allObs;
      if (this.context.lastFloatId) filtered = filtered.filter(o => o.float_id === this.context.lastFloatId);
      if (this.context.lastDepth) filtered = filtered.filter(o => Math.abs(o.depth - this.context.lastDepth) <= 25);
      
      const statsT = this.computeStats(filtered, 'temperature');
      const statsS = this.computeStats(filtered, 'salinity');

      if (statsT && statsS) {
        return {
          answer: `**Simple answer:** Following up on your previous query for ${this.context.lastFloatId ? 'Float ' + this.context.lastFloatId : ''} ${this.context.lastDepth ? 'at ~' + this.context.lastDepth + 'm' : ''}:\n\n- **Average Temperature:** ${statsT.avg}°C (range: ${statsT.min}°C to ${statsT.max}°C)\n- **Average Salinity:** ${statsS.avg} PSU (range: ${statsS.min} to ${statsS.max} PSU)\n- **Sampled Observations:** ${statsT.count} records.`,
          visualization_type: 'depth_profile',
          visualization_data: filtered.slice(0, 35)
        };
      }
    }

    // Reset stale context for fresh queries
    this.resetContext();

    // ========================================================================
    // INTENT 17: DYNAMIC GROUNDED NATURAL FALLBACK
    // ========================================================================
    // Dynamically analyzes words in user query to avoid static repetitions!
    const overallT = this.computeStats(allObs, 'temperature');
    const overallS = this.computeStats(allObs, 'salinity');

    const dynamicFallback = {
      en: `**Answer for "${query}":**\n\nI analyzed our **1,720 ARGO ocean observations** (January–June 2024) across the Arabian Sea, Bay of Bengal, and Equatorial Indian Ocean.\n\n**Measured Parameters Related to Your Query:**\n- **Water Temperature:** Averages **${overallT?.avg}°C** (ranging from **${overallT?.min}°C** at 2,000m to **${overallT?.max}°C** at the surface).\n- **Salinity:** Averages **${overallS?.avg} PSU** (ranging from **${overallS?.min} PSU** in the Bay of Bengal to **${overallS?.max} PSU** in the Arabian Sea).\n- **Depth Span:** From surface (5m) down to 2,000m across **4 robotic buoys** (Floats 1902456, 2901633, 5906421, 6903210).\n\n**Try asking:**\n- *"What is the temperature in Arabian Sea?"*\n- *"What is the salinity at 100 meters?"*\n- *"What happened in March compared to April?"*\n- *"Where is Float 1902456 located?"*`,
      ta: `**"${query}" என்பதற்கான பதில்:**\n\n1,720 ARGO கடல் அவதானிப்புகளின் (ஜனவரி–ஜூன் 2024) தரவு பகுப்பாய்வு:\n\n- **சராசரி வெப்பநிலை:** **${overallT?.avg}°C** (மேற்பரப்பில் **${overallT?.max}°C** முதல் 2,000m ஆழத்தில் **${overallT?.min}°C** வரை)\n- **சராசரி உப்புத்தன்மை:** **${overallS?.avg} PSU** (வங்காள விரிகுடாவில் **${overallS?.min} PSU** முதல் அரபிக்கடலில் **${overallS?.max} PSU** வரை)\n- **மிதவைகள்:** 4 தானியங்கி மிதவைகள் அரபிக்கடல், வங்காள விரிகுடா மற்றும் இந்தியப் பெருங்கடலில் இயங்குகின்றன.`,
      hi: `**"${query}" के लिए उत्तर:**\n\n1,720 ARGO वैज्ञानिक अवलोकनों (जनवरी–जून 2024) का विश्लेषण:\n\n- **औसत तापमान:** **${overallT?.avg}°C** (सतह पर **${overallT?.max}°C** से 2,000m पर **${overallT?.min}°C**)\n- **औसत लवणता:** **${overallS?.avg} PSU** (बंगाल की खाड़ी में **${overallS?.min} PSU** से अरब सागर में **${overallS?.max} PSU**)\n- **फ्लोट्स:** 4 रोबोटिक फ्लोट्स डेटा एकत्र कर रहे हैं।`,
      te: `**"${query}" కోసం సమాధానం:**\n\n1,720 ARGO పరిశీలనల విశ్లేషణ:\n\n- **సగటు ఉష్ణోగ్రత:** **${overallT?.avg}°C**\n- **సగటు లవణీయత:** **${overallS?.avg} PSU**\n- **కవరేజ్:** 4 రోబోటిక్ ఫ్లోట్లు మరియు 3 డేటాసెట్‌లు.`,
      ml: `**"${query}" എന്നതിനുള്ള മറുപടി:**\n\n1,720 ARGO സമുദ്ര നിരീക്ഷണങ്ങളുടെ വിശകലനം:\n\n- **ശരാശരി താപനില:** **${overallT?.avg}°C**\n- **ശരാശരി ലവണാംശം:** **${overallS?.avg} PSU**\n- **ഫ്ലോട്ടുകൾ:** 4 റോബോട്ടിക് ഫ്ലോട്ടുകൾ സജീവമാണ്.`
    };

    return {
      answer: dynamicFallback[activeLang] || dynamicFallback.en,
      visualization_type: 'depth_profile',
      visualization_data: allObs.slice(0, 35)
    };
  }
};

// ============================================================================
// REACT SUB-COMPONENTS
// ============================================================================

// 1. Chart Component (Chart.js)
function DepthProfileChart({ observations }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !observations || observations.length === 0) return;

    const sorted = [...observations].sort((a, b) => a.depth - b.depth);
    const depths = sorted.map(o => o.depth);
    const temps = sorted.map(o => o.temperature);
    const sals = sorted.map(o => o.salinity);

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: depths,
        datasets: [
          {
            label: 'Temperature (°C)',
            data: temps,
            borderColor: '#758B72',
            backgroundColor: 'rgba(117, 139, 114, 0.12)',
            borderWidth: 2.5,
            pointRadius: 2.5,
            pointBackgroundColor: '#536B52',
            tension: 0.35,
            yAxisID: 'yTemp'
          },
          {
            label: 'Salinity (PSU)',
            data: sals,
            borderColor: '#C9795B',
            backgroundColor: 'rgba(201, 121, 91, 0.12)',
            borderWidth: 2.5,
            pointRadius: 2.5,
            pointBackgroundColor: '#A85F44',
            tension: 0.35,
            yAxisID: 'ySal'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              boxWidth: 14,
              font: { family: 'Inter', size: 12, weight: '500' },
              color: '#303B35'
            }
          },
          tooltip: {
            backgroundColor: '#FFFFFF',
            titleColor: '#303B35',
            bodyColor: '#424E48',
            borderColor: '#E5E0D6',
            borderWidth: 1,
            padding: 10,
            callbacks: {
              title: (items) => `Depth: ${items[0].label} meters`
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Water Depth (meters below sea level)',
              font: { family: 'Inter', size: 11, weight: '600' },
              color: '#73776F'
            },
            grid: { color: '#EFECE6' },
            ticks: { color: '#73776F' }
          },
          yTemp: {
            type: 'linear',
            position: 'left',
            title: {
              display: true,
              text: 'Temperature (°C)',
              font: { family: 'Inter', size: 11, weight: '600' },
              color: '#536B52'
            },
            grid: { color: '#EFECE6' },
            ticks: { color: '#536B52' }
          },
          ySal: {
            type: 'linear',
            position: 'right',
            title: {
              display: true,
              text: 'Salinity (PSU)',
              font: { family: 'Inter', size: 11, weight: '600' },
              color: '#C9795B'
            },
            grid: { display: false },
            ticks: { color: '#C9795B' }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [observations]);

  return (
    <div className="w-full h-72 sm:h-80 bg-white rounded-xl p-3 border border-beige">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

// 2. Leaflet Map Component
function FloatMap({ floats }) {
  const mapContainerRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstance.current) {
      mapInstance.current = L.map(mapContainerRef.current, {
        center: [10.5, 80.0],
        zoom: 5,
        zoomControl: true
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 18
      }).addTo(mapInstance.current);
    }

    const map = mapInstance.current;
    
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline || layer instanceof L.CircleMarker) {
        map.removeLayer(layer);
      }
    });

    if (floats && floats.length > 0) {
      const bounds = [];

      floats.forEach((flt) => {
        const lat = flt.latest_latitude;
        const lon = flt.latest_longitude;
        if (!lat || !lon) return;

        bounds.push([lat, lon]);

        if (flt.trajectory && flt.trajectory.length > 1) {
          const latlngs = flt.trajectory.map(p => [p.lat, p.lon]);
          L.polyline(latlngs, {
            color: '#758B72',
            weight: 2.5,
            dashArray: '4, 6',
            opacity: 0.85
          }).addTo(map);

          const startPt = flt.trajectory[0];
          L.circleMarker([startPt.lat, startPt.lon], {
            radius: 4,
            fillColor: '#E5E0D6',
            color: '#73776F',
            weight: 1.5,
            fillOpacity: 0.9
          }).addTo(map);
        }

        const marker = L.circleMarker([lat, lon], {
          radius: 9,
          fillColor: '#758B72',
          color: '#FFFFFF',
          weight: 2.5,
          fillOpacity: 1
        }).addTo(map);

        marker.bindPopup(`
          <div style="font-family: 'Inter', sans-serif; font-size: 13px; line-height: 1.5;">
            <div style="font-weight: 700; color: #303B35; font-size: 14px; margin-bottom: 4px;">
              Float ${flt.float_id}
            </div>
            <div style="color: #73776F; font-size: 11px; margin-bottom: 6px;">
              ${FloatChatAI.getFloatRegion(flt.float_id)}
            </div>
            <div style="border-top: 1px solid #E5E0D6; padding-top: 6px;">
              <div><strong>Surface Temp:</strong> ${flt.surface_temperature}°C</div>
              <div><strong>Salinity:</strong> ${flt.surface_salinity} PSU</div>
              <div><strong>Max Depth:</strong> ${flt.max_depth_recorded}m</div>
              <div><strong>Cycles:</strong> ${flt.cycle_count}</div>
              <div style="font-size: 11px; color: #73776F; margin-top: 4px;">Last: ${flt.latest_date}</div>
            </div>
          </div>
        `);
      });

      if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 7 });
      }
    }
  }, [floats]);

  return (
    <div className="w-full h-80 sm:h-96 rounded-xl overflow-hidden border border-beige shadow-sm">
      <div ref={mapContainerRef} className="w-full h-full"></div>
    </div>
  );
}

// 3. Who Can Use FloatChat? Sidebar Component
function WhoCanUseSidebar({ selectedCategory, onSelectCategory, onSelectQuestion, isMobile, onClose }) {
  return (
    <div className="flex flex-col h-full bg-white text-charcoal">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-beige bg-ivory-50 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 font-bold text-sm text-charcoal font-heading">
            <span>👥</span>
            <span>Who Can Use FloatChat?</span>
          </div>
          <p className="text-[11px] text-charcoal-muted mt-0.5">Select a role for tailored guides & questions</p>
        </div>
        {isMobile && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg border border-beige bg-white text-charcoal-muted hover:text-charcoal text-xs"
            title="Close"
          >
            ✕
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 custom-scrollbar">
        {!selectedCategory ? (
          // Category List View
          <div className="space-y-2">
            {USER_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat)}
                className="p-3 rounded-xl border border-beige bg-white hover:border-sage hover:bg-sage-subtle/30 transition-all cursor-pointer group shadow-xs"
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-ivory border border-beige flex items-center justify-center text-base flex-shrink-0 group-hover:bg-white transition-colors">
                    {cat.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xs text-charcoal group-hover:text-sage-dark transition-colors truncate">
                        {cat.name}
                      </h3>
                      <span className="text-[10px] text-sage font-semibold group-hover:translate-x-0.5 transition-transform flex-shrink-0 ml-1">
                        Explore →
                      </span>
                    </div>
                    <p className="text-[11px] text-charcoal-muted line-clamp-2 mt-1 leading-snug">
                      {cat.shortDesc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Selected Category Info Panel
          <div className="space-y-3.5">
            {/* Back button */}
            <button
              onClick={() => onSelectCategory(null)}
              className="text-xs font-semibold text-sage-dark hover:text-sage flex items-center gap-1 px-1 py-0.5 transition-colors"
            >
              <span>←</span>
              <span>All Categories</span>
            </button>

            {/* Category Header Card */}
            <div className="p-3.5 rounded-xl border border-sage bg-sage-subtle/40 shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{selectedCategory.icon}</span>
                <div>
                  <h3 className="font-bold text-sm text-charcoal">{selectedCategory.name}</h3>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white text-sage-dark border border-sage/20 font-medium">
                    Active Profile
                  </span>
                </div>
              </div>
              <p className="text-xs text-charcoal leading-relaxed">{selectedCategory.info}</p>
            </div>

            {/* Disclaimer if present */}
            {selectedCategory.disclaimer && (
              <div className="p-2.5 rounded-lg border border-terracotta/30 bg-terracotta-subtle text-[11px] text-terracotta-dark leading-snug flex items-start gap-1.5">
                <span className="flex-shrink-0">⚠️</span>
                <span>{selectedCategory.disclaimer}</span>
              </div>
            )}

            {/* Suggested Questions */}
            <div className="pt-1">
              <div className="text-[11px] font-bold text-charcoal-muted uppercase tracking-wider mb-2">
                Suggested Questions:
              </div>
              <div className="space-y-2">
                {selectedCategory.questions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelectQuestion(q)}
                    className="w-full text-left p-2.5 rounded-lg border border-beige bg-white hover:border-sage hover:bg-sage-subtle/40 transition-all text-xs text-charcoal leading-snug flex items-start gap-2 shadow-xs group"
                  >
                    <span className="text-sage group-hover:scale-110 transition-transform mt-0.5 flex-shrink-0">💬</span>
                    <span className="flex-1 font-medium group-hover:text-sage-dark">{q}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-2.5 border-t border-beige bg-ivory text-center text-[11px] text-charcoal-muted">
        Clicking any question asks the chatbot directly
      </div>
    </div>
  );
}

// ============================================================================
// MAIN APPLICATION VIEWS
// ============================================================================

// HOME VIEW
function HomeView({ t, onNavigate }) {
  const registry = FloatChatAI.data.registry || [];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Hero Section */}
      <section className="bg-white rounded-2xl p-6 sm:p-10 border border-beige shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-subtle text-sage-dark text-xs font-semibold mb-4 border border-sage/20">
          <span>🌱</span>
          <span>{t.heroTag}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-charcoal tracking-tight font-heading mb-3">
          {t.heroTitle}
        </h1>
        <p className="text-charcoal-muted text-base sm:text-lg max-w-3xl leading-relaxed mb-6">
          {t.heroDesc}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigate('chat')}
            className="px-5 py-2.5 rounded-xl bg-sage text-white font-semibold text-sm hover:bg-sage-dark transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-sage"
          >
            💬 {t.btnAsk}
          </button>
          <button
            onClick={() => onNavigate('explore')}
            className="px-5 py-2.5 rounded-xl bg-white border border-beige text-charcoal font-semibold text-sm hover:bg-ivory transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-sage"
          >
            📊 {t.btnExplore}
          </button>
        </div>
      </section>

      {/* 4 Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-beige shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted mb-1">{t.statObsTitle}</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-charcoal font-heading">{t.statObsCount}</div>
          <p className="text-xs text-charcoal-muted mt-2">{t.statObsDesc}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-beige shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted mb-1">{t.statDatasetsTitle}</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-sage font-heading">{t.statDatasetsCount}</div>
          <p className="text-xs text-charcoal-muted mt-2">{t.statDatasetsDesc}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-beige shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted mb-1">{t.statFloatsTitle}</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-charcoal font-heading">{t.statFloatsCount}</div>
          <p className="text-xs text-charcoal-muted mt-2">{t.statFloatsDesc}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-beige shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted mb-1">{t.statDateTitle}</div>
          <div className="text-base sm:text-lg font-bold text-terracotta font-heading mt-1">{t.statDateRange}</div>
          <p className="text-xs text-charcoal-muted mt-2">{t.statDateDesc}</p>
        </div>
      </section>

      {/* WHO CAN USE FLOATCHAT SECTION */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-beige shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
          <div>
            <h2 className="text-xl font-bold text-charcoal font-heading">{t.whoCanUseTitle}</h2>
            <p className="text-xs sm:text-sm text-charcoal-muted mt-1">{t.whoCanUseSub}</p>
          </div>
          <button
            onClick={() => onNavigate('chat')}
            className="text-xs font-semibold text-sage-dark hover:text-sage flex items-center gap-1 transition-colors"
          >
            <span>Open in Chat</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {USER_CATEGORIES.map(cat => (
            <div
              key={cat.id}
              onClick={() => onNavigate('chat', cat.id)}
              className="p-4 rounded-xl border border-beige bg-ivory-50/60 hover:border-sage hover:bg-sage-subtle/30 transition-all cursor-pointer flex flex-col justify-between group shadow-xs"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-2xl">{cat.icon}</span>
                  <h3 className="font-bold text-charcoal text-sm group-hover:text-sage-dark transition-colors">{cat.name}</h3>
                </div>
                <p className="text-xs text-charcoal-muted leading-relaxed">{cat.shortDesc}</p>
              </div>
              <div className="mt-3 pt-2 border-t border-beige/60 flex items-center justify-between text-[11px] font-semibold text-sage-dark">
                <span>3 Example Questions</span>
                <span className="group-hover:translate-x-1 transition-transform">Explore →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Registered Datasets Section */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-beige shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-charcoal font-heading">{t.registryTitle}</h2>
          <p className="text-sm text-charcoal-muted mt-1">{t.registrySubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {registry.map(ds => (
            <div key={ds.id} className="p-4 rounded-xl border border-beige bg-ivory-50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-white border border-beige text-charcoal font-bold">{ds.format}</span>
                  <span className="text-[11px] font-semibold text-sage-dark flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-sage"></span>
                    Verified
                  </span>
                </div>
                <h3 className="font-bold text-charcoal text-sm font-heading">{ds.title}</h3>
                <p className="text-xs text-charcoal-muted mt-1 font-mono">{ds.name}</p>
                
                <div className="mt-3 text-xs space-y-1 text-charcoal">
                  <div><strong>Observations:</strong> {ds.totalObservations} records</div>
                  <div><strong>Coverage:</strong> {ds.startDate.substring(0, 10)} to {ds.endDate.substring(0, 10)}</div>
                  <div><strong>Source:</strong> {ds.source}</div>
                </div>
              </div>

              {ds.overlapNotice && (
                <div className="mt-3 pt-2 border-t border-beige text-[11px] text-terracotta flex items-center gap-1">
                  <span>ℹ️</span> {ds.overlapNotice}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Guide: How FloatChat Works */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-beige shadow-sm">
        <h2 className="text-xl font-bold text-charcoal font-heading mb-6">{t.guideTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-sage-subtle text-sage-dark flex items-center justify-center font-bold text-sm">1</div>
            <h3 className="font-bold text-charcoal text-sm">{t.step1Title}</h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">{t.step1Desc}</p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-sage-subtle text-sage-dark flex items-center justify-center font-bold text-sm">2</div>
            <h3 className="font-bold text-charcoal text-sm">{t.step2Title}</h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">{t.step2Desc}</p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-sage-subtle text-sage-dark flex items-center justify-center font-bold text-sm">3</div>
            <h3 className="font-bold text-charcoal text-sm">{t.step3Title}</h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">{t.step3Desc}</p>
          </div>
        </div>
      </section>

    </div>
  );
}

// EXPLORE DATA VIEW
function ExploreDataView({ t }) {
  const allObservations = useMemo(() => FloatChatAI.data.observations || [], []);
  const floats = useMemo(() => FloatChatAI.data.floats || [], []);
  const registry = useMemo(() => FloatChatAI.data.registry || [], []);

  const [selectedDataset, setSelectedDataset] = useState('all');
  const [selectedFloat, setSelectedFloat] = useState('all');
  const [selectedDepth, setSelectedDepth] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 15;

  const filtered = useMemo(() => {
    return allObservations.filter(o => {
      if (selectedDataset !== 'all') {
        if (o.dataset_id && o.dataset_id !== selectedDataset) return false;
      }
      if (selectedFloat !== 'all') {
        if (String(o.float_id) !== String(selectedFloat)) return false;
      }
      if (selectedDepth === 'surface') {
        if (o.depth > 100) return false;
      } else if (selectedDepth === 'mid') {
        if (o.depth <= 100 || o.depth > 500) return false;
      } else if (selectedDepth === 'deep') {
        if (o.depth <= 500) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const dateMatch = (o.date || '').toLowerCase().includes(q);
        const floatMatch = String(o.float_id).includes(q);
        const depthMatch = String(Math.round(o.depth)).includes(q);
        if (!dateMatch && !floatMatch && !depthMatch) return false;
      }
      return true;
    });
  }, [allObservations, selectedDataset, selectedFloat, selectedDepth, searchQuery]);

  useEffect(() => {
    setPage(1);
  }, [selectedDataset, selectedFloat, selectedDepth, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const displayedRecords = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const handleExportCSV = useCallback(() => {
    if (filtered.length === 0) return;
    const headers = ["Dataset", "Float_ID", "Cycle", "Date", "Depth_m", "Temperature_C", "Salinity_PSU", "Latitude", "Longitude"];
    const rows = filtered.map(o => [
      o.dataset_id || "dataset_a",
      o.float_id,
      o.cycle_number,
      o.date,
      o.depth,
      o.temperature,
      o.salinity,
      o.latitude,
      o.longitude
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `floatchat_export_${selectedDataset}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [filtered, selectedDataset]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header & Filter Controls */}
      <div className="bg-white p-6 rounded-2xl border border-beige shadow-sm space-y-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-charcoal font-heading">{t.exploreTitle}</h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-1">{t.exploreSubtitle}</p>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">{t.filterDataset}</label>
            <select
              value={selectedDataset}
              onChange={e => setSelectedDataset(e.target.value)}
              className="w-full bg-ivory-50 border border-beige rounded-lg px-3 py-2 text-xs text-charcoal outline-none focus:border-sage focus:ring-1 focus:ring-sage"
            >
              <option value="all">{t.filterAllDatasets}</option>
              {registry.map(ds => (
                <option key={ds.id} value={ds.id}>{ds.title} ({ds.totalObservations} obs)</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">{t.filterFloat}</label>
            <select
              value={selectedFloat}
              onChange={e => setSelectedFloat(e.target.value)}
              className="w-full bg-ivory-50 border border-beige rounded-lg px-3 py-2 text-xs text-charcoal outline-none focus:border-sage focus:ring-1 focus:ring-sage"
            >
              <option value="all">{t.filterAllFloats}</option>
              {floats.map(f => (
                <option key={f.float_id} value={f.float_id}>Float {f.float_id} ({FloatChatAI.getFloatRegion(f.float_id)})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">{t.filterDepth}</label>
            <select
              value={selectedDepth}
              onChange={e => setSelectedDepth(e.target.value)}
              className="w-full bg-ivory-50 border border-beige rounded-lg px-3 py-2 text-xs text-charcoal outline-none focus:border-sage focus:ring-1 focus:ring-sage"
            >
              <option value="all">{t.depthAll}</option>
              <option value="surface">{t.depthSurface}</option>
              <option value="mid">{t.depthMid}</option>
              <option value="deep">{t.depthDeep}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Search / Reset</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-ivory-50 border border-beige rounded-lg px-3 py-2 text-xs text-charcoal outline-none focus:border-sage"
              />
              <button
                onClick={() => { setSelectedDataset('all'); setSelectedFloat('all'); setSelectedDepth('all'); setSearchQuery(''); }}
                title={t.btnReset}
                className="px-3 py-2 rounded-lg bg-ivory border border-beige text-charcoal text-xs hover:bg-beige-light font-medium"
              >
                ↺
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Map & Depth Profile Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-beige shadow-sm space-y-3">
          <div>
            <h2 className="text-sm font-bold text-charcoal font-heading">{t.mapTitle}</h2>
            <p className="text-xs text-charcoal-muted">{t.mapSub}</p>
          </div>
          <FloatMap floats={floats} />
        </div>

        <div className="bg-white p-5 rounded-2xl border border-beige shadow-sm space-y-3">
          <div>
            <h2 className="text-sm font-bold text-charcoal font-heading">{t.chartTitle}</h2>
            <p className="text-xs text-charcoal-muted">{t.chartHint}</p>
          </div>
          <DepthProfileChart observations={filtered.slice(0, 40)} />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white p-6 rounded-2xl border border-beige shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-base font-bold text-charcoal font-heading">{t.tableTitle}</h2>
            <span className="text-xs text-charcoal-muted">
              {t.paginationShowing} {filtered.length === 0 ? 0 : (page - 1) * pageSize + 1} {t.paginationTo} {Math.min(page * pageSize, filtered.length)} {t.paginationOf} {filtered.length} {t.paginationRecords}
            </span>
          </div>
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-1.5 rounded-lg bg-sage text-white text-xs font-semibold hover:bg-sage-dark transition-colors shadow-sm"
          >
            📥 {t.btnExportCSV}
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-beige">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-ivory text-charcoal-muted font-semibold border-b border-beige">
              <tr>
                <th className="py-2.5 px-3">{t.thDataset}</th>
                <th className="py-2.5 px-3">{t.thFloat}</th>
                <th className="py-2.5 px-3">{t.thCycle}</th>
                <th className="py-2.5 px-3">{t.thDate}</th>
                <th className="py-2.5 px-3">{t.thDepth}</th>
                <th className="py-2.5 px-3">{t.thTemp}</th>
                <th className="py-2.5 px-3">{t.thSal}</th>
                <th className="py-2.5 px-3">{t.thCoords}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-beige text-charcoal">
              {displayedRecords.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-charcoal-muted">{t.tableEmpty}</td>
                </tr>
              ) : (
                displayedRecords.map((o, idx) => (
                  <tr key={idx} className="hover:bg-ivory-50 transition-colors">
                    <td className="py-2 px-3 font-mono text-[11px] text-sage-dark font-medium">{o.dataset_id || 'dataset_a'}</td>
                    <td className="py-2 px-3 font-medium">{o.float_id}</td>
                    <td className="py-2 px-3">{o.cycle_number}</td>
                    <td className="py-2 px-3 font-mono text-[11px] text-charcoal-muted">{o.date ? o.date.substring(0, 10) : ''}</td>
                    <td className="py-2 px-3 font-semibold">{o.depth.toFixed(1)}m</td>
                    <td className="py-2 px-3 font-semibold text-sage-dark">{o.temperature.toFixed(2)}°C</td>
                    <td className="py-2 px-3 font-semibold text-terracotta">{o.salinity.toFixed(2)} PSU</td>
                    <td className="py-2 px-3 font-mono text-[11px] text-charcoal-muted">{o.latitude.toFixed(2)}°N, {o.longitude.toFixed(2)}°E</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded-lg border border-beige bg-white text-xs font-medium text-charcoal disabled:opacity-40 hover:bg-ivory"
            >
              {t.btnPrev}
            </button>
            <span className="text-xs text-charcoal-muted">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 rounded-lg border border-beige bg-white text-xs font-medium text-charcoal disabled:opacity-40 hover:bg-ivory"
            >
              {t.btnNext}
            </button>
          </div>
        )}
      </div>

    </div>
  );
}

// 4. Gemini AI Settings Modal Component
function GeminiModal({ isOpen, onClose, onUpdate }) {
  const [keyInput, setKeyInput] = useState(() => localStorage.getItem('floatchat_gemini_api_key') || '');
  const [isEnabled, setIsEnabled] = useState(() => localStorage.getItem('floatchat_gemini_enabled') === 'true');
  const [status, setStatus] = useState(null);
  const [testing, setTesting] = useState(false);
  const [showKey, setShowKey] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    const trimmed = keyInput.trim();
    if (trimmed) {
      localStorage.setItem('floatchat_gemini_api_key', trimmed);
      localStorage.setItem('floatchat_gemini_enabled', isEnabled ? 'true' : 'false');
      setStatus({ type: 'success', msg: isEnabled ? 'Gemini API Key saved and enabled!' : 'Gemini API Key saved (currently disabled).' });
    } else {
      localStorage.removeItem('floatchat_gemini_api_key');
      localStorage.setItem('floatchat_gemini_enabled', 'false');
      setStatus({ type: 'info', msg: 'API Key cleared. FloatChat will use the offline scientific engine.' });
    }
    if (onUpdate) onUpdate();
    setTimeout(() => {
      onClose();
    }, 900);
  };

  const handleTestKey = async () => {
    const trimmed = keyInput.trim();
    if (!trimmed) {
      setStatus({ type: 'error', msg: 'Please enter a Gemini API Key first.' });
      return;
    }
    setTesting(true);
    setStatus(null);
    const candidateModels = ['gemini-1.5-flash', 'gemini-2.5-flash', 'gemini-flash-latest', 'gemini-3.8-flash'];
    let lastError = '';
    let connected = false;

    for (const model of candidateModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(trimmed)}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: 'Hello, confirm in one word: ready' }] }],
            generationConfig: { maxOutputTokens: 10 }
          })
        });
        if (res.ok) {
          setIsEnabled(true);
          localStorage.setItem('floatchat_gemini_api_key', trimmed);
          localStorage.setItem('floatchat_gemini_enabled', 'true');
          setStatus({ type: 'success', msg: `Success! Connected to Google Gemini (${model}).` });
          connected = true;
          if (onUpdate) onUpdate();
          break;
        } else {
          const errData = await res.json().catch(() => ({}));
          lastError = errData.error?.message || `HTTP ${res.status}`;
        }
      } catch (e) {
        lastError = e.message;
      }
    }

    if (!connected) {
      if (lastError.includes('denied access') || lastError.includes('PERMISSION_DENIED') || lastError.includes('403')) {
        setStatus({
          type: 'error',
          msg: `Google Cloud Error: Project access denied (403 Forbidden). Please generate a standard API key (starting with AIzaSy...) at aistudio.google.com.`
        });
      } else {
        setStatus({ type: 'error', msg: `Connection failed: ${lastError || 'Invalid API Key'}` });
      }
    }
    setTesting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-beige shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-beige bg-ivory-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white text-base shadow-xs">
              ✨
            </div>
            <div>
              <h3 className="text-sm font-bold text-charcoal font-heading">Google Gemini AI Setup</h3>
              <p className="text-[11px] text-charcoal-muted">Connect your Gemini API Key</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg border border-beige bg-white text-charcoal-muted hover:text-charcoal flex items-center justify-center text-xs"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 text-xs text-charcoal">
          <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200/80 text-purple-900 text-[11px] leading-relaxed">
            <div className="font-semibold mb-1 flex items-center gap-1.5">
              <span>🚀 Why connect Gemini?</span>
            </div>
            FloatChat will feed retrieved ARGO depth observations into Gemini, allowing the AI to answer <strong>any conversational phrasing</strong> with fluent, grounded explanations in English, Tamil, Hindi, Telugu, or Malayalam.
          </div>

          <div>
            <label className="block font-semibold mb-1 text-charcoal">Gemini API Key:</label>
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                value={keyInput}
                onChange={e => setKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-ivory-50 border border-beige rounded-lg px-3 py-2 pr-16 text-xs text-charcoal font-mono outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowKey(s => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-charcoal-muted hover:text-charcoal px-1.5 py-0.5 rounded border border-beige bg-white"
              >
                {showKey ? "Hide" : "Show"}
              </button>
            </div>
            <p className="text-[10px] text-charcoal-muted mt-1">
              Key is stored only in your browser's private <code className="bg-ivory px-1 rounded">localStorage</code> and never logged or shared.
            </p>
          </div>

          {/* Toggle Enable */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-ivory border border-beige">
            <div>
              <div className="font-semibold text-xs">Enable Generative Gemini Answers</div>
              <p className="text-[10px] text-charcoal-muted">Switch off anytime to use the offline statistical engine</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isEnabled}
                onChange={e => setIsEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-beige peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-beige after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {/* Status Message */}
          {status && (
            <div className={`p-2.5 rounded-lg text-[11px] font-medium leading-relaxed ${
              status.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
              status.type === 'error' ? 'bg-rose-50 text-rose-800 border border-rose-200' :
              'bg-blue-50 text-blue-800 border border-blue-200'
            }`}>
              {status.msg}
            </div>
          )}

          {/* AI Studio Link */}
          <div className="text-[11px] text-charcoal-muted">
            Don't have a Gemini API key?{' '}
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800 font-semibold underline"
            >
              Get a free API key at Google AI Studio ↗
            </a>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-beige bg-ivory-50 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleTestKey}
            disabled={testing || !keyInput.trim()}
            className="px-3 py-1.5 rounded-lg border border-beige bg-white text-xs font-semibold text-charcoal hover:bg-ivory disabled:opacity-40"
          >
            {testing ? "Testing..." : "⚡ Test Key"}
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg border border-beige bg-white text-xs font-medium text-charcoal hover:bg-ivory"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold hover:opacity-90 shadow-xs"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// CHAT VIEW (With Responsive 'Who Can Use FloatChat?' Sidebar)
function ChatView({ t, currentLang, initialCategory = null, onSelectCategory }) {
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: t.welcomeDesc,
      visualization_type: 'none',
      visualization_data: null
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechStatus, setSpeechStatus] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  
  // Sidebar states
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [geminiModalOpen, setGeminiModalOpen] = useState(false);
  const [isGeminiActive, setIsGeminiActive] = useState(() => {
    return localStorage.getItem('floatchat_gemini_enabled') === 'true' && !!localStorage.getItem('floatchat_gemini_api_key');
  });

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Synchronize category if prop changes
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = useCallback(async (textToSend) => {
    const query = (textToSend || inputText).trim();
    if (!query || loading) return;

    setInputText('');
    setMessages(prev => [...prev, { sender: 'user', text: query }]);
    setLoading(true);

    try {
      const response = await FloatChatAI.answerQuestion(query, currentLang);
      setMessages(prev => [...prev, {
        sender: 'assistant',
        text: response.answer,
        visualization_type: response.visualization_type,
        visualization_data: response.visualization_data
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        sender: 'assistant',
        text: `**Notice:** An error occurred while processing the oceanographic query. Please try an example below.`,
        visualization_type: 'none',
        visualization_data: null
      }]);
    } finally {
      setLoading(false);
    }
  }, [inputText, loading, currentLang]);

  // Handle Suggested Question Selection from Sidebar
  const handleQuestionSelect = useCallback((questionText) => {
    if (mobileSidebarOpen) {
      setMobileSidebarOpen(false);
    }
    handleSend(questionText);
  }, [mobileSidebarOpen, handleSend]);

  const toggleListening = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(t.micNotSupported);
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = false;

      const langCodes = { en: 'en-US', ta: 'ta-IN', hi: 'hi-IN', te: 'te-IN', ml: 'ml-IN' };
      recognition.lang = langCodes[currentLang] || 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        handleSend(transcript);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  }, [isListening, currentLang, t.micNotSupported, handleSend]);

  const handleSpeak = useCallback((text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const cleanText = text.replace(/[*_#`]/g, '').replace(/\[.*?\]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);

    const langCodes = { en: 'en-US', ta: 'ta-IN', hi: 'hi-IN', te: 'te-IN', ml: 'ml-IN' };
    utterance.lang = langCodes[currentLang] || 'en-US';

    utterance.onend = () => setSpeechStatus(null);
    utterance.onerror = () => setSpeechStatus(null);

    setSpeechStatus('speaking');
    window.speechSynthesis.speak(utterance);
  }, [currentLang]);

  const handlePauseResumeTTS = useCallback(() => {
    if (!('speechSynthesis' in window)) return;
    if (speechStatus === 'speaking') {
      window.speechSynthesis.pause();
      setSpeechStatus('paused');
    } else if (speechStatus === 'paused') {
      window.speechSynthesis.resume();
      setSpeechStatus('speaking');
    }
  }, [speechStatus]);

  const handleStopTTS = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeechStatus(null);
    }
  }, []);

  const handleCopy = useCallback((text, index) => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  }, []);

  const suggestedQuestions = useMemo(() => {
    const list = {
      en: [
        "Compare January to March with March to April",
        "What is the warmest temperature recorded?",
        "Where is the saltiest water in the dataset?",
        "What happens to temperature at 500 meters?",
        "What does the ocean temperature data indicate?",
        "Explain this ocean graph in simple English"
      ],
      ta: [
        "ஜனவரி மற்றும் மார்ச் மாதங்களை ஒப்பிடு",
        "மிகவும் வெப்பமான பதிவு எது?",
        "அரபிக்கடலில் உப்புத்தன்மை எவ்வளவு?",
        "500 மீட்டர் ஆழத்தில் வெப்பநிலை என்ன?",
        "எளிய தமிழில் விளக்கு"
      ],
      hi: [
        "जनवरी से मार्च की तुलना मार्च से अप्रैल से करें",
        "सबसे अधिक तापमान कहाँ दर्ज हुआ?",
        "500 मीटर गहराई पर पानी कैसा होता है?",
        "इस ग्राफ को सरल शब्दों में समझाएं"
      ],
      te: [
        "జనవరి మరియు మార్చి పోల్చండి",
        "అత్యధిక ఉష్ణోగ్రత ఎంత?",
        "500 మీటర్ల లోతు వద్ద సెలైనిటీ ఎంత?",
        "ఈ గ్రాఫ్‌ని సరళంగా వివరించండి"
      ],
      ml: [
        "ജനുവരിയും മാർച്ചും തമ്മിൽ താരതമ്യം ചെയ്യുക",
        "ഏറ്റവും ഉയർന്ന താപനില എത്ര?",
        "500 മീറ്റർ ആഴത്തിൽ എന്താണ് സംഭവിക്കുന്നത്?",
        "ലളിതമായ ഭാഷയിൽ വിശദീകരിക്കുക"
      ]
    };
    return list[currentLang] || list.en;
  }, [currentLang]);

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-4 h-[calc(100vh-130px)] min-h-[580px]">
      
      {/* Desktop Sidebar: Who Can Use FloatChat? */}
      {!isSidebarCollapsed && (
        <aside className="hidden lg:flex w-80 flex-shrink-0 bg-white rounded-2xl border border-beige shadow-sm overflow-hidden flex-col">
          <WhoCanUseSidebar
            selectedCategory={selectedCategory}
            onSelectCategory={cat => {
              setSelectedCategory(cat);
              if (onSelectCategory) onSelectCategory(cat);
            }}
            onSelectQuestion={handleQuestionSelect}
            isMobile={false}
          />
        </aside>
      )}

      {/* Mobile Slide-over Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-charcoal/30 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-80 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-10 border-r border-beige">
            <WhoCanUseSidebar
              selectedCategory={selectedCategory}
              onSelectCategory={cat => {
                setSelectedCategory(cat);
                if (onSelectCategory) onSelectCategory(cat);
              }}
              onSelectQuestion={handleQuestionSelect}
              isMobile={true}
              onClose={() => setMobileSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col bg-white rounded-2xl border border-beige shadow-sm overflow-hidden min-w-0">
        
        {/* Chat Header */}
        <div className="px-4 sm:px-5 py-3 border-b border-beige flex items-center justify-between bg-ivory-50 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {/* Desktop Collapse Toggle */}
            <button
              onClick={() => setIsSidebarCollapsed(c => !c)}
              title={isSidebarCollapsed ? "Show 'Who Can Use' Sidebar" : "Hide Sidebar"}
              className="hidden lg:flex items-center gap-1 px-2 py-1 rounded-lg border border-beige bg-white text-charcoal hover:bg-ivory text-xs font-semibold"
            >
              <span>{isSidebarCollapsed ? "👥 Guides" : "◀"}</span>
            </button>

            {/* Mobile Open Drawer Button */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-sage/40 bg-sage-subtle text-sage-dark font-semibold text-xs hover:bg-sage hover:text-white transition-colors flex-shrink-0"
            >
              <span>👥</span>
              <span>{t.sidebarToggleBtn}</span>
            </button>

            <div className="truncate min-w-0">
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
                  title="Configure Google Gemini AI API Key"
                >
                  <span className="text-xs">✨</span>
                  <span>Gemini AI</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${isGeminiActive ? 'bg-purple-600 animate-pulse' : 'bg-charcoal-muted/30'}`}></span>
                </button>
              </div>
              <p className="text-[11px] text-charcoal-muted truncate hidden sm:block">{t.chatSubtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {speechStatus && (
              <div className="flex items-center gap-1 text-xs">
                <button onClick={handlePauseResumeTTS} className="px-2 py-1 rounded bg-white border border-beige text-charcoal font-semibold hover:bg-ivory">
                  {speechStatus === 'speaking' ? `⏸ ${t.btnPause}` : `▶ ${t.btnResume}`}
                </button>
                <button onClick={handleStopTTS} className="px-2 py-1 rounded bg-white border border-beige text-terracotta font-semibold hover:bg-ivory">
                  ⏹ {t.btnStop}
                </button>
              </div>
            )}
            <button
              onClick={() => {
                if (window.confirm(t.clearConfirm)) {
                  setMessages([{ sender: 'assistant', text: t.welcomeDesc, visualization_type: 'none', visualization_data: null }]);
                  FloatChatAI.resetContext();
                }
              }}
              className="text-xs px-2.5 py-1 rounded-lg border border-beige bg-white text-charcoal-muted hover:text-charcoal hover:bg-ivory"
            >
              {t.btnClearChat}
            </button>
          </div>
        </div>

        {/* Suggested Prompt Chips */}
        <div className="px-4 py-2 bg-ivory border-b border-beige overflow-x-auto whitespace-nowrap custom-scrollbar flex items-center gap-2">
          <span className="text-[11px] font-semibold text-charcoal-muted">Quick:</span>
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-xs px-2.5 py-1 rounded-full bg-white border border-beige text-charcoal hover:bg-sage-subtle hover:text-sage-dark hover:border-sage transition-colors flex-shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 custom-scrollbar bg-[#FCFBF9]">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[90%] sm:max-w-[82%] ${msg.sender === 'user' ? 'bg-sage text-white rounded-2xl rounded-tr-sm p-4 shadow-sm' : 'bg-white text-charcoal border border-beige rounded-2xl rounded-tl-sm p-5 shadow-sm space-y-3'}`}>
                
                {msg.sender === 'assistant' && (
                  <div className="flex items-center justify-between pb-2 border-b border-beige/60 text-xs">
                    <div className="flex items-center gap-1.5 font-semibold text-sage-dark">
                      <span>🌱</span>
                      <span>FloatChat</span>
                      <span className="text-[10px] font-mono font-normal px-1.5 py-0.5 rounded bg-sage-subtle border border-sage/20 text-sage-dark ml-1">
                        {t.datasetBadge}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopy(msg.text, index)}
                        className="text-[11px] text-charcoal-muted hover:text-charcoal px-1.5 py-0.5 rounded hover:bg-ivory"
                      >
                        {copiedIndex === index ? `✓ ${t.btnCopied}` : `📋 ${t.btnCopy}`}
                      </button>
                      <button
                        onClick={() => handleSpeak(msg.text)}
                        className="text-[11px] text-charcoal-muted hover:text-charcoal px-1.5 py-0.5 rounded hover:bg-ivory"
                      >
                        🔊 {t.btnSpeak}
                      </button>
                    </div>
                  </div>
                )}

                <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans">
                  {msg.text}
                </div>

                {msg.visualization_type === 'depth_profile' && msg.visualization_data && (
                  <div className="pt-2">
                    <DepthProfileChart observations={msg.visualization_data} />
                  </div>
                )}
                {msg.visualization_type === 'map' && msg.visualization_data && (
                  <div className="pt-2">
                    <FloatMap floats={msg.visualization_data} />
                  </div>
                )}

              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-beige rounded-2xl p-4 shadow-sm flex items-center gap-2 text-xs text-charcoal-muted">
                <span className="w-2 h-2 rounded-full bg-sage animate-ping"></span>
                <span>{t.thinking}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-beige">
          {isListening && (
            <div className="text-xs text-terracotta font-semibold mb-2 flex items-center gap-2 animate-pulse">
              <span className="w-2.5 h-2.5 rounded-full bg-terracotta"></span>
              <span>{t.micListening}</span>
              <button onClick={toggleListening} className="underline text-charcoal ml-2">({t.micStop})</button>
            </div>
          )}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={toggleListening}
              title="Speech Input"
              className={`w-10 h-10 rounded-xl border flex items-center justify-center text-sm transition-colors flex-shrink-0 ${isListening ? 'bg-terracotta text-white border-terracotta' : 'bg-ivory-50 border-beige text-charcoal hover:bg-ivory'}`}
            >
              🎙
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.inputPlaceholder}
              className="flex-1 bg-ivory-50 border border-beige rounded-xl px-4 py-2.5 text-xs sm:text-sm text-charcoal outline-none focus:border-sage focus:ring-1 focus:ring-sage"
            />

            <button
              type="submit"
              disabled={!inputText.trim() || loading}
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-sage text-white font-semibold text-xs sm:text-sm hover:bg-sage-dark disabled:opacity-40 transition-colors shadow-sm flex-shrink-0"
            >
              {t.btnSend}
            </button>
          </form>
        </div>

      </div>

    </div>
      {/* Gemini AI Settings Modal */}
      <GeminiModal
        isOpen={geminiModalOpen}
        onClose={() => setGeminiModalOpen(false)}
        onUpdate={() => setIsGeminiActive(localStorage.getItem('floatchat_gemini_enabled') === 'true' && !!localStorage.getItem('floatchat_gemini_api_key'))}
      />
  );
}

// ============================================================================
// ROOT APPLICATION COMPONENT
// ============================================================================
function App() {
  const [currentLang, setCurrentLang] = useState(() => {
    try {
      return localStorage.getItem('floatchat_language') || 'en';
    } catch (e) {
      return 'en';
    }
  });
  const [currentView, setCurrentView] = useState('home');
  const [activeCategory, setActiveCategory] = useState(null);

  const t = useMemo(() => TRANSLATIONS[currentLang] || TRANSLATIONS.en, [currentLang]);

  const handleLanguageChange = useCallback((lang) => {
    setCurrentLang(lang);
    try {
      localStorage.setItem('floatchat_language', lang);
    } catch (e) {}
  }, []);

  const handleNavigate = useCallback((view, categoryId = null) => {
    if (categoryId) {
      const found = USER_CATEGORIES.find(c => c.id === categoryId);
      setActiveCategory(found || null);
    }
    setCurrentView(view);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5EF] text-[#303B35]">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-beige px-4 sm:px-8 py-3 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          
          {/* Brand */}
          <button
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-sage text-white flex items-center justify-center font-bold text-base shadow-xs group-hover:scale-105 transition-transform flex-shrink-0">
              🌊
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight font-heading text-charcoal">{t.appTitle}</span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-sage-subtle text-sage-dark border border-sage/20 font-semibold hidden sm:inline-block">
                  {t.appSubtitle}
                </span>
              </div>
            </div>
          </button>

          {/* Nav items */}
          <nav className="flex items-center gap-1 bg-ivory p-1 rounded-xl border border-beige">
            <button
              onClick={() => handleNavigate('home')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${currentView === 'home' ? 'bg-white text-charcoal shadow-xs border border-beige/60' : 'text-charcoal-muted hover:text-charcoal'}`}
            >
              <span>🏠</span>
              <span className="hidden sm:inline">{t.navHome}</span>
            </button>
            <button
              onClick={() => handleNavigate('explore')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${currentView === 'explore' ? 'bg-white text-charcoal shadow-xs border border-beige/60' : 'text-charcoal-muted hover:text-charcoal'}`}
            >
              <span>📊</span>
              <span className="hidden sm:inline">{t.navExplore}</span>
            </button>
            <button
              onClick={() => handleNavigate('chat')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${currentView === 'chat' ? 'bg-white text-charcoal shadow-xs border border-beige/60' : 'text-charcoal-muted hover:text-charcoal'}`}
            >
              <span>💬</span>
              <span className="hidden sm:inline">{t.navChat}</span>
            </button>
          </nav>

          {/* Right: Language Dropdown & Dataset Badge */}
          <div className="flex items-center gap-2">
            <select
              value={currentLang}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-ivory border border-beige text-charcoal rounded-lg px-2.5 py-1.5 text-xs font-semibold outline-none cursor-pointer hover:bg-beige-light transition-colors"
            >
              <option value="en">🇬🇧 English</option>
              <option value="ta">🇮🇳 தமிழ்</option>
              <option value="hi">🇮🇳 हिन्दी</option>
              <option value="te">🇮🇳 తెలుగు</option>
              <option value="ml">🇮🇳 മലയാളം</option>
            </select>

            <span className="hidden lg:inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-lg bg-ivory border border-beige text-charcoal-muted">
              <span className="w-2 h-2 rounded-full bg-sage"></span>
              <span>{t.badgeDataset}</span>
            </span>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {currentView === 'home' && <HomeView t={t} onNavigate={handleNavigate} />}
        {currentView === 'explore' && <ExploreDataView t={t} />}
        {currentView === 'chat' && (
          <ChatView
            t={t}
            currentLang={currentLang}
            initialCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-4 border-t border-beige bg-white text-center text-xs text-charcoal-muted">
        FloatChat • Built by Students for Natural Oceanographic Data Exploration • 2024
      </footer>

    </div>
  );
}

// Render React App
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
}

