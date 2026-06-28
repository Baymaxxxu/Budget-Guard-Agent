import { useEffect, useState } from 'react'
import { FaWallet, FaMoneyBillAlt, FaMoneyBillWave, FaChartPie } from 'react-icons/fa'

import DashboardLayout from '../components/layout/DashboardLayout'
import SummaryCard from '../components/cards/SummaryCard'
import CategoryChart from '../components/charts/CategoryChart'
import ExpenseChart from '../components/charts/ExpenseChart'
import RecentTransaction from '../components/tables/RecentTransaction'
import RecentBudget from '../components/tables/RecentBudget'
import NotificationCenter from '../components/notifications/NotificationCenter'
import api from '../services/api'

export default function Dashboard() {
    const [dashboard, setDashboard] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadDashboard()
    }, [])

    const loadDashboard = async () => {
        try {
            const res = await api.get('/dashboard')
            setDashboard(res.data)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
                Loading...
            </div>
        )
    }

    const summary = dashboard?.summary || {}
    const categoryChart = dashboard?.category_chart || {}
    const expenseChart = dashboard?.expense_chart || {}

    return (
        <DashboardLayout>
            <div className="grid md:grid-cols-4 gap-6">
                <SummaryCard
                    title="Saldo"
                    value={`Rp ${Number(summary.balance || 0).toLocaleString('id-ID')}`}
                    gradient="bg-emerald-500"
                    icon={<FaWallet />}
                />
                <SummaryCard
                    title="Income"
                    value={`Rp ${Number(summary.income || 0).toLocaleString('id-ID')}`}
                    gradient="bg-blue-500"
                    icon={<FaMoneyBillAlt />}
                />
                <SummaryCard
                    title="Expense"
                    value={`Rp ${Number(summary.expense || 0).toLocaleString('id-ID')}`}
                    gradient="bg-red-500"
                    icon={<FaMoneyBillWave />}
                />
                <SummaryCard
                    title="Budget"
                    value={`Rp ${Number(summary.budget || 0).toLocaleString('id-ID')}`}
                    gradient="bg-purple-500"
                    icon={<FaChartPie />}
                />
            </div>

            <div className="grid xl:grid-cols-3 gap-8 mt-8">
                <div className="xl:col-span-2">
                    <CategoryChart categories={categoryChart} />
                </div>
                <ExpenseChart expenses={expenseChart} />
            </div>

            <div className="grid xl:grid-cols-3 gap-8 mt-8">
                <RecentTransaction transactions={dashboard.recent_transactions || []} />
                <RecentBudget budgets={dashboard.recent_budgets || []} />
                <NotificationCenter notifications={dashboard.notifications || []} />
            </div>
        </DashboardLayout>
    )
}
