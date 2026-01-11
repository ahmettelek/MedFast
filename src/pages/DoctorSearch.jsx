import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { Search, MapPin, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

const DoctorSearch = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [doctors, setDoctors] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchDoctors()
    }, [])

    const fetchDoctors = async (term = '') => {
        setLoading(true)
        try {
            let query = supabase.from('doctors').select(`
                *,
                departments ( name )
            `)

            if (term) {
                query = query.ilike('name', `%${term}%`)
            }

            const { data, error } = await query

            if (error) throw error
            setDoctors(data)
        } catch (error) {
            console.error('Doktorlar çekilemedi:', error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = (e) => {
        const term = e.target.value
        setSearchTerm(term)
        // Debounce eklenebilir ama MVP için doğrudan çağırıyoruz
        fetchDoctors(term)
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-2xl font-bold text-slate-800">Doktor Bul</h2>
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Doktor ismi veya branş ara..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            {loading ? (
                <div className="text-center py-10">Yükleniyor...</div>
            ) : doctors.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-xl border border-slate-100">
                    <p className="text-slate-500">Aradığınız kriterlere uygun doktor bulunamadı.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {doctors.map((doc) => (
                        <div key={doc.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition">
                            <div className="aspect-video bg-slate-100 relative">
                                {doc.image_url ? (
                                    <img src={doc.image_url} alt={doc.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400">Görsel Yok</div>
                                )}
                                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-xs font-semibold text-yellow-600 flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-yellow-500" /> {doc.rating}
                                </div>
                            </div>
                            <div className="p-5">
                                <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                                    {doc.departments?.name}
                                </span>
                                <h3 className="text-lg font-bold text-slate-800 mt-2">{doc.name}</h3>
                                <p className="text-sm text-slate-500 mb-4">{doc.specialty}</p>

                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                                    <div className="text-xs text-slate-400 flex items-center gap-1">
                                        <MapPin className="w-3 h-3" /> İstanbul
                                    </div>
                                    <Link to={`/doctors/${doc.id}`} className="text-sm font-medium text-primary-600 hover:text-primary-700">
                                        Randevu Al &rarr;
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default DoctorSearch

