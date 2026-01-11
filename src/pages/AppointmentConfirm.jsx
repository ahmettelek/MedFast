import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { addNotification } from '../utils/notificationUtils'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Calendar, Clock, MapPin, CheckCircle, AlertCircle } from 'lucide-react'
import { supabase } from '../supabaseClient'
import { useState } from 'react'

const AppointmentConfirm = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { user } = useAuth()
    const { doctor, date, slot } = location.state || {}
    const [loading, setLoading] = useState(false)

    if (!doctor || !date || !slot) {
        return (
            <div className="text-center py-10">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-slate-800">Eksik Bilgi</h2>
                <p className="text-slate-500 mb-4">Randevu detaylarına ulaşılamadı.</p>
                <button onClick={() => navigate('/')} className="text-primary-600 underline">Ana Sayfaya Dön</button>
            </div>
        )
    }

    const handleConfirm = async () => {
        setLoading(true)
        try {
            // Mock kullanıcı ID (Normalde auth.user.id kullanılır)
            // Bu örnekte anonim randevu veya sabit bir dummy ID kullanabiliriz.
            // Supabase'den ilk profili çekip ona atayalım veya dummy oluşturalım.

            // Basitlik için rastgele UUID veya dummy profil oluşturmuyorum, 
            // şemada user_id nullable değilse hata alabiliriz. 
            // Şemada user_id referansı var. 
            // Not: Auth sistemi olmadığı için 'null' gönderiyoruz veya local storage'da geçici ID tutabiliriz.
            // Şimdilik user_id'yi NULL gönderip şemada nullable olup olmadığına güveneceğiz 
            // (Şemada user_id tanımı: user_id UUID REFERENCES profiles(id)) -> Default nullable'dır.

            const { error } = await supabase.from('appointments').insert([
                {
                    doctor_id: doctor.id,
                    date: format(date, 'yyyy-MM-dd'),
                    time_slot: slot,
                    status: 'confirmed',
                    user_id: user?.id
                }
            ])

            if (error) throw error

            // RANDEVU BİLDİRİMİ
            if (user?.id) {
                await addNotification({
                    userId: user.id,
                    title: 'Randevu Onayı',
                    message: `${doctor.name} (${doctor.specialty}) ile ${format(date, 'd MMMM', { locale: tr })} saat ${slot} randevunuz oluşturuldu.`,
                    type: 'appointment'
                })
            }

            alert('Randevunuz başarıyla oluşturuldu!')
            navigate('/my-appointments')
        } catch (error) {
            console.error('Randevu hatası:', error.message)
            alert('Randevu oluşturulurken bir hata oluştu.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Randevu Onayı</h2>

            <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
                <div className="bg-primary-600 p-6 text-white text-center">
                    <h3 className="text-lg font-medium opacity-90">Seçilen Randevu</h3>
                    <div className="text-3xl font-bold mt-2">
                        {format(date, 'd MMMM yyyy', { locale: tr })}
                    </div>
                    <div className="text-xl opacity-90 mt-1">{slot}</div>
                </div>

                <div className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-16 h-16 bg-slate-100 rounded-full overflow-hidden flex-shrink-0">
                            {doctor.image_url && <img src={doctor.image_url} className="w-full h-full object-cover" />}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-800">{doctor.name}</h3>
                            <p className="text-primary-600 font-medium">{doctor.specialty}</p>
                            <p className="text-sm text-slate-500">{doctor.departments?.name}</p>
                        </div>
                    </div>

                    <div className="space-y-4 border-t border-slate-100 pt-6">
                        <div className="flex items-center gap-3 text-slate-700">
                            <Clock className="w-5 h-5 text-primary-500" />
                            <span>Süre: <strong>30 Dakika</strong></span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-700">
                            <MapPin className="w-5 h-5 text-primary-500" />
                            <span>Konum: <strong>MedFast Ana Kampüs, Kat 2</strong></span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-700">
                            <CheckCircle className="w-5 h-5 text-primary-500" />
                            <span>Muayene Ücreti: <strong>1.500 ₺</strong></span>
                        </div>
                    </div>

                    <div className="mt-8">
                        <button
                            onClick={handleConfirm}
                            disabled={loading}
                            className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-700 transition shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? 'İşleniyor...' : 'Randevuyu Onayla'}
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="w-full text-slate-500 py-3 mt-2 font-medium hover:text-slate-800"
                        >
                            Vazgeç
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppointmentConfirm
