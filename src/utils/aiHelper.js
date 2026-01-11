export const analyzeSymptoms = (text) => {
    const lowerText = text.toLowerCase()

    // Basit anahtar kelime eşleşmesi (Gerçek bir AI/LLM API'si buraya entegre edilebilir)
    const rules = [
        { keywords: ['kalp', 'çarpıntı', 'göğüs ağrısı', 'tansiyon', 'nefes darlığı'], department: 'Kardiyoloji' },
        { keywords: ['göz', 'görme', 'bulanık', 'kaşıntı', 'batma'], department: 'Göz Hastalıkları' },
        { keywords: ['mide', 'karın', 'bulantı', 'kusma', 'hazımsızlık', 'İshal', 'kabızlık'], department: 'Dahiliye' },
        { keywords: ['baş ağrısı', 'migren', 'baş dönmesi', 'uyuşma', 'unutkanlık'], department: 'Nöroloji' },
        { keywords: ['kırık', 'çıkık', 'burkulma', 'eklem', 'diz', 'bel ağrısı'], department: 'Ortopedi' },
        { keywords: ['burun', 'boğaz', 'kulak', 'duyma', 'geniz'], department: 'Kulak Burun Boğaz' },
        { keywords: ['sivilce', 'leke', 'kaşıntı', 'egzama', 'saç dökülmesi'], department: 'Cildiye' },
        { keywords: ['diş', 'diş eti', 'ağız', 'çürük'], department: 'Diş Hekimliği' },
        { keywords: ['moral', 'depresyon', 'kaygı', 'stres', 'uykusuzluk'], department: 'Psikiyatri' },
        { keywords: ['çocuk', 'ateş', 'aşı', 'gelişim'], department: 'Çocuk Sağlığı' },
    ]

    const matches = rules.filter(rule =>
        rule.keywords.some(keyword => lowerText.includes(keyword))
    )

    if (matches.length > 0) {
        // En çok eşleşen veya ilk eşleşen
        return matches[0].department
    }

    return null
}
