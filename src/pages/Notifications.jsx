import React, { useEffect, useState } from 'react'
import {
    Bell,
    CalendarCheck,
    FileText,
    Activity,
    ClipboardList,
    Clock,
    CheckCircle2,
    AlertCircle,
    Loader2
} from 'lucide-react'
import { supabase } from '../supabaseClient'
import { useAuth } from '../context/AuthContext'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'

const Notifications = () => {
    const { user } = useAuth()
    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(true)

    const iconMap = {
        appointment: CalendarCheck,
        result: Activity,
        prescription: FileText,
        reminder: Clock,
        system: Bell
    }

    const colorMap = {
        appointment: { text: "text-green-600", bg: "bg-green-50", border: "border-green-100" },
        result: { text: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
        prescription: { text: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
        reminder: { text: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100" },
        system: { text: "text-primary-600", bg: "bg-primary-50", border: "border-primary-100" }
    }

    const fetchNotifications = async () => {
        if (!user) return
        try {
            const { data, error } = await supabase
                .from('notifications')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })

            if (error) throw error
            setNotifications(data || [])
        } catch (error) {
            console.error('Bildirim çekme hatası:', error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchNotifications()
    }, [user])

    const markAsRead = async (id) => {
        try {
            const { error } = await supabase
                .from('notifications')
                .update({ is_read: true })
                .eq('id', id)

            if (error) throw error
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n))
        } catch (error) {
            console.error('Okundu işaretleme hatası:', error.message)
        }
    }

    const markAllAsRead = async () => {
        if (!user) return
        try {
            const { error } = await supabase
                .from('notifications')
                .update({ is_read: true })
                .eq('user_id', user.id)
                .eq('is_read', false)

            if (error) throw error
            setNotifications(prev => prev.map(n => ({ ...n, is_read: true })))
        } catch (error) {
            console.error('Tümünü okundu işaretleme hatası:', error.message)
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-primary-600 animate-spin mb-4" />
                <p className="text-slate-500 font-medium">Bildirimler yükleniyor...</p>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto py-4">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="bg-primary-100 p-2 rounded-lg">
                        <Bell className="w-6 h-6 text-primary-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">Bildirimler</h2>
                </div>
                {notifications.some(n => !n.is_read) && (
                    <button
                        onClick={markAllAsRead}
                        className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition"
                    >
                        Tümünü Okundu İşaretle
                    </button>
                )}
            </div>

            {notifications.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
                    <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-700">Her Şey Güncel!</h3>
                    <p className="text-slate-500 max-w-xs mx-auto mt-1">
                        Şu an için yeni bir bildiriminiz bulunmuyor. Sağlıklı günler dileriz.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {notifications.map((item) => {
                        const Icon = iconMap[item.type] || Bell
                        const style = colorMap[item.type] || colorMap.system
                        return (
                            <div
                                key={item.id}
                                onClick={() => !item.is_read && markAsRead(item.id)}
                                className={`p-4 rounded-xl border transition group cursor-pointer hover:shadow-md ${item.is_read
                                        ? 'bg-white border-slate-100 opacity-75'
                                        : `bg-white ${style.border} ring-1 ring-slate-50 shadow-sm`
                                    }`}
                            >
                                <div className="flex gap-4">
                                    <div className={`p-3 rounded-xl flex-shrink-0 ${style.bg} ${style.text}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className={`font-bold ${item.is_read ? 'text-slate-600' : 'text-slate-900'}`}>
                                                {item.title}
                                            </h3>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase">
                                                {item.created_at ? format(new Date(item.created_at), 'd MMM HH:mm', { locale: tr }) : ''}
                                            </span>
                                        </div>
                                        <p className={`text-sm leading-relaxed ${item.is_read ? 'text-slate-500' : 'text-slate-700'}`}>
                                            {item.message}
                                        </p>
                                        {!item.is_read && (
                                            <div className="mt-2 flex items-center gap-1.5">
                                                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse"></div>
                                                <span className="text-[9px] font-extrabold text-primary-600 uppercase tracking-widest">
                                                    YENİ
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default Notifications
