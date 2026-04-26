import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import DashboardLayout from './layouts/DashboardLayout'
import LandingLayout from './layouts/LandingLayout'

import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import UploadPage from './pages/UploadPage'
import CallDetailPage from './pages/CallDetailPage'
import AnalyticsPage from './pages/AnalyticsPage'
import SettingsPage from './pages/SettingsPage'
import SignupPage from './pages/SignupPage'
import SignInPage from './pages/SignInPage'
import AuditLogsPage from './pages/AuditLogsPage'
import TopologyPage from './pages/TopologyPage'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ai-sales-theme">
      <Router>
        <Routes>
          {/* Public Views */}
          <Route element={<LandingLayout />}>
            <Route path="/" element={<LandingPage />} />
          </Route>
          
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SignInPage />} />
          
          {/* App Views */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/logs" element={<AuditLogsPage />} />
            <Route path="/topology" element={<TopologyPage />} />
            <Route path="/call/:id" element={<CallDetailPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
