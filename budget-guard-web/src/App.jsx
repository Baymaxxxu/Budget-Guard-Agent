import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Budget from './pages/Budget/Budget'
import Category from './pages/Category/Category'
import Transaction from './pages/Transaction/Transaction'
import Notifications from './pages/Notifications'

import ProtectedRoute from './routes/ProtectedRoute'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/budgets"
                    element={
                        <ProtectedRoute>
                            <Budget />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/transactions"
                    element={
                        <ProtectedRoute>
                            <Transaction />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/categories"
                    element={
                        <ProtectedRoute>
                            <Category />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/notifications"
                    element={
                        <ProtectedRoute>
                            <Notifications />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App