import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { Stethoscope, Eye, Heart, Bone, Activity, Brain, Baby, Smile, ArrowLeft, Star, MapPin, CalendarCheck, Clock, CheckCircle, User } from 'lucide-react'

const iconMap = {
    'Stethoscope': Stethoscope,
    'Eye': Eye,
    'Heart': Heart,
    'Bone': Bone,
    'Activity': Activity,
    'Brain': Brain,
    'Baby': Baby,
    'Smile': Smile
}

// Fallback handling image component
const DoctorImage = ({ src, alt, className }) => {
    const [error, setError] = useState(false)

    if (error || !src) {
        return (
            <div className={`flex items-center justify-center bg-slate-200 text-slate-400 ${className}`}>
                <User className="w-12 h-12 opacity-50" />
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

const DepartmentDetail = () => {
    const { id } = useParams()
    const [department, setDepartment] = useState(null)
    const [doctors, setDoctors] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Departman Bilgisi
                const { data: deptData, error: deptError } = await supabase
                    .from('departments')
                    .select('*')
                    .eq('id', id)
                    .single()

                if (deptError) throw deptError
                setDepartment(deptData)

                // 2. Bu departmandaki doktorlar
                const { data: docData, error: docError } = await supabase
                    .from('doctors')
                    .select('*')
                    .eq('department_id', id)

                if (docError) throw docError
                setDoctors(docData)

            } catch (error) {
                console.error('Veri çekme hatası:', error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [id])

    if (loading) return <div className="text-center py-10">Yükleniyor...</div>
    if (!department) return <div className="text-center py-10">Bölüm bulunamadı.</div>

    const IconComponent = iconMap[department.icon] || Stethoscope

    return (
        <div className="space-y-8">
            {/* Header / Bilgi Kartı */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>

                <Link to="/departments" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition">
                    <ArrowLeft className="w-5 h-5" /> Tüm Poliklinikler
                </Link>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
                    <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                        <IconComponent className="w-12 h-12 text-white" />
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold mb-2">{department.name}</h1>
                        <p className="text-primary-100 text-lg max-w-2xl">{department.description || "Bu bölüm hakkında detaylı açıklama bulunmamaktadır."}</p>
                    </div>
                </div>
            </div>

            {/* Doktor Listesi */}
            <div>
                <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-primary-500 rounded-full"></span>
                    Uzman Doktorlarımız
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {doctors.map((doc) => (
                        <div key={doc.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition group">
                            {/* Doctor image with active status overlay */}
                            <div className="aspect-video bg-slate-100 relative overflow-hidden">
                                <DoctorImage
                                    src={doc.image_url}
                                    alt={doc.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                />

                                <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-sm border ${doc.is_active
                                    ? 'bg-white/90 text-green-700 border-green-200'
                                    : 'bg-white/90 text-slate-500 border-slate-200'
                                    }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${doc.is_active ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`}></span>
                                    {doc.is_active ? 'Aktif' : 'İzinli'}
                                </div>

                                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-xs font-semibold text-yellow-600 flex items-center gap-1 shadow-sm">
                                    <Star className="w-3 h-3 fill-yellow-500" /> {doc.rating}
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-slate-800">{doc.name}</h3>
                                <p className="text-sm text-primary-600 font-medium mb-1">{doc.specialty}</p>
                                <p className="text-xs text-slate-500 mb-4 line-clamp-2">{doc.about}</p>

                                {(() => {
                                    const allTimes = [
                                        'Bugün 14:30', 'Bugün 15:15', 'Bugün 16:45',
                                        'Yarın 09:15', 'Yarın 10:30', 'Yarın 11:45', 'Yarın 13:30', 'Yarın 15:00',
                                        'Çarşamba 09:00', 'Çarşamba 14:20', 'Çarşamba 16:10',
                                        'Perşembe 10:15', 'Perşembe 11:30', 'Perşembe 14:45',
                                        'Cuma 09:30', 'Cuma 11:00', 'Cuma 15:15', 'Cuma 16:30'
                                    ];

                                    // Filter based on active status
                                    const availableTimes = doc.is_active
                                        ? allTimes
                                        : allTimes.filter(t => !t.startsWith('Bugün'));

                                    // Simple hash function for consistent random time per doctor
                                    let hash = 0;
                                    for (let i = 0; i < doc.id.length; i++) {
                                        hash = ((hash << 5) - hash) + doc.id.charCodeAt(i);
                                        hash |= 0;
                                    }

                                    const timeIndex = Math.abs(hash) % availableTimes.length;
                                    const randomTime = availableTimes[timeIndex];

                                    return (
                                        <div className={`flex items-center gap-2 mb-4 px-3 py-2 rounded-lg text-xs font-semibold w-full transition-colors ${doc.is_active
                                                ? 'bg-green-50 text-green-700'
                                                : 'bg-orange-50 text-orange-700'
                                            }`}>
                                            <CalendarCheck className="w-4 h-4 flex-shrink-0" />
                                            <span>En Erken: {randomTime}</span>
                                        </div>
                                    );
                                })()}

                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                                    <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
                                        <CheckCircle className="w-3 h-3 text-primary-500" />
                                        {doc.years_of_experience ? `${doc.years_of_experience} Yıl Tecrübe` : 'Tecrübeli'}
                                    </div>
                                    <Link to={`/doctors/${doc.id}`} className="px-4 py-2 bg-slate-50 text-slate-700 hover:bg-primary-600 hover:text-white rounded-lg text-sm font-medium transition">
                                        Randevu Al
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DepartmentDetail
