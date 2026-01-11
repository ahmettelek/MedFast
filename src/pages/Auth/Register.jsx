import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../supabaseClient'
import { Stethoscope, User, Mail, Lock, Loader2, CheckCircle } from 'lucide-react'
import { addNotification } from '../../utils/notificationUtils'

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { signUp } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            return setError('Şifreler eşleşmiyor.')
        }
        setLoading(true)
        setError(null)

        try {
            // 1. Auth Kaydı
            const { data, error: authError } = await signUp({
                email: formData.email,
                password: formData.password
            })

            if (authError) throw authError

            // 2. Profil Kaydı
            if (data.user) {
                await supabase
                    .from('profiles')
                    .upsert([{
                        id: data.user.id,
                        email: formData.email,
                        full_name: formData.fullName
                    }])

                // HOŞ GELDİN BİLDİRİMİ
                await addNotification({
                    userId: data.user.id,
                    title: 'MedFast`e Hoş Geldiniz!',
                    message: `Sayın ${formData.fullName}, MedFast ailesine hoş geldiniz. Profilinizi tamamlayarak hızlıca randevu alabilirsiniz.`,
                    type: 'system'
                });
            }

            // 3. Basit Yönlendirme (Kullanıcı İsteği Üzerine)
            // Otomatik giriş yok, mail uyarısı yok. Direkt Login'e atıyoruz.
            navigate('/login', {
                state: {
                    message: 'Kayıt başarılı! Lütfen giriş yapınız.'
                }
            })

        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-slate-800">Hesap Oluştur</h1>
                        <p className="text-slate-500 mt-2">MedFast ailesine katılın</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Ad Soyad</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    name="fullName"
                                    required
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    placeholder="Ahmet Yılmaz"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">E-posta</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    placeholder="ornek@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Şifre</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    autoComplete="new-password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    placeholder="En az 6 karakter"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Şifre Tekrar</label>
                            <div className="relative">
                                <CheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    required
                                    autoComplete="new-password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    placeholder="Şifreyi onaylayın"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-primary-700 transition shadow-lg mt-2 disabled:opacity-70"
                        >
                            {loading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : 'Kayıt Ol'}
                        </button>
                    </form>

                    <div className="text-center mt-6 pt-6 border-t border-slate-100">
                        <p className="text-slate-600">
                            Zaten hesabınız var mı?{' '}
                            <Link to="/login" className="text-primary-600 font-bold hover:underline">
                                Giriş Yap
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
