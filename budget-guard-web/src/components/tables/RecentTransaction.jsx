export default function RecentTransaction({ transactions }) {

    const rupiah = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    });

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6">

            <div className="flex justify-between items-center mb-5">

                <h2 className="text-xl font-bold text-slate-700">

                    Recent Transactions

                </h2>

                <span className="text-sm text-gray-500">

                    {transactions.length} Data

                </span>

            </div>

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="text-left py-3">Tanggal</th>

                            <th className="text-left">Kategori</th>

                            <th className="text-left">Tipe</th>

                            <th className="text-right">Nominal</th>

                        </tr>

                    </thead>

                    <tbody>

                        {transactions.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="4"
                                    className="text-center py-8 text-gray-400"
                                >

                                    Belum ada transaksi.

                                </td>

                            </tr>

                        ) : (

                            transactions.map((item) => (

                                <tr
                                    key={item.id}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="py-3">

                                        {item.transaction_date}

                                    </td>

                                    <td>

                                        {item.category?.name}

                                    </td>

                                    <td>

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs text-white ${
                                                item.type === "income"
                                                    ? "bg-green-500"
                                                    : "bg-red-500"
                                            }`}
                                        >

                                            {item.type}

                                        </span>

                                    </td>

                                    <td className="text-right font-semibold">

                                        {rupiah.format(item.amount)}

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