import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { Calendar, Clock, MapPin, Star, CheckCircle, User } from 'lucide-react'
import { format, addDays, startOfToday } from 'date-fns'
import { tr } from 'date-fns/locale'
import clsx from 'clsx'

// Fallback handling image component
const DoctorImage = ({ src, alt, className }) => {
    const [error, setError] = useState(false)

    if (error || !src) {
        return (
            <div className={`flex items-center justify-center bg-slate-200 text-slate-400 ${className}`}>
                <User className="w-20 h-20 opacity-50" />
            </div>
        )
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setError(true)}
        />
    )
}

const DoctorDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [doctor, setDoctor] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedDate, setSelectedDate] = useState(startOfToday())
    const [selectedSlot, setSelectedSlot] = useState(null)

    // Takvim için sonraki 7 gün
    // Aktif değilse (İzinli) takvim yarından başlar
    const startDayOffset = (doctor && !doctor.is_active) ? 1 : 0
    const nextDays = Array.from({ length: 7 }, (_, i) => addDays(startOfToday(), i + startDayOffset))

    // Saat dilimleri (Mock)
    const timeSlots = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'
    ]

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const { data, error } = await supabase
                    .from('doctors')
                    .select('*, departments(name)')
                    .eq('id', id)
                    .single()

                if (error) throw error
                setDoctor(data)
            } catch (error) {
                console.error('Doktor detay hatası:', error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchDoctor()
    }, [id])

    const handleBooking = () => {
        if (!selectedSlot) return

        // Randevu özet sayfasına yönlendir (State ile veri taşıma)
        navigate('/appointment-confirm', {
            state: {
                doctor,
                date: selectedDate,
                slot: selectedSlot
            }
        })
    }

    if (loading) return <div className="text-center py-10">Yükleniyor...</div>
    if (!doctor) return <div className="text-center py-10">Doktor bulunamadı.</div>

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sol: Doktor Bilgisi */}
            <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sticky top-6">
                    {/* Doctor image with active status overlay */}
                    <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden mb-6 relative">
                        <DoctorImage
                            src={doctor.image_url}
                            alt={doctor.name}
                            className="w-full h-full object-cover"
                        />

                        <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm border ${doctor.is_active
                            ? 'bg-white/90 text-green-700 border-green-200'
                            : 'bg-white/90 text-slate-500 border-slate-200'
                            }`}>
                            <span className={`w-2.5 h-2.5 rounded-full ${doctor.is_active ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`}></span>
                            {doctor.is_active ? 'Aktif' : 'İzinli'}
                        </div>
                    </div>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-slate-800">{doctor.name}</h1>
                        <p className="text-primary-600 font-medium">{doctor.specialty}</p>
                        <p className="text-sm text-slate-500 mt-1">{doctor.departments?.name}</p>

                        <div className="flex items-center justify-center gap-2 mt-3">
                            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-500" />
                                <span className="font-bold text-slate-700">{doctor.rating}</span>
                            </div>
                            <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-md text-blue-700 text-sm font-medium">
                                <CheckCircle className="w-3 h-3" /> {doctor.years_of_experience} Yıl Tecrübe
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-100">
                        <h3 className="font-semibold text-slate-800 mb-2">Hakkında</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            {doctor.about || "Doktor hakkında detaylı bilgi bulunmamaktadır."}
                        </p>
                    </div>
                </div>
            </div>

            {/* Sağ: Randevu Takvimi */}
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                    <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary-600" />
                        Randevu Tarihi Seçin
                    </h2>

                    {/* Tarih Kartları */}
                    <div className="flex gap-3 overflow-x-auto pb-4">
                        {nextDays.map((date) => {
                            const isSelected = date.toDateString() === selectedDate.toDateString()
                            return (
                                <button
                                    key={date.toString()}
                                    onClick={() => {
                                        setSelectedDate(date)
                                        setSelectedSlot(null)
                                    }}
                                    className={clsx(
                                        "flex-shrink-0 w-24 p-3 rounded-lg border transition text-center",
                                        isSelected
                                            ? "border-primary-600 bg-primary-50 text-primary-700"
                                            : "border-slate-200 hover:border-primary-300 bg-white"
                                    )}
                                >
                                    <div className="text-xs font-medium opacity-70 mb-1">
                                        {format(date, 'EEE', { locale: tr })}
                                    </div>
                                    <div className="text-lg font-bold">
                                        {format(date, 'd')}
                                    </div>
                                    <div className="text-xs opacity-70">
                                        {format(date, 'MMM', { locale: tr })}
                                    </div>
                                </button>
                            )
                        })}
                    </div>

                    <h2 className="text-lg font-bold text-slate-800 mb-4 mt-6 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary-600" />
                        Saat Seçin
                    </h2>

                    {/* Saat Slotları */}
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                        {timeSlots.map((slot) => {
                            const isSelected = selectedSlot === slot
                            return (
                                <button
                                    key={slot}
                                    onClick={() => setSelectedSlot(slot)}
                                    className={clsx(
                                        "py-2 px-3 rounded-md text-sm font-medium transition",
                                        isSelected
                                            ? "bg-primary-600 text-white shadow-md transform scale-105"
                                            : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-transparent hover:border-slate-200"
                                    )}
                                >
                                    {slot}
                                </button>
                            )
                        })}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={handleBooking}
                        disabled={!selectedSlot}
                        className={clsx(
                            "px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all",
                            selectedSlot
                                ? "bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl translate-y-0"
                                : "bg-slate-200 text-slate-400 cursor-not-allowed"
                        )}
                    >
                        Devam Et
                        <CheckCircle className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DoctorDetail
