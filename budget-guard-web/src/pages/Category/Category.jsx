import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";
import api from "../../services/api";

export default function Category() {

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadCategories = async () => {

        try {

            const response = await api.get("/categories");

            setCategories(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadCategories();

    }, []);

    return (

        <DashboardLayout>

            <div className="space-y-6">

                <div>

                    <h1 className="text-3xl font-bold text-slate-700">

                        Category Management

                    </h1>

                    <p className="text-gray-500">

                        Kelola kategori transaksi.

                    </p>

                </div>

                <CategoryForm
                    selectedCategory={selectedCategory}
                    loadCategories={loadCategories}
                    setSelectedCategory={setSelectedCategory}
                />

                <CategoryList
                    categories={categories}
                    loading={loading}
                    loadCategories={loadCategories}
                    setSelectedCategory={setSelectedCategory}
                />

            </div>

        </DashboardLayout>

    );

}