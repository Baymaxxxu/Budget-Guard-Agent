import api from '../../services/api'

export default function BudgetList({ budgets, loading, loadData, setSelectedBudget }) {
    const deleteBudget = async (id) => {
        if (!confirm('Hapus budget ini?')) {
            return
        }

        try {
            await api.delete(`/budgets/${id}`)
            await loadData()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Daftar Budget</h2>
                <span className="text-sm text-slate-500">{budgets.length} budget</span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-sm text-slate-500 border-b">
                            <th className="py-3">Kategori</th>
                            <th>Bulan</th>
                            <th className="text-right">Limit</th>
                            <th className="text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="py-8 text-center text-slate-500">
                                    Memuat...
                                </td>
                            </tr>
                        ) : budgets.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="py-8 text-center text-slate-500">
                                    Belum ada budget.
                                </td>
                            </tr>
                        ) : (
                            budgets.map((item) => (
                                <tr key={item.id} className="border-b hover:bg-slate-50">
                                    <td className="py-3">{item.category?.name}</td>
                                    <td>{item.month}/{item.year}</td>
                                    <td className="text-right font-semibold">
                                        Rp {Number(item.limit_amount).toLocaleString('id-ID')}
                                    </td>
                                    <td className="text-right space-x-3">
                                        <button
                                            onClick={() => setSelectedBudget(item)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteBudget(item.id)}
                                            className="text-red-600 hover:underline"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
