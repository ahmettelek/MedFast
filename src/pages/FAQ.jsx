import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'
import clsx from 'clsx'

const FAQ = () => {
    const [faqs, setFaqs] = useState([])
    const [openIndex, setOpenIndex] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const { data, error } = await supabase.from('faqs').select('*')
                if (error) throw error
                setFaqs(data)
            } catch (error) {
                console.error('SSS çekilemedi:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchFaqs()
    }, [])

    if (loading) return <div className="text-center p-10">Yükleniyor...</div>

    return (
        <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-800 flex items-center justify-center gap-3">
                    <HelpCircle className="w-8 h-8 text-primary-600" />
                    Yardım Merkezi
                </h2>
                <p className="text-slate-500 mt-2">Aklınıza takılan soruların cevapları burada.</p>
            </div>

            <div className="space-y-4">
                {faqs.length === 0 ? (
                    <p className="text-center text-slate-500">Henüz soru eklenmemiş.</p>
                ) : (
                    faqs.map((faq, index) => {
                        const isOpen = openIndex === index
                        return (
                            <div key={faq.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all">
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition"
                                >
                                    <span className="font-semibold text-slate-800">{faq.question}</span>
                                    {isOpen ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
                                </button>

                                <div
                                    className={clsx(
                                        "text-slate-600 bg-slate-50 px-5 text-sm leading-relaxed transition-all duration-300 ease-in-out border-t border-slate-100",
                                        isOpen ? "max-h-96 py-5 opacity-100" : "max-h-0 py-0 opacity-0 overflow-hidden"
                                    )}
                                >
                                    {faq.answer}
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default FAQ
