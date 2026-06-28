import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import BudgetForm from './BudgetForm'
import BudgetList from './BudgetList'
import api from '../../services/api'

export default function Budget() {
    const [budgets, setBudgets] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedBudget, setSelectedBudget] = useState(null)
    const [loading, setLoading] = useState(true)

    const loadBudgets = async () => {
        try {
            const res = await api.get('/budgets')
            setBudgets(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const loadCategories = async () => {
        try {
            const res = await api.get('/categories')
            setCategories(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const loadData = async () => {
        setLoading(true)
        await Promise.all([loadBudgets(), loadCategories()])
        setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Budget Management</h1>
                    <p className="text-gray-500">Kelola batas anggaran untuk setiap kategori.</p>
                </div>

                <BudgetForm
                    categories={categories}
                    selectedBudget={selectedBudget}
                    setSelectedBudget={setSelectedBudget}
                    loadData={loadData}
                />

                <BudgetList
                    budgets={budgets}
                    loading={loading}
                    loadData={loadData}
                    setSelectedBudget={setSelectedBudget}
                />
            </div>
        </DashboardLayout>
    )
}
