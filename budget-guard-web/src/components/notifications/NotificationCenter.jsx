import { FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";

export default function NotificationCenter({ notifications }) {

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6">

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-xl font-bold text-slate-700">

                    Notification Center

                </h2>

                <span className="text-sm text-gray-500">

                    {notifications.length} Notification

                </span>

            </div>

            {

                notifications.length === 0 ?

                (

                    <div className="text-center py-8 text-gray-400">

                        🎉 Tidak ada notifikasi.

                    </div>

                )

                :

                (

                    <div className="space-y-4">

                        {

                            notifications.map((item,index)=>(

                                <div

                                    key={index}

                                    className={`rounded-xl p-4 border-l-4 flex gap-4 items-start

                                    ${

                                        item.type==="danger"

                                        ?

                                        "bg-red-50 border-red-500"

                                        :

                                        "bg-yellow-50 border-yellow-500"

                                    }

                                    `}

                                >

                                    <div className="text-2xl mt-1">

                                        {

                                            item.type==="danger"

                                            ?

                                            <FaTimesCircle className="text-red-500"/>

                                            :

                                            <FaExclamationTriangle className="text-yellow-500"/>

                                        }

                                    </div>

                                    <div className="flex-1">

                                        <h3 className="font-semibold text-slate-700">

                                            {item.category}

                                        </h3>

                                        <p className="text-gray-600 mt-1">

                                            {item.message}

                                        </p>

                                        <div className="text-sm text-gray-500 mt-2">

                                            Pengeluaran :

                                            <strong>

                                                {" "}Rp {Number(item.spent).toLocaleString("id-ID")}

                                            </strong>

                                            {" / "}

                                            Limit :

                                            <strong>

                                                Rp {Number(item.limit).toLocaleString("id-ID")}

                                            </strong>

                                        </div>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

}