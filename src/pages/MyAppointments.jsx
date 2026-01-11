import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Calendar, Clock, MapPin, XCircle } from 'lucide-react'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchAppointments()
    }, [])

    const fetchAppointments = async () => {
        try {
            // Normalde user_id filtresi eklenmeli. MVP için tüm randevuları çekiyoruz veya sadece son eklenenleri.
            // Gerçek senaryoda: .eq('user_id', currentUser.id)
            const { data, error } = await supabase
                .from('appointments')
                .select(`
                    *,
                    doctors ( name, specialty, image_url, departments(name) )
                `)
                .order('date', { ascending: true })

            if (error) throw error
            setAppointments(data)
        } catch (error) {
            console.error('Randevular çekilemedi:', error.message)
        } finally {
            setLoading(false)
        }
    }

    const cancelAppointment = async (id) => {
        if (!confirm('Randevuyu iptal etmek istediğinize emin misiniz?')) return

        try {
            const { error } = await supabase
                .from('appointments')
                .delete() // veya .update({ status: 'cancelled' })
                .eq('id', id)

            if (error) throw error

            // Listeyi güncelle
            setAppointments(prev => prev.filter(appt => appt.id !== id))
            alert('Randevu iptal edildi.')
        } catch (error) {
            console.error('İptal hatası:', error.message)
            alert('İptal edilemedi.')
        }
    }

    if (loading) return <div className="text-center py-10">Yükleniyor...</div>

    return (
        <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Randevularım</h2>

            {appointments.length === 0 ? (
                <div className="text-center p-10 bg-white rounded-xl border border-slate-100">
                    <p className="text-slate-500 mb-4">Henüz aktif bir randevunuz bulunmamaktadır.</p>
                    <a href="/doctors" className="text-primary-600 font-medium hover:underline">Hemen Randevu Al</a>
                </div>
            ) : (
                <div className="space-y-4">
                    {appointments.map((appt) => (
                        <div key={appt.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-slate-100 rounded-full overflow-hidden flex-shrink-0">
                                    {appt.doctors?.image_url && <img src={appt.doctors.image_url} className="w-full h-full object-cover" />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 text-lg">{appt.doctors?.name}</h3>
                                    <p className="text-primary-600 font-medium text-sm">{appt.doctors?.specialty}</p>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {format(new Date(appt.date), 'd MMM yyyy', { locale: tr })}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {appt.time_slot}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 w-full md:w-auto">
                                <button
                                    onClick={() => cancelAppointment(appt.id)}
                                    className="flex-1 md:flex-none px-4 py-2 border border-red-100 text-red-600 rounded-lg hover:bg-red-50 flex items-center justify-center gap-2 transition"
                                >
                                    <XCircle className="w-4 h-4" />
                                    İptal Et
                                </button>
                                {/* Güncelleme butonu eklenebilir */}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyAppointments

