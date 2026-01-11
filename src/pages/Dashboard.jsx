import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Calendar, Users, Activity } from 'lucide-react'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'

const Dashboard = () => {
    const [stats, setStats] = useState({
        activeAppointments: 0,
        nextAppointment: null
    })

    useEffect(() => {
        const fetchStats = async () => {
            // Randevu sayısı
            const { count } = await supabase
                .from('appointments')
                .select('*', { count: 'exact', head: true })

            // En yakın randevu
            const { data: nextAppt } = await supabase
                .from('appointments')
                .select('date, time_slot, doctors(name)')
                .gte('date', new Date().toISOString()) // Bugünden sonrakiler
                .order('date', { ascending: true })
                .limit(1)
                .single()

            setStats({
                activeAppointments: count || 0,
                nextAppointment: nextAppt
            })
        }
        fetchStats()
    }, [])

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">Hoş Geldiniz</h2>
                <span className="text-sm text-slate-500">{new Date().toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary-50 text-primary-600 rounded-lg">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Yaklaşan Randevu</p>
                            <p className="text-lg font-semibold text-slate-900">
                                {stats.nextAppointment
                                    ? `${format(new Date(stats.nextAppointment.date), 'd MMM')} - ${stats.nextAppointment.time_slot}`
                                    : 'Henüz Yok'}
                            </p>
                            {stats.nextAppointment && <p className="text-xs text-slate-400">{stats.nextAppointment.doctors?.name}</p>}
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Aktif Randevular</p>
                            <p className="text-lg font-semibold text-slate-900">{stats.activeAppointments} Adet</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                            <Activity className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Son Muayene</p>
                            <p className="text-lg font-semibold text-slate-900">--</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Hızlı İşlemler</h3>
                <div className="flex gap-4">
                    <a href="/departments" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition">Randevu Al</a>
                    <a href="/doctors" className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition">Doktor Ara</a>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
