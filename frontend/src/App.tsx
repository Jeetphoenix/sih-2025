import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import FarmRegistration from './pages/FarmRegistration'
import MyFarms from './pages/MyFarms'
import FarmDashboard from './pages/FarmDashboard'
import NearbyFarms from './pages/NearbyFarms'
import RecentVisits from './pages/RecentVisits'
import ScanFarmQR from './pages/ScanFarmQR'
import AdminApprovals from './pages/AdminApprovals'
import AdminFarmManagement from './pages/AdminFarmManagement'
import DiseaseAlerts from './pages/DiseaseAlerts'
import FarmerRegistration from './pages/FarmerRegistration'
import FindSolution from './pages/FindSolution'
import FarmDetails from './pages/FarmDetails'
import VisitorAlerts from './pages/VisitorAlerts'
import GovernmentDashboard from './pages/GovernmentDashboard'
import GovFarmApproval from './pages/Govfarmapproval'
import GovNearbyFarms from './pages/Govnearbyfarm'
import GovFarmDetails from './pages/Govfarmdetails'
import GovScanFarmQR from './pages/GovScanFarmQR'
import GovAlertsPage from './pages/GovAlert'
import VetDashboard from './pages/VetDashboard'
import VetScanFarmQR from './pages/VetScanFarmQR'
import VetAlert from './pages/VetAlert'

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className='min-h-screen bg-gradient-to-br from-green-50 to-blue-50'>
          <Routes>
  <Route path='/' element={<LandingPage />} />
  <Route path='/login/:role' element={<LoginPage />} />
  <Route path='/login/:role/:adminType' element={<LoginPage />} />
  
  {/* Dashboard Routes */}
  <Route path='/dashboard' element={<Dashboard />} />
  <Route path='/farmer/dashboard' element={<Dashboard />} />
  <Route path='/visitor/dashboard' element={<Dashboard />} />
  
  {/* Farmer Routes */}
  <Route path='/farms' element={<MyFarms />} />
  <Route path='/farms/:id' element={<FarmDashboard />} />
  <Route path='/farms/register' element={<FarmRegistration />} />
  <Route path='/farmer/register' element={<FarmerRegistration />} />
  <Route path='/farmer/solutions' element={<FindSolution />} />
  <Route path='/farmer/alerts' element={<DiseaseAlerts />} />
  
  {/* Visitor Routes */}
  <Route path='/visitor/nearby' element={<NearbyFarms />} />
  <Route path='/visitor/recent' element={<RecentVisits />} />
  <Route path='/visitor/scan' element={<ScanFarmQR />} />
  <Route path='/visitor/alerts' element={<VisitorAlerts />} />
  
  {/* Admin Routes */}
  <Route path='/admin/approvals' element={<AdminApprovals />} />
  <Route path='/admin/farms' element={<AdminFarmManagement />} />
  
  {/* Government Official Routes */}
  <Route path="/government/dashboard" element={<GovernmentDashboard />} />
  <Route path="/government/approvals" element={<GovFarmApproval />} />
  <Route path="/government/nearby-farms" element={<GovNearbyFarms />} />
  <Route path="/government/farms/:id" element={<GovFarmDetails />} />
  <Route path="/government/scan-farm" element={<GovScanFarmQR />} />
  <Route path="/government/alerts" element={<GovAlertsPage />} />
  
  {/* Veterinarian Routes */}
  <Route path="/vet/dashboard" element={<VetDashboard />} />
  <Route path="/vet/farms" element={<VetDashboard />} />
  <Route path="/vet/alerts" element={<VetAlert />} />
  <Route path="/vet/scan" element={<VetScanFarmQR />} />
  
  {/* Farm Details */}
  <Route path='/farms/details/:id' element={<FarmDetails />} />
  <Route path='/government/farm-details/:id' element={<GovFarmDetails />} />
</Routes>

        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App