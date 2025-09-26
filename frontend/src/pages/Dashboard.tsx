import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import {
  Home,
  AlertTriangle,
  BookOpen,
  BarChart3,
  Users,
  MapPin,
  TrendingUp,
  LogOut,
  User,
  QrCode,
  Clock
} from 'lucide-react'
import LanguageSelector from '../components/LanguageSelector'

const Dashboard = () => {
  const params = useParams<{ role?: string }>()
  const navigate = useNavigate()
  const { t } = useLanguage()
  
  // Get role from localStorage first, then from URL params
  const role = localStorage.getItem('userRole') || params.role;
  
  // If no role is found, redirect to home
  React.useEffect(() => {
    if (!role) {
      navigate('/');
    }
  }, [role, navigate]);
  
  // If we don't have a role yet, show loading
  if (!role) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const handleLogout = () => {
    navigate('/')
  }

  const handleFeatureClick = (e: React.MouseEvent<HTMLDivElement>, featureTitle: string) => {
    e.preventDefault();
    const userRole = localStorage.getItem('userRole') || role;
    
    // Admin routes
    if (userRole === 'admin' || userRole === 'system') {
      if (featureTitle === t('approvals')) return navigate('/admin/approvals');
      if (featureTitle === t('farmManagement')) return navigate('/admin/farms');
    } 
    // Government official routes
    else if (userRole === 'government') {
      if (featureTitle === t('reportsAnalytics')) return navigate('/government/dashboard');
    }
    // Farmer routes
    else if (userRole === 'farmer') {
      if (featureTitle === t('myFarm') || featureTitle === 'My Farm') return navigate('/farms');
      if (featureTitle === t('diseaseAlerts') || featureTitle === 'Disease Alerts') return navigate('/farmer/alerts');
      if (featureTitle === 'Find Solution' || featureTitle === t('findSolution')) return navigate('/farmer/solutions');
      if (featureTitle === t('training') || featureTitle === 'Training') return alert('Training module coming soon!');
    } 
    // Visitor routes
    else if (userRole === 'visitor') {
      if (featureTitle === t('nearbyFarms') || featureTitle === 'Nearby Farms') return navigate('/visitor/nearby');
      if (featureTitle === t('recentVisits') || featureTitle === t('recentlyVisitedFarms') || featureTitle === 'Recent Visits') return navigate('/visitor/recent');
      if (featureTitle === t('scanQRCode') || featureTitle === t('scanFarmQR') || featureTitle === 'Scan Farm QR') return navigate('/visitor/scan');
      if (featureTitle === 'Alerts') return navigate('/visitor/alerts');
    }
    // Veterinarian routes
    else if (userRole === 'veterinarian') {
      // Add veterinarian specific routes here
      alert(`${featureTitle} feature for veterinarians is coming soon!`);
    }
  };

  const dashboardConfig = {
    admin: {
      title: t('adminDashboard'),
      bgColor: 'bg-blue-500',
      icon: '🛠️',
      features: [
        { icon: Users, title: t('farmManagement'), desc: t('manageAllFarms') },
        { icon: BarChart3, title: t('reportsAnalytics'), desc: t('viewReports') },
        { icon: AlertTriangle, title: t('approvals'), desc: t('reviewRequests') },
        { icon: BookOpen, title: t('trainingModules'), desc: t('manageContent') }
      ]
    },
    farmer: {
      title: t('farmerDashboard'),
      bgColor: 'bg-green-500',
      icon: '👨‍🌾',
      features: [
        { icon: Home, title: t('myFarm'), desc: t('manageFarm') },
        { icon: AlertTriangle, title: t('diseaseAlerts'), desc: t('latestAlerts') },
        { icon: BookOpen, title: t('training'), desc: t('accessModules') },
        { icon: TrendingUp, title: 'Find Solution', desc: 'Get solutions for farming problems' }
      ]
    },
    visitor: {
      title: t('visitorDashboard'),
      bgColor: 'bg-purple-500',
      icon: '👥',
      features: [
        { icon: MapPin, title: t('nearbyFarms'), desc: t('exploreFarms') },
        { icon: Clock, title: t('recentlyVisitedFarms'), desc: t('recentVisitsDesc') },
        { icon: QrCode, title: t('scanFarmQR'), desc: t('scanFarmQRDesc') },
        { icon: AlertTriangle, title: 'Alerts', desc: 'View farm alerts' }
      ]
    }
  }

  const currentConfig = dashboardConfig[role as keyof typeof dashboardConfig] || dashboardConfig.farmer

  return (
    <div className='min-h-screen bg-gray-50'>
    {/* Header */}
    <header className={`${currentConfig.bgColor} text-white shadow-lg`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-4'>
          <div className='flex items-center space-x-3'>
            <span className='text-2xl'>{currentConfig.icon}</span>
            <h1 className='text-xl font-semibold'>{currentConfig.title}</h1>
          </div>
          <div className='flex items-center space-x-3'>
              {/* Language Selector - Compact in Dashboard */}
              <div className="relative">
                <LanguageSelector 
                  variant="compact" 
                  position="inline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 focus:ring-white/50"
                />
              </div>
              
              {/* Welcome Message */}
              <div className='flex items-center space-x-2 text-white'>
                <User className='h-5 w-5' />
                <span className='text-sm'>{t('welcomeBack')}</span>
              </div>
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className='flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg transition-colors text-white border border-white/20'
              >
                <LogOut className='h-4 w-4' />
                <span className='text-sm font-medium'>{t('logout')}</span>
              </button>
            </div>
        </div>
      </div>
    </header>

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className='mb-8'>
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>{t('dashboardOverview')}</h2>
            <p className='text-gray-600'>
              {role === 'admin' && t('adminDescFull')}
              {role === 'farmer' && t('farmerDescFull')}
              {role === 'visitor' && t('visitorDescFull')}
            </p>
          </div>

          {/* Feature Cards */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
            {currentConfig.features.map((feature, index) => {
              const IconComponent = feature.icon
              if (role === 'visitor' && feature.title === 'Alerts') {
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onClick={() => navigate('/visitor/alerts')}
                    className='bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer'
                  >
                    <div className='flex items-center space-x-3 mb-3'>
                      <div className={`${currentConfig.bgColor} text-white p-2 rounded-lg`}>
                        <IconComponent className='h-6 w-6' />
                      </div>
                      <h3 className='font-semibold text-purple-600'>{feature.title}</h3>
                    </div>
                    <p className='text-gray-600 text-sm'>{feature.desc}</p>
                  </motion.div>
                )
              }
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={(e) => handleFeatureClick(e, feature.title)}
                  className='bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer'
                >
                  <div className='flex items-center space-x-3 mb-3'>
                    <div className={`${currentConfig.bgColor} text-white p-2 rounded-lg`}>
                      <IconComponent className='h-6 w-6' />
                    </div>
                    <h3 className='font-semibold text-gray-900'>{feature.title}</h3>
                  </div>
                  <p className='text-gray-600 text-sm'>{feature.desc}</p>
                </motion.div>
              )
            })}
          </div>

          {/* Alerts Section for Visitor removed, now on separate page */}

          {/* Quick Stats */}
          <div className='bg-white rounded-lg shadow-md p-6'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>{t('quickStats')}</h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='text-center'>
                <div className='text-2xl font-bold text-primary-600'>
                  {role === 'admin' && '24'}
                  {role === 'farmer' && '8'}
                  {role === 'visitor' && '12'}
                </div>
                <div className='text-sm text-gray-600'>
                  {role === 'admin' && t('activeFarms')}
                  {role === 'farmer' && t('pendingTasks')}
                  {role === 'visitor' && 'Recently Visited farm'}
                </div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-yellow-600'>
                  {role === 'admin' && '3'}
                  {role === 'farmer' && '2'}
                  {role === 'visitor' && '5'}
                </div>
                <div className='text-sm text-gray-600'>
                  {role === 'admin' && t('pendingApprovals')}
                  {role === 'farmer' && t('activeAlerts')}
                  {role === 'visitor' && t('highRiskFarms')}
                </div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-green-600'>
                  {role === 'admin' && '98%'}
                  {role === 'farmer' && '85%'}
                  {role === 'visitor' && '92%'}
                </div>
                <div className='text-sm text-gray-600'>
                  {role === 'admin' && t('systemHealth')}
                  {role === 'farmer' && t('farmHealthScore')}
                  {role === 'visitor' && t('averageSafetyScore')}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Support & Helpline Footer */}
      <footer className='bg-gray-900 text-white py-6 px-4 mt-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-center sm:text-left'>
            <div className='space-y-2'>
              <h4 className='font-semibold text-green-400 text-sm'>🚨 {t('emergencySupport')}</h4>
              <p className='text-xs'>{t('diseaseAlert')}: <strong className='text-green-400'>1800-123-4567</strong></p>
              <p className='text-xs'>{t('veterinaryEmergency')}: <strong className='text-red-400'>108</strong></p>
            </div>
            <div className='space-y-2'>
              <h4 className='font-semibold text-blue-400 text-sm'>🛠️ {t('technicalSupport')}</h4>
              <p className='text-xs'>Email: <strong className='text-blue-400'>support@digitalfarm.gov.in</strong></p>
              <p className='text-xs'>{t('whatsapp')}: <strong className='text-blue-400'>+91-9876543210</strong></p>
            </div>
            <div className='space-y-2'>
              <h4 className='font-semibold text-yellow-400 text-sm'>👨‍🌾 {t('farmerHelpline')}</h4>
              <p className='text-xs'>{t('helpline')}: <strong className='text-yellow-400'>1551</strong></p>
              <p className='text-xs'>{t('trainingSupport')}: <strong className='text-yellow-400'>1800-HELP-FARM</strong></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Dashboard