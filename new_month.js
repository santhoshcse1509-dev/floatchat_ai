    // Check for Month / Seasonal window
    let mentionedMonth = null;
    if (/jan|ஜனவரி|जनवरी|జనవరి|ജനുവരി/i.test(qLower)) mentionedMonth = 'Jan';
    else if (/feb|பிப்ரவரி|फरवरी|ఫిబ్రవరి|ഫെബ്രുവരി/i.test(qLower)) mentionedMonth = 'Feb';
    else if (/mar|மார்ச்|मार्च|మార్చి|മാർച്ച്/i.test(qLower)) mentionedMonth = 'Mar';
    else if (/apr|ஏப்ரல்|अप्रैल|ఏప్రిల్|ഏപ്രിൽ/i.test(qLower)) mentionedMonth = 'Apr';
    else if (/may|மே\b|मई|మే|മേയ്/i.test(qLower)) mentionedMonth = 'May';
    else if (/jun|ஜூன்|जून|జూన్|ஜூൺ/i.test(qLower)) mentionedMonth = 'Jun';
