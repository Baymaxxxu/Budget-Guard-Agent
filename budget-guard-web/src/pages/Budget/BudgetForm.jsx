import { useEffect, useState } from 'react'
import api from '../../services/api'

const monthOptions = [
    { value: '', label: 'Pilih bulan' },
    { value: 1, label: 'Januari' },
    { value: 2, label: 'Februari' },
    { value: 3, label: 'Maret' },
    { value: 4, label: 'April' },
    { value: 5, label: 'Mei' },
    { value: 6, label: 'Juni' },
    { value: 7, label: 'Juli' },
    { value: 8, label: 'Agustus' },
    { value: 9, label: 'September' },
    { value: 10, label: 'Oktober' },
    { value: 11, label: 'November' },
    { value: 12, label: 'Desember' },
]

export default function BudgetForm({ categories, selectedBudget, setSelectedBudget, loadData }) {
    const [form, setForm] = useState({
        category_id: '',
        limit_amount: '',
        month: '',
        year: '',
    })

    useEffect(() => {
        if (selectedBudget) {
            setForm({
                category_id: selectedBudget.category_id,
                limit_amount: selectedBudget.limit_amount,
                month: selectedBudget.month,
                year: selectedBudget.year,
            })
        } else {
            setForm({ category_id: '', limit_amount: '', month: '', year: '' })
        }
    }, [selectedBudget])

    const submit = async (e) => {
        e.preventDefault()

        try {
            if (selectedBudget) {
                await api.put(`/budgets/${selectedBudget.id}`, {
                    limit_amount: form.limit_amount,
                })
            } else {
                await api.post('/budgets', form)
            }

            await loadData()
            setSelectedBudget(null)
            setForm({ category_id: '', limit_amount: '', month: '', year: '' })
        } catch (err) {
            console.log(err)
        }
    }

    const cancelEdit = () => setSelectedBudget(null)

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
                {selectedBudget ? 'Edit Budget' : 'Tambah Budget'}
            </h2>
            <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Kategori</label>
                    <select
                        className="w-full border rounded-xl p-3"
                        required
                        disabled={Boolean(selectedBudget)}
                        value={form.category_id}
                        onChange={(e) => setForm({ ...form, category_id: e.target.value })}
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
                    <label className="block text-sm font-medium text-slate-700">Bulan</label>
                    <select
                        className="w-full border rounded-xl p-3"
                        required
                        disabled={Boolean(selectedBudget)}
                        value={form.month}
                        onChange={(e) => setForm({ ...form, month: e.target.value })}
                    >
                        {monthOptions.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Tahun</label>
                    <input
                        type="number"
                        min="2023"
                        className="w-full border rounded-xl p-3"
                        required
                        disabled={Boolean(selectedBudget)}
                        value={form.year}
                        onChange={(e) => setForm({ ...form, year: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Limit Anggaran</label>
                    <input
                        type="number"
                        min="1"
                        className="w-full border rounded-xl p-3"
                        required
                        value={form.limit_amount}
                        onChange={(e) => setForm({ ...form, limit_amount: e.target.value })}
                    />
                </div>
                <div className="md:col-span-2 flex flex-wrap gap-3">
                    <button className="bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700">
                        {selectedBudget ? 'Update' : 'Simpan'}
                    </button>
                    {selectedBudget && (
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
