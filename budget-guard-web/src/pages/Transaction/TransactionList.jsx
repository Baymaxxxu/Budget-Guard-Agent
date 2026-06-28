import api from '../../services/api'

export default function TransactionList({ transactions, loading, loadData, setSelectedTransaction }) {
    const deleteTransaction = async (id) => {
        if (!confirm('Hapus transaksi ini?')) {
            return
        }

        try {
            await api.delete(`/transactions/${id}`)
            await loadData()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Daftar Transaksi</h2>
                <span className="text-sm text-slate-500">{transactions.length} transaksi</span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-sm text-slate-500 border-b">
                            <th className="py-3">Tanggal</th>
                            <th>Kategori</th>
                            <th>Tipe</th>
                            <th className="text-right">Nominal</th>
                            <th className="text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="py-8 text-center text-slate-500">
                                    Memuat...
                                </td>
                            </tr>
                        ) : transactions.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="py-8 text-center text-slate-500">
                                    Belum ada transaksi.
                                </td>
                            </tr>
                        ) : (
                            transactions.map((item) => (
                                <tr key={item.id} className="border-b hover:bg-slate-50">
                                    <td className="py-3">{item.transaction_date}</td>
                                    <td>{item.category?.name}</td>
                                    <td>
                                        <span className={`px-3 py-1 rounded-full text-xs text-white ${
                                            item.type === 'income' ? 'bg-green-500' : 'bg-red-500'
                                        }`}>
                                            {item.type}
                                        </span>
                                    </td>
                                    <td className="text-right font-semibold">
                                        Rp {Number(item.amount).toLocaleString('id-ID')}
                                    </td>
                                    <td className="text-right space-x-3">
                                        <button
                                            onClick={() => setSelectedTransaction(item)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteTransaction(item.id)}
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
