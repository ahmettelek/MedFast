import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Pill, FileText, Calendar, Download, Loader2, AlertCircle } from 'lucide-react'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const Prescriptions = () => {
    const [prescriptions, setPrescriptions] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                if (!user) return

                const { data, error } = await supabase
                    .from('prescriptions')
                    .select(`
                        *,
                        doctors (name)
                    `)
                    .eq('user_id', user.id)
                    .order('date', { ascending: false }) // Tarih alanı varsa (şemada created_at var, onu kullanırız)

                if (error) throw error
                setPrescriptions(data || [])
            } catch (error) {
                console.error('Reçeteler çekilemedi:', error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchPrescriptions()
    }, [user])

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="w-8 h-8 animate-spin text-primary-600" /></div>

    if (prescriptions.length === 0) {
        return (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="bg-primary-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Pill className="w-10 h-10 text-primary-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Henüz Reçeteniz Yok</h2>
                <p className="text-slate-500 max-w-md mx-auto mb-8">
                    Doktor muayenesi sonrası oluşturulan reçeteleriniz burada listelenecektir.
                </p>
                <Link to="/departments" className="bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition shadow-lg shadow-primary-200">
                    Hemen Randevu Al
                </Link>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">E-Reçetelerim</h2>
                <button className="text-primary-600 text-sm font-medium hover:underline flex items-center gap-1">
                    <FileText className="w-4 h-4" /> Tümünü PDF İndir
                </button>
            </div>

            <div className="grid gap-6">
                {prescriptions.map((script) => (
                    <div key={script.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="bg-slate-50 p-4 flex items-center justify-between border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-lg border border-slate-200">
                                    <Calendar className="w-5 h-5 text-slate-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">
                                        {script.created_at ? format(new Date(script.created_at), 'd MMMM yyyy', { locale: tr }) : 'Tarih Yok'}
                                    </p>
                                    <p className="text-xs text-slate-500">{script.doctors?.name || 'Doktor Bilgisi Yok'}</p>
                                </div>
                            </div>
                            <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">
                                E-İmzalı
                            </span>
                        </div>

                        <div className="p-6">
                            <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                                Tanı: {script.diagnosis}
                            </h3>

                            <div className="space-y-3">
                                {script.medicines && script.medicines.map((med, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                                        <div className="flex items-center gap-3">
                                            <Pill className="w-5 h-5 text-primary-500" />
                                            <span className="font-medium text-slate-800">{med.name}</span>
                                        </div>
                                        <span className="text-sm text-slate-500">{med.dosage}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end">
                                <button className="text-primary-600 text-sm font-medium hover:bg-primary-50 px-3 py-2 rounded-lg transition flex items-center gap-2">
                                    <Download className="w-4 h-4" /> Reçeteyi İndir
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Prescriptions
