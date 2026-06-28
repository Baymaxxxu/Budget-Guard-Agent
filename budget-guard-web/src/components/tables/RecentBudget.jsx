export default function RecentBudget({ budgets }) {

    const rupiah = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    });

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6">

            <div className="flex justify-between items-center mb-5">

                <h2 className="text-xl font-bold text-slate-700">

                    Recent Budget

                </h2>

                <span className="text-sm text-gray-500">

                    {budgets.length} Data

                </span>

            </div>

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="text-left py-3">Kategori</th>

                            <th className="text-left">Periode</th>

                            <th className="text-right">Limit</th>

                        </tr>

                    </thead>

                    <tbody>

                        {budgets.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="3"
                                    className="text-center py-8 text-gray-400"
                                >

                                    Belum ada budget.

                                </td>

                            </tr>

                        ) : (

                            budgets.map((item) => (

                                <tr
                                    key={item.id}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="py-3">

                                        {item.category?.name}

                                    </td>

                                    <td>

                                        {item.month}/{item.year}

                                    </td>

                                    <td className="text-right font-semibold">

                                        {rupiah.format(item.limit_amount)}

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}