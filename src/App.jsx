import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Departments from './pages/Departments'
import DoctorSearch from './pages/DoctorSearch'
import DoctorDetail from './pages/DoctorDetail'
import DepartmentDetail from './pages/DepartmentDetail'
import AppointmentConfirm from './pages/AppointmentConfirm'
import MyAppointments from './pages/MyAppointments'
import HealthHistory from './pages/HealthHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import ForgotPassword from './pages/Auth/ForgotPassword'
import UpdatePassword from './pages/Auth/UpdatePassword'
// Yeni Sayfalar
import AIAssistant from './pages/AIAssistant'
import Prescriptions from './pages/Prescriptions'
import FAQ from './pages/FAQ'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/update-password" element={<UpdatePassword />} />

          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="departments" element={<Departments />} />
            <Route path="departments/:id" element={<DepartmentDetail />} />
            <Route path="doctors" element={<DoctorSearch />} />
            <Route path="doctors/:id" element={<DoctorDetail />} />
            <Route path="appointment-confirm" element={<AppointmentConfirm />} />
            <Route path="my-appointments" element={<MyAppointments />} />
            <Route path="history" element={<HealthHistory />} />
            <Route path="profile" element={<Profile />} />
            <Route path="notifications" element={<Notifications />} />
            {/* Yeni Rotalar */}
            <Route path="ai-assistant" element={<AIAssistant />} />
            <Route path="prescriptions" element={<Prescriptions />} />
            <Route path="faq" element={<FAQ />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
