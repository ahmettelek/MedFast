import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { Stethoscope, Eye, Heart, Bone, Activity, Brain, Baby, Smile } from 'lucide-react'

// Icon haritası
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

const Departments = () => {
    const [departments, setDepartments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const { data, error } = await supabase.from('departments').select('*')
                if (error) throw error
                setDepartments(data)
            } catch (error) {
                console.error('Departmanlar çekilemedi:', error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchDepartments()
    }, [])

    if (loading) return <div className="text-center p-10">Yükleniyor...</div>

    return (
        <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Poliklinikler</h2>
            {departments.length === 0 ? (
                <div className="text-center p-10 bg-slate-100 rounded-lg">
                    <p>Henüz poliklinik bulunamadı. Lütfen veritabanı şemasını çalıştırdığınızdan emin olun.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {departments.map((dept) => {
                        const IconComponent = iconMap[dept.icon] || Stethoscope
                        return (
                            <Link to={`/departments/${dept.id}`} key={dept.id} className="block group">
                                <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:border-primary-500 group-hover:shadow-md transition text-center h-full">
                                    <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition">
                                        <IconComponent className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-semibold text-slate-700">{dept.name}</h3>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default Departments
