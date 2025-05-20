import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import ReportItem from "./pages/ReportItem"
import SearchItems from "./pages/SearchItems"
import ReportDetails from "./pages/ReportDetails"
import MyReports from "./pages/MyReports"
import MyRequests from "./pages/MyRequests"
import RequestDetails from "./pages/RequestDetails"
import Layout from "./components/layout/Layout"
import { AuthProvider } from "./context/AuthContext"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import Home from "./pages/Home"
import AboutPage from "./pages/AboutPage"
import CampusListPage from "./pages/CampusListPage"
import ContactPage from "./pages/ContactPage"
import TermsPage from "./pages/TermsPage"
import PrivacyPage from "./pages/PrivacyPage"
import HomePage from "./pages/HomePage"
import ProtectedRoute from "./components/common/ProtectedRoute"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/how-it-works" element={<Abou} */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
<Route path="/how-it-works" element={<AboutPage/>} />
          <Route path="/campus-list" element={<CampusListPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          {/* Protected Routes */}
          <Route 
            element={
  
      <Layout />
   
  }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/report-item" element={<ReportItem />} />
            <Route path="/my-reports" element={<MyReports />} />
            <Route path="/search" element={<SearchItems />} />
            <Route path="/reports/:id" element={<ReportDetails />} />
            <Route path="/my-requests" element={<MyRequests />} />
            <Route path="/requests/:id" element={<RequestDetails />} />
          </Route>

          {/* Redirect all unknown routes to home */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
