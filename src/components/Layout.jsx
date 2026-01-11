import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Stethoscope, Users, Calendar, Clock, User, Bell, Menu, X, LogOut, Sparkles, FileText, HelpCircle } from 'lucide-react'
import { useState } from 'react'
import clsx from 'clsx'
import { useAuth } from '../context/AuthContext'

const Layout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const location = useLocation()
    const { signOut } = useAuth()
    const navigate = useNavigate()

    const handleSignOut = async () => {
        await signOut()
        navigate('/login', { state: { message: 'Başarıyla çıkış yaptınız. Görüşmek üzere!' } })
    }

    const navigation = [
        { name: 'Özet', href: '/', icon: LayoutDashboard },
        { name: 'AI Sağlık Asistanı', href: '/ai-assistant', icon: Sparkles },
        { name: 'Poliklinikler', href: '/departments', icon: Stethoscope },
        { name: 'Doktorlar', href: '/doctors', icon: Users },
        { name: 'Randevularım', href: '/my-appointments', icon: Calendar },
        { name: 'Reçetelerim', href: '/prescriptions', icon: FileText },
        { name: 'Geçmiş', href: '/history', icon: Clock },
        { name: 'Bildirimler', href: '/notifications', icon: Bell },
        { name: 'Profil', href: '/profile', icon: User },
        { name: 'Yardım & SSS', href: '/faq', icon: HelpCircle },
    ]

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar for Desktop */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 sticky top-0 h-screen">
                <div className="p-6 border-b border-slate-100">
                    <h1 className="text-2xl font-bold text-primary-600 flex items-center gap-2">
                        <Stethoscope className="w-8 h-8" />
                        MedFast
                    </h1>
                </div>
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navigation.map((item) => {
                        const Icon = item.icon
                        const isActive = location.pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={clsx(
                                    'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-primary-50 text-primary-700'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
                <div className="p-4 border-t border-slate-100">
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Çıkış Yap
                    </button>
                </div>
            </aside>

            {/* Mobile Header & Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header */}
                <header className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-10">
                    <h1 className="text-xl font-bold text-primary-600">MedFast</h1>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </header>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="md:hidden fixed inset-0 top-16 bg-white z-20 overflow-y-auto">
                        <nav className="p-4 space-y-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50"
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.name}
                                </Link>
                            ))}
                            <div className="border-t border-slate-100 my-2 pt-2">
                                <button
                                    onClick={() => {
                                        handleSignOut()
                                        setIsMobileMenuOpen(false)
                                    }}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Çıkış Yap
                                </button>
                            </div>
                        </nav>
                    </div>
                )}

                {/* Main Content */}
                <main className="flex-1 p-4 md:p-8 overflow-auto">
                    <div className="max-w-5xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Layout
