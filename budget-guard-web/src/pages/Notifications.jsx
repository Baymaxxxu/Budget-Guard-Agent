import { useEffect, useState } from 'react'
import DashboardLayout from '../components/layout/DashboardLayout'
import api from '../services/api'

export default function Notifications() {
    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(true)

    const loadNotifications = async () => {
        try {
            const res = await api.get('/notifications')
            setNotifications(res.data)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadNotifications()
    }, [])

    const markRead = async (id) => {
        try {
            await api.patch(`/notifications/${id}/read`)
            await loadNotifications()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Notifikasi</h1>
                    <p className="text-gray-500">Lihat dan tandai notifikasi sebagai dibaca.</p>
                </div>
                <div className="bg-white rounded-3xl p-6 shadow-sm">
                    {loading ? (
                        <div className="py-10 text-center text-slate-500">Memuat notifikasi...</div>
                    ) : notifications.length === 0 ? (
                        <div className="py-10 text-center text-slate-500">Belum ada notifikasi.</div>
                    ) : (
                        <div className="space-y-4">
                            {notifications.map((item) => (
                                <div
                                    key={item.id}
                                    className={`rounded-3xl border p-4 ${
                                        item.is_read ? 'bg-slate-50 border-slate-200' : 'bg-white border-indigo-200'
                                    }`}
                                >
                                    <div className="flex flex-wrap justify-between gap-4 items-center mb-3">
                                        <div>
                                            <h2 className="text-lg font-semibold">{item.title}</h2>
                                            <p className="text-sm text-slate-500">{item.type}</p>
                                        </div>
                                        <button
                                            onClick={() => markRead(item.id)}
                                            className="text-indigo-600 hover:underline"
                                        >
                                            Tandai dibaca
                                        </button>
                                    </div>
                                    <p className="text-slate-600">{item.message}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}
