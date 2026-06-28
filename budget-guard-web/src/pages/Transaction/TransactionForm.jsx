import { useEffect, useState } from 'react'
import api from '../../services/api'

export default function TransactionForm({ categories, selectedTransaction, setSelectedTransaction, loadData }) {
    const [form, setForm] = useState({
        category_id: '',
        type: 'expense',
        amount: '',
        description: '',
        transaction_date: '',
    })

    useEffect(() => {
        if (selectedTransaction) {
            setForm({
                category_id: selectedTransaction.category_id,
                type: selectedTransaction.type,
                amount: selectedTransaction.amount,
                description: selectedTransaction.description || '',
                transaction_date: selectedTransaction.transaction_date,
            })
        } else {
            setForm({
                category_id: '',
                type: 'expense',
                amount: '',
                description: '',
                transaction_date: '',
            })
        }
    }, [selectedTransaction])

    const submit = async (e) => {
        e.preventDefault()

        if (!form.category_id) {
            alert('Pilih kategori terlebih dahulu')
            return
        }

        try {
            if (selectedTransaction) {
                await api.put(`/transactions/${selectedTransaction.id}`, form)
            } else {
                await api.post('/transactions', form)
            }

            await loadData()
            setSelectedTransaction(null)
        } catch (err) {
            console.log(err)
        }
    }

    const cancelEdit = () => setSelectedTransaction(null)

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
                {selectedTransaction ? 'Edit Transaksi' : 'Tambah Transaksi'}
            </h2>
            <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Kategori</label>
                    <select
                        className="w-full border rounded-xl p-3"
                        value={form.category_id}
                        onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                        required
                    >
                        <option value="">Pilih kategori</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Tipe</label>
                    <select
                        className="w-full border rounded-xl p-3"
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                    >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Nominal</label>
                    <input
                        type="number"
                        min="1"
                        className="w-full border rounded-xl p-3"
                        value={form.amount}
                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Tanggal</label>
                    <input
                        type="date"
                        className="w-full border rounded-xl p-3"
                        value={form.transaction_date}
                        onChange={(e) => setForm({ ...form, transaction_date: e.target.value })}
                        required
                    />
                </div>

                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-slate-700">Deskripsi</label>
                    <textarea
                        className="w-full border rounded-xl p-3 min-h-[120px]"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        placeholder="Catatan transaksi (opsional)"
                    />
                </div>

                <div className="md:col-span-2 flex flex-wrap gap-3">
                    <button className="bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700">
                        {selectedTransaction ? 'Update' : 'Simpan'}
                    </button>
                    {selectedTransaction && (
                        <button
                            type="button"
                            onClick={cancelEdit}
                            className="px-5 py-3 rounded-xl border"
                        >
                            Batal
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}
