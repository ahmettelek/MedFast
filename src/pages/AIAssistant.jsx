import { useState } from 'react'
import { analyzeSymptoms } from '../utils/aiHelper'
import { Sparkles, ArrowRight, Activity, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const AIAssistant = () => {
    const [symptom, setSymptom] = useState('')
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleAnalyze = () => {
        if (!symptom.trim()) return
        setLoading(true)

        // Simüle edilmiş "Düşünme" süresi
        setTimeout(() => {
            const suggestedDept = analyzeSymptoms(symptom)
            setResult(suggestedDept)
            setLoading(false)
        }, 1500)
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg mb-4">
                    <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-slate-800">Yapay Zeka Asistanı</h1>
                <p className="text-slate-500 max-w-md mx-auto">
                    Şikayetlerinizi doğal bir dille anlatın, yapay zekamız size en uygun tıbbi birimi ve uzmanı önersin.
                </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <textarea
                    value={symptom}
                    onChange={(e) => setSymptom(e.target.value)}
                    placeholder="Örneğin: Son iki gündür şiddetli baş ağrım var ve ışığa bakamıyorum..."
                    className="w-full h-32 p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-slate-700 placeholder:text-slate-400"
                />
                <div className="flex justify-end mt-4">
                    <button
                        onClick={handleAnalyze}
                        disabled={loading || !symptom}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-200"
                    >
                        {loading ? 'Analiz Ediliyor...' : 'Analiz Et'}
                        {!loading && <Sparkles className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            {result && (
                <div className="bg-green-50 border border-green-100 p-6 rounded-2xl animate-fade-in">
                    <div className="flex items-start gap-4">
                        <div className="bg-green-100 p-2 rounded-full">
                            <Activity className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-green-800">Önerilen Poliklinik</h3>
                            <p className="text-green-700 mt-1">
                                Şikayetleriniz <strong>{result}</strong> bölümü ile ilişkili görünüyor.
                            </p>

                            <div className="mt-4">
                                <Link
                                    to="/doctors" // İleride parametre ile filtreli gidebilir: /doctors?dept=Kardiyoloji
                                    // Ancak şimdilik genel doktor sayfasına yönlendiriyoruz, kullanıcı kendisi filtreleyebilir.
                                    // Veya state ile gönderebiliriz.
                                    state={{ filterDept: result }}
                                    className="inline-flex items-center gap-2 text-sm font-bold text-green-700 hover:text-green-800 hover:underline"
                                >
                                    {result} Doktorlarını Görüntüle <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {result === null && !loading && symptom && (
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 text-slate-500">
                        <AlertCircle className="w-5 h-5" />
                        <p>Emin olamadık. Lütfen şikayetinizi daha detaylı yazın veya "Genel Dahiliye" bölümüne başvurun.</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AIAssistant
