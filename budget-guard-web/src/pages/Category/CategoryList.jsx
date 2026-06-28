import api from '../../services/api'

export default function CategoryList({ categories, loading, loadCategories, setSelectedCategory }) {
    const deleteCategory = async (id) => {
        if (!confirm('Hapus kategori ini?')) {
            return
        }

        try {
            await api.delete(`/categories/${id}`)
            await loadCategories()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Daftar Kategori</h2>
                <span className="text-sm text-slate-500">{categories.length} kategori</span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-sm text-slate-500 border-b">
                            <th className="py-3">Nama</th>
                            <th>Icon</th>
                            <th className="text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="3" className="py-8 text-center text-slate-500">
                                    Memuat...
                                </td>
                            </tr>
                        ) : categories.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="py-8 text-center text-slate-500">
                                    Belum ada kategori.
                                </td>
                            </tr>
                        ) : (
                            categories.map((category) => (
                                <tr key={category.id} className="border-b hover:bg-slate-50">
                                    <td className="py-3">{category.name}</td>
                                    <td>{category.icon || '-'}</td>
                                    <td className="py-3 text-right space-x-2">
                                        <button
                                            onClick={() => setSelectedCategory(category)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteCategory(category.id)}
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
