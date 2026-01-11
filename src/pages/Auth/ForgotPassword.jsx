import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../supabaseClient'
import { KeyRound, Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-react'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const { resetPassword } = useAuth()

    const handleReset = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            // 1. Önce böyle bir kullanıcı var mı kontrol et
            const { data } = await supabase
                .from('profiles')
                .select('email')
                .eq('email', email)
                .single() // Eğer kayıt yoksa null döner veya hata fırlatır (Supabase versiyonuna göre)

            // data null ise veya data.error varsa
            if (!data) {
                throw new Error('Bu e-posta adresiyle kayıtlı bir kullanıcı bulunamadı.')
            }

            // 2. Varsa sıfırlama maili gönder
            const { error } = await resetPassword(email)
            if (error) throw error
            setSuccess(true)
        } catch (error) {
            // Supabase 'row not found' hatası da döndürebilir, onu anlamlı mesaja çevirelim
            if (error.code === 'PGRST116') { // Single row not found code
                setError('Bu e-posta adresiyle kayıtlı bir kullanıcı bulunamadı.')
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
                            <KeyRound className="w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800">Şifremi Unuttum</h1>
                        <p className="text-slate-500 mt-2">Endişelenmeyin, hesabınızı kurtaralım.</p>
                    </div>

                    {success ? (
                        <div className="text-center space-y-6 animate-fade-in">
                            <div className="bg-green-50 text-green-700 p-6 rounded-xl border border-green-100">
                                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                                <h3 className="font-bold text-lg">E-posta Gönderildi!</h3>
                                <p className="text-sm mt-2">
                                    Lütfen <strong>{email}</strong> adresini kontrol edin. Şifrenizi sıfırlamanız için bir bağlantı gönderdik.
                                </p>
                            </div>
                            <Link to="/login" className="inline-flex items-center gap-2 text-slate-600 hover:text-primary-600 font-medium transition">
                                <ArrowLeft className="w-4 h-4" /> Giriş sayfasına dön
                            </Link>
                        </div>
                    ) : (
                        <>
                            {error && (
                                <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm mb-6 flex items-start gap-2">
                                    <div className="mt-0.5">⚠️</div>
                                    <div>{error}</div>
                                </div>
                            )}

                            <form onSubmit={handleReset} className="space-y-6">
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

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-primary-700 transition shadow-lg shadow-primary-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" /> Gönderiliyor...
                                        </>
                                    ) : (
                                        'Sıfırlama Bağlantısı Gönder'
                                    )}
                                </button>
                            </form>

                            <div className="text-center mt-8 pt-6 border-t border-slate-100">
                                <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center justify-center gap-2">
                                    <ArrowLeft className="w-4 h-4" /> Giriş Ekranına Dön
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
