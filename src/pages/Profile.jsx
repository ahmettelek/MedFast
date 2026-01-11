import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { useAuth } from '../context/AuthContext'
import { User, Mail, Phone, FileDigit, Droplet, Save, Trash2, AlertTriangle, Loader2, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const { user, signOut } = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        tc_no: '',
        blood_type: ''
    })

    useEffect(() => {
        if (user) {
            fetchProfile()
        }
    }, [user])

    const fetchProfile = async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single()

            if (data) {
                setFormData({
                    full_name: data.full_name || '',
                    email: user.email || '', // Email Auth'dan gelir
                    phone: data.phone || '',
                    tc_no: data.tc_no || '',
                    blood_type: data.blood_type || ''
                })
            }
        } catch (error) {
            console.error('Profil yüklenirken hata:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSave = async (e) => {
        e.preventDefault()
        setSaving(true)
        try {
            const updates = {
                id: user.id,
                full_name: formData.full_name,
                phone: formData.phone,
                tc_no: formData.tc_no,
                blood_type: formData.blood_type,
                updated_at: new Date(),
            }

            const { error } = await supabase.from('profiles').upsert(updates)
            if (error) throw error
            alert('Profil başarıyla güncellendi!')
        } catch (error) {
            alert('Hata: ' + error.message)
        } finally {
            setSaving(false)
        }
    }

    const handleSignOut = async () => {
        await signOut()
        navigate('/login', { state: { message: 'Başarıyla çıkış yaptınız. Görüşmek üzere!' } })
    }

    const handleDeleteAccount = async () => {
        if (!confirm('DİKKAT! Hesabınızı silmek istediğinize emin misiniz? Bu işlem geri alınamaz ve tüm randevularınız iptal edilir.')) return

        setDeleting(true)
        try {
            // Önce ilişkili verileri temizle (Cascade yoksa manuel)
            await supabase.from('appointments').delete().eq('user_id', user.id)
            await supabase.from('notifications').delete().eq('user_id', user.id)
            await supabase.from('prescriptions').delete().eq('user_id', user.id)

            // Sonra profili sil
            const { error: profileError } = await supabase.from('profiles').delete().eq('id', user.id)
            if (profileError) throw profileError

            // Son olarak çıkış yap
            await signOut()
            navigate('/login', { state: { message: 'Hesabınız başarıyla silindi. Sizi özleyeceğiz!' } })
        } catch (error) {
            console.error(error)
            alert('Hesap silinirken bir hata oluştu: ' + error.message)
            setDeleting(false)
        }
    }

    if (loading) return <div className="text-center p-10">Profil yükleniyor...</div>

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                    <User className="w-8 h-8 text-primary-600" />
                    Profil Ayarları
                </h2>
                <button
                    onClick={handleSignOut}
                    className="text-red-600 font-medium hover:bg-red-50 px-4 py-2 rounded-lg transition flex items-center gap-2"
                >
                    <LogOut className="w-5 h-5" />
                    Çıkış Yap
                </button>
            </div>

            <form onSubmit={handleSave} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 md:p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Ad Soyad</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    placeholder="Adınız Soyadınız"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">E-posta (Değiştirilemez)</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    disabled
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Telefon</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    placeholder="05XX XXX XX XX"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">TC Kimlik No</label>
                            <div className="relative">
                                <FileDigit className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    name="tc_no"
                                    maxLength="11"
                                    value={formData.tc_no}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    placeholder="11 Haneli TC No"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Kan Grubu</label>
                            <div className="relative">
                                <Droplet className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <select
                                    name="blood_type"
                                    value={formData.blood_type}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white"
                                >
                                    <option value="">Seçiniz</option>
                                    <option value="A RH+">A RH+</option>
                                    <option value="A RH-">A RH-</option>
                                    <option value="B RH+">B RH+</option>
                                    <option value="B RH-">B RH-</option>
                                    <option value="AB RH+">AB RH+</option>
                                    <option value="AB RH-">AB RH-</option>
                                    <option value="0 RH+">0 RH+</option>
                                    <option value="0 RH-">0 RH-</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 px-6 py-4 flex justify-end border-t border-slate-100">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-primary-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition flex items-center gap-2 shadow-sm disabled:opacity-70"
                    >
                        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        Değişiklikleri Kaydet
                    </button>
                </div>
            </form>

            <div className="bg-red-50 rounded-xl border border-red-100 p-6 md:p-8">
                <div className="flex items-start gap-4">
                    <div className="bg-red-100 p-3 rounded-full text-red-600 flex-shrink-0">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-red-700">Tehlikeli Bölge</h3>
                        <p className="text-red-600/80 mt-1 max-w-xl text-sm leading-relaxed">
                            Hesabınızı sildiğinizde tüm kişisel verileriniz, randevu geçmişiniz ve sağlık kayıtlarınız sistemden kalıcı olarak silinecektir. Bu işlem geri alınamaz.
                        </p>
                        <button
                            onClick={handleDeleteAccount}
                            disabled={deleting}
                            className="mt-6 bg-white text-red-600 border border-red-200 px-6 py-2.5 rounded-lg font-bold hover:bg-red-600 hover:text-white hover:border-red-600 transition flex items-center gap-2 shadow-sm"
                        >
                            {deleting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                            Hesabımı Sil
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
