import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Stethoscope, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const { signIn } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const message = location.state?.message

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            const { error } = await signIn({ email, password })
            if (error) throw error
            navigate('/')
        } catch (error) {
            if (error.message.includes('Email not confirmed')) {
                setError('Lütfen giriş yapmadan önce e-posta adresinize gönderilen doğrulama linkine tıklayın.')
            } else if (error.message.includes('Invalid login credentials')) {
                setError('Hatalı e-posta veya şifre.')
            } else {
                setError(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <div className="bg-primary-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary-600">
                            <Stethoscope className="w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800">MedFast'e Hoş Geldiniz</h1>
                        <p className="text-slate-500 mt-2">MedFast hesabınıza giriş yapın</p>
                    </div>

                    {message && (
                        <div className="bg-green-50 text-green-700 p-4 rounded-lg text-sm mb-6 flex items-start gap-2 border border-green-100 animate-fade-in">
                            <div className="mt-0.5">✅</div>
                            <div>{message}</div>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm mb-6 flex items-start gap-2">
                            <div className="mt-0.5">⚠️</div>
                            <div>{error}</div>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">E-posta Adresi</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                                    placeholder="ornek@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-1.5">
                                <label className="block text-sm font-medium text-slate-700">Şifre</label>
                                <Link to="/forgot-password" className="text-sm text-primary-600 font-medium hover:underline">Şifremi Unuttum?</Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-primary-700 transition shadow-lg shadow-primary-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" /> Giriş Yapılıyor...
                                </>
                            ) : (
                                <>
                                    Giriş Yap <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="text-center mt-8 pt-6 border-t border-slate-100">
                        <p className="text-slate-600">
                            Hesabınız yok mu?{' '}
                            <Link to="/register" className="text-primary-600 font-bold hover:underline">
                                Hemen Kayıt Ol
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
