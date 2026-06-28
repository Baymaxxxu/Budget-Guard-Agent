import { NavLink } from 'react-router-dom'
import {
    FaHome,
    FaWallet,
    FaMoneyBillWave,
    FaTags,
    FaBell,
} from 'react-icons/fa'

export default function Sidebar() {
    const menus = [
        { title: 'Dashboard', icon: <FaHome />, path: '/dashboard' },
        { title: 'Budget', icon: <FaWallet />, path: '/budgets' },
        { title: 'Transactions', icon: <FaMoneyBillWave />, path: '/transactions' },
        { title: 'Categories', icon: <FaTags />, path: '/categories' },
        { title: 'Notifications', icon: <FaBell />, path: '/notifications' },
    ]

    return (
        <div className="w-64 min-h-screen bg-indigo-950 text-white shadow-xl">
            <div className="p-7">
                <h1 className="text-3xl font-bold">?? Budget Guard</h1>
            </div>

            <div className="space-y-2">
                {menus.map((menu, index) => (
                    <NavLink
                        key={index}
                        to={menu.path}
                        end
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-7 py-4 rounded-r-3xl transition duration-200 ${
                                isActive ? 'bg-indigo-800 text-white' : 'text-gray-200 hover:bg-indigo-800'
                            }`
                        }
                    >
                        {menu.icon}
                        <span>{menu.title}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}
