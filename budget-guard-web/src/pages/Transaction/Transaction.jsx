import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import api from "../../services/api";

export default function Transaction() {

    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadTransactions = async () => {

        try {

            const response = await api.get("/transactions");

            setTransactions(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const loadCategories = async () => {

        try {

            const response = await api.get("/categories");

            setCategories(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const loadData = async () => {

        setLoading(true);

        await Promise.all([
            loadTransactions(),
            loadCategories(),
        ]);

        setLoading(false);

    };

    useEffect(() => {

        loadData();

    }, []);

    return (

        <DashboardLayout>

            <div className="space-y-6">

                <div>

                    <h1 className="text-3xl font-bold text-slate-800">

                        Transaction Management

                    </h1>

                    <p className="text-gray-500">

                        Kelola seluruh transaksi pemasukan dan pengeluaran.

                    </p>

                </div>

                <TransactionForm

                    categories={categories}

                    selectedTransaction={selectedTransaction}

                    setSelectedTransaction={setSelectedTransaction}

                    loadData={loadData}

                />

                <TransactionList

                    transactions={transactions}

                    loading={loading}

                    loadData={loadData}

                    setSelectedTransaction={setSelectedTransaction}

                />

            </div>

        </DashboardLayout>

    );

}