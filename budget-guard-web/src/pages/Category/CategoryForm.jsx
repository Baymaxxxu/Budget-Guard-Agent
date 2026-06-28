import { useEffect, useState } from 'react'
import api from '../../services/api'

export default function CategoryForm({ selectedCategory, loadCategories, setSelectedCategory }) {
    const [name, setName] = useState('')
    const [icon, setIcon] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (selectedCategory) {
            setName(selectedCategory.name)
            setIcon(selectedCategory.icon || '')
        } else {
            setName('')
            setIcon('')
        }
    }, [selectedCategory])

    const submit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            if (selectedCategory) {
                await api.put(`/categories/${selectedCategory.id}`, { name, icon })
            } else {
                await api.post('/categories', { name, icon })
            }

            await loadCategories()
            setSelectedCategory(null)
            setName('')
            setIcon('')
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const cancelEdit = () => setSelectedCategory(null)

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
                {selectedCategory ? 'Edit Category' : 'Tambah Kategori'}
            </h2>
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700">Nama Kategori</label>
                    <input
                        className="mt-2 w-full border rounded-xl p-3"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700">Icon (opsional)</label>
                    <input
                        className="mt-2 w-full border rounded-xl p-3"
                        value={icon}
                        onChange={(e) => setIcon(e.target.value)}
                        placeholder="e.g. fa-shopping-bag"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700"
                    >
                        {selectedCategory ? 'Update' : 'Simpan'}
                    </button>
                    {selectedCategory && (
                        <button
                            type="button"
                            onClick={cancelEdit}
                            className="text-slate-600 px-4 py-3 rounded-xl border"
                        >
                            Batal
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}
