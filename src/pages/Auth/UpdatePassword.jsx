import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../supabaseClient'
import { Lock, Loader2, CheckCircle } from 'lucide-react'

const UpdatePassword = () => {
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        // Oturum var mı kontrol et (Linkten gelen kullanıcı oturum açmış sayılır)
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                // Link geçersizse veya oturum yoksa logine at
                navigate('/login', { state: { error: 'Geçersiz veya süresi dolmuş bağlantı.' } })
            }
        })
    }, [])

    const handleUpdate = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            const { error } = await supabase.auth.updateUser({ password })
            if (error) throw error
            navigate('/login', { state: { message: 'Şifreniz başarıyla güncellendi! Yeni şifrenizle giriş yapabilirsiniz.' } })
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
                        <div className="bg-primary-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary-600">
                            <Lock className="w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800">Yeni Şifre Belirle</h1>
                        <p className="text-slate-500 mt-2">Lütfen yeni şifrenizi girin.</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Yeni Şifre</label>
                            <input
                                type="password"
                                required
                                minLength={6}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="En az 6 karakter"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-primary-700 transition shadow-lg disabled:opacity-70"
                        >
                            {loading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : 'Şifreyi Güncelle'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdatePassword
