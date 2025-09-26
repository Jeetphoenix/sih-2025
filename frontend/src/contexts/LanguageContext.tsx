import React, { createContext, useContext, useState } from 'react'

export type Language = 'en' | 'hi' | 'mr' | 'gu' | 'ta'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Landing Page
    title: 'Digital Farm & Biosecurity Management Platform',
    subtitle: 'Empowering Farmers with Smart Tools',
    selectRole: 'Select your role to continue',
    welcome: 'Welcome back!',
    
    // Roles
    admin: 'Administrator',
    farmer: 'Farmer',
    visitor: 'Visitor',
    adminDesc: 'Manage farms, approvals & reports',
    farmerDesc: 'Tasks, alerts & training modules',
    visitorDesc: 'Learn about farm management',
    
    // Login
    login: 'Login',
    username: 'Username/Phone/Email',
    password: 'Password',
    enterUsername: 'Enter username, phone, or email',
    enterPassword: 'Enter your password',
    forgotPassword: 'Forgot Password?',
    help: 'Help',
    verifyOtp: 'Verify OTP',
    loginWithOtp: 'Login with OTP',
    enterOtp: 'Enter OTP sent to your phone',
    backToPassword: 'Back to password login',
    
    // Role-specific login titles
    adminLogin: 'Administrator Login',
    farmerLogin: 'Farmer Login',
    visitorLogin: 'Visitor Login',
    
    // Dashboard
    dashboardOverview: 'Dashboard Overview',
    adminDashboard: 'Administrator Dashboard',
    farmerDashboard: 'Farmer Dashboard',
    visitorDashboard: 'Visitor Dashboard',
    
    // Dashboard descriptions
    adminDescFull: 'Manage your farming ecosystem and monitor system performance',
    farmerDescFull: 'Monitor your farm health, tasks, and performance metrics',
    visitorDescFull: 'Explore nearby farms and learn about biosecurity practices',
    
    // Feature cards
    farmManagement: 'Farm Management',
    reportsAnalytics: 'Reports & Analytics',
    approvals: 'Approvals',
    trainingModules: 'Training Modules',
    myFarm: 'My Farm',
    diseaseAlerts: 'Disease Alerts',
    training: 'Training',
    farmPerformance: 'Farm Performance',
    nearbyFarms: 'Nearby Farms',
    riskAssessment: 'Risk Assessment',
    learningResources: 'Learning Resources',
    farmDirectory: 'Farm Directory',
    recentlyVisitedFarms: 'Recently Visited Farms',
    scanFarmQR: 'Scan Farm QR',
    
    // Feature descriptions
    manageAllFarms: 'Manage all registered farms',
    viewReports: 'View system-wide reports',
    reviewRequests: 'Review and approve requests',
    manageContent: 'Manage learning content',
    manageFarm: 'Manage your farm details',
    latestAlerts: 'Latest health notifications',
    accessModules: 'Access learning modules',
    viewMetrics: 'View your farm metrics',
    exploreFarms: 'Explore local farms',
    viewScores: 'View farm risk scores',
    educationalContent: 'Access educational content',
    browseListings: 'Browse farm listings',
    recentVisitsDesc: 'See farms you recently checked into',
    scanFarmQRDesc: 'Open scanner to check into a farm',
    
    // Quick stats
    quickStats: 'Quick Stats',
    activeFarms: 'Active Farms',
    pendingTasks: 'Pending Tasks',
    nearbyFarmsCount: 'Nearby Farms',
    pendingApprovals: 'Pending Approvals',
    activeAlerts: 'Active Alerts',
    highRiskFarms: 'High Risk Farms',
    systemHealth: 'System Health',
    farmHealthScore: 'Farm Health Score',
    averageSafetyScore: 'Average Safety Score',
    
    // Support & Helpline
    emergencySupport: 'Emergency Support',
    diseaseAlert: 'Disease Alert',
    veterinaryEmergency: 'Veterinary Emergency',
    available247: 'Available 24/7 for farm emergencies',
    technicalSupport: 'Technical Support',
    whatsapp: 'WhatsApp',
    monSat: 'Mon-Sat: 9 AM - 6 PM',
    farmerHelpline: 'Farmer Helpline',
    helpline: 'Helpline',
    trainingSupport: 'Training Support',
    freeServices: 'Free training & consultation services',
    needHelp: 'Need Help?',
    
    // Footer
    copyright: ' 2024 Digital Farm & Biosecurity Management Platform',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    
    // Logout
    logout: 'Logout',
    welcomeBack: 'Welcome!',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    thaneStaticNote: 'Static visualization of Thane district (demo data)',

    // Disease Alerts (new)
    back: 'Back',
    yourFarm: 'Your Farm',
    yourFarmAlert: 'Your Farm Alert',
    nearbyFarmAlerts: 'Nearby Farm Alerts',
    yourFarmStatusText: 'Current status: High risk (Red). Suggested action: Contact vet and isolate affected animals.',
    nearbyFarmB: 'Nearby Farm B',
    nearbyFarmBStatusText: 'Medium risk (Amber). Increase biosecurity checks and monitor twice daily.',
    regionalNote: 'Regional Note',
    regionalNoteText: 'This page is a static prototype focused on Thane district for demonstration purposes.',
    farmA: 'Farm A',
    farmB: 'Farm B',
    farmC: 'Farm C',

    // My Farms
    myFarms: 'My Farms',
    addFarm: 'Add Farm',
    noFarmsYet: 'No farms yet',
    registerNewFarm: 'Register a new farm to get started',
    viewDetails: 'View Details',

    // Farm Dashboard
    farmDashboard: 'Farm Dashboard',
    welcomeBackUser: 'Welcome back, John Farmer',
    totalLivestock: 'Total Livestock',
    workersLabel: 'Workers',
    todaysProduction: "Today's Production",
    todaysVisitors: "Today's Visitors",
    capacity: 'Capacity',
    dailyLogsTab: 'Daily Logs',
    visitorsTab: 'Visitors',
    analyticsTab: 'Analytics',
    farmQrTab: 'Farm QR',
    vaccinationGivenToday: 'Did vaccination happen today?',
    vaccineNamePlaceholder: 'Vaccine/Medication name',
    batchNumberPlaceholder: 'Batch number',
    unusualBehaviorObserved: 'Any unusual behavior in animals?',
    numberOfAffectedAnimals: 'Number of affected animals',
    describeSymptoms: 'Describe symptoms observed',
    specifyReason: 'Please specify reason',
    dailyLogEntry: 'Daily Log Entry',
    recordTodaysFarm: "Record today's farm activities and livestock status",
    numberOfDeaths: 'Number of Deaths',
    deathReason: 'Death Reason',
    newLivestockAdded: 'New Livestock Added',
    eggsCollected: 'Eggs Collected',
    meatSuppliedKg: 'Meat Supplied (kg)',
    additionalNotes: 'Additional Notes',
    submitDailyLog: 'Submit Daily Log',
    // Farm Dashboard (extras)
    workersHelper: 'Active workers',
    qrCheckIns: 'QR check-ins',
    deathReasonDisease: 'Disease',
    deathReasonPredator: 'Predator',
    deathReasonOther: 'Other',
    additionalNotesPlaceholder: 'Any additional observations...',
    visitorLabel: 'Visitor',
    individual: 'Individual',
    checkedInAt: 'Checked in at',
    today: 'Today',
    recentVisitors: 'Recent Visitors',
    livestockTrends: 'Livestock Trends',
    analyticsPlaceholder: 'Analytics chart would go here',
    productionSummary: 'Production Summary',
    thisWeeksEggs: "This Week's Eggs",
    avgDailyProduction: 'Avg. Daily Production',
    mortalityRate: 'Mortality Rate',
    farmQrCode: 'Farm QR Code',
    qrHelpText: 'Visitors can scan this QR code to check into your farm',
    downloadQrCode: 'Download QR Code',
    allSystemsHealthy: 'All Systems Healthy',
    dailyLogsCalendar: 'Daily Logs Calendar',
    logDetails: 'Log Details',
    dailyMetrics: 'Daily Metrics',
    healthStatus: 'Health Status',
    previousMonth: 'Previous',
    nextMonth: 'Next',
    noAdditionalNotes: 'No additional notes for this day.',

    // Farm Registration
    farmRegistration: 'Farm Registration',
    farmName: 'Farm Name',
    enterFarmName: 'Enter farm name',
    stateLabel: 'State',
    districtLabel: 'District',
    pinLabel: 'PIN',
    pinPlaceholder: 'PIN code',
    gpsCoordinates: 'GPS Coordinates',
    gpsPlaceholder: 'lat, lng',
    useMyLocation: 'Use my location',
    typeOfPoultry: 'Type of Poultry',
    poultryBroiler: 'Broiler',
    poultryLayer: 'Layer',
    poultryBreeder: 'Breeder',
    poultryHatchery: 'Hatchery',
    poultryBackyard: 'Backyard',
    selectType: 'Select type',
    currentFlockSize: 'Current Flock Size',
    farmCapacity: 'Farm Capacity',
    vaccinatedQuestion: 'Are animals vaccinated?',
    lastVaccinatedDate: 'Last Vaccinated Date',
    upcomingVaccinationDate: 'Upcoming Vaccination Date',
    totalWorkers: 'Total number of Workers',
    workerLabel: 'Worker',
    nameLabel: 'Name',
    ageLabel: 'Age',
    roleLabel: 'Role',
    contactInfo: 'Contact Info',
    uploadPhoto: 'Upload Photo',
    cancel: 'Cancel',
    submit: 'Submit',
    yes: 'Yes',
    no: 'No',
    latLongFormat: 'Format: latitude, longitude',

    // Nearby Farms Search
    searchFarms: 'Search Farms',
    searchFarmsSubtitle: 'Find poultry farms by location, type, or capacity',
    farmNameOrLocation: 'Farm name or location...',
    poultryTypeFilter: 'Poultry Type',
    farmSizeFilter: 'Farm Size',
    searchButton: 'Search Farms',
    statusHealthy: 'Healthy',
    statusCaution: 'Caution',
    typeLabel: 'Type',
    capacityLabel: 'Capacity',
    ratingLabel: 'Rating',
    visitFarm: 'Visit Farm',

    // Recent Visits
    recentVisits: 'Recent Visits',
    yourVisitHistory: 'Your farm visit history',
    visitedOn: 'Visited on',
    completedStatus: 'Completed',
    durationLabel: 'Duration',

    // QR Scan
    scanFarmTitle: 'Scan Farm QR',
    scanSubtitle: 'Point your camera at the farm QR to check in',
    openCamera: 'Open Camera',
    switchCamera: 'Switch Camera',
    scanning: 'Scanning…',
    cameraPermissionDenied: 'Camera permission denied. Please enable camera access in your browser settings.',
    cameraNotSupported: 'Camera or Barcode scanning not supported on this device/browser.',
    decodedText: 'Decoded Text',
    goToFarm: 'Go to Farm',

    // Admin Approvals
    approvalsTitle: 'Farm Approvals',
    approvalsSubtitle: 'Review and manage farm registration approvals',
    tabPending: 'Pending',
    tabApproved: 'Approved',
    tabRejected: 'Rejected',
    farmNameLabel: 'Farm Name',
    ownerNameLabel: 'Owner',
    submittedOnLabel: 'Submitted on',
    approveAction: 'Approve',
    rejectAction: 'Reject',

    // Admin Farm Management
    farmMgmtTitle: 'Farm Management',
    farmMgmtSubtitle: 'Search, view, and manage all registered farms',
    filterState: 'State',
    filterTypeLabel: 'Type',
    filterStatus: 'Status',
    resetFilters: 'Reset Filters',
    addFarmAdmin: 'Add Farm',
    colFarm: 'Farm',
    colOwner: 'Owner',
    colType: 'Type',
    colCapacity: 'Capacity',
    colStatus: 'Status',
    colActions: 'Actions',
    viewDetailsAction: 'View Details',
    manageAction: 'Manage',
  },
  hi: {
    // Landing Page
    // ... (rest of the code remains the same)
    yes: 'हाँ',
    no: 'नहीं',
    // ... (rest of the code remains the same)
    dailyLogsCalendar: 'दैनिक लॉग कैलेंडर',
    logDetails: 'लॉग विवरण',
    dailyMetrics: 'दैनिक मेट्रिक्स',
    healthStatus: 'स्वास्थ्य स्थिति',
    previousMonth: 'पिछला',
    nextMonth: 'अगला',
    noAdditionalNotes: 'इस दिन के लिए कोई अतिरिक्त नोट नहीं हैं।',
  },
  mr: {
    // ... (rest of the code remains the same)
    yes: 'होय',
    no: 'नाही',
    // ... (rest of the code remains the same)
    dailyLogsCalendar: 'दैनिक लॉग कॅलेंडर',
    logDetails: 'लॉग तपशील',
    dailyMetrics: 'दैनिक मेट्रिक्स',
    healthStatus: 'आरोग्य स्थिती',
    previousMonth: 'मागील',
    nextMonth: 'पुढील',
    noAdditionalNotes: 'या दिवसासाठी कोणतीही अतिरिक्त नोट्स नाहीत.',
  },
  gu: {
    // ... (rest of the code remains the same)
    yes: 'હા',
    no: 'ના',
    // ... (rest of the code remains the same)
    dailyLogsCalendar: 'દૈનિક લોગ કેલેન્ડર',
    logDetails: 'લોગ વિગતો',
    dailyMetrics: 'દૈનિક મેટ્રિક્સ',
    healthStatus: 'આરોગ્ય સ્થિતિ',
    previousMonth: 'પહેલો',
    nextMonth: 'આગલો',
    noAdditionalNotes: 'આ દિવસ માટે કોઈ વધારાની નોંધો નથી.',
  },
  ta: {
    // ... (rest of the code remains the same)
    yes: 'ஆம்',
    no: 'இல்லை',
    // ... (rest of the code remains the same)
    dailyLogsCalendar: 'தினசரி பதிவு காலண்டர்',
    logDetails: 'பதிவு விவரங்கள்',
    dailyMetrics: 'தினசரி அளவீடுகள்',
    healthStatus: 'உடல்நல நிலை',
    previousMonth: 'முந்தைய',
    nextMonth: 'அடுத்தது',
    noAdditionalNotes: 'இந்த நாளுக்கு கூடுதல் குறிப்புகள் எதுவும் இல்லை.',
    nearbyFarms: 'அருகிலுள்ள பண்ணைகள்',
    riskAssessment: 'ஆபத்து மதிப்பீடு',
    learningResources: 'கற்றல் வளங்கள்',
    farmDirectory: 'பண்ணை அடைவு',
    recentlyVisitedFarms: 'சமீபத்தில் சென்ற பண்ணைகள்',
    scanFarmQR: 'பண்ணை QR ஸ்கேன்',
    
    // Feature descriptions
    manageAllFarms: 'அனைத்து பதிவுசெய்யப்பட்ட பண்ணைகளையும் நிர்வகிக்கவும்',
    viewReports: 'அமைப்பு அளவிலான அறிக்கைகளை பார்க்கவும்',
    reviewRequests: 'கோரிக்கைகளை மறுபரிசீலனை செய்து ஒப்புதல் அளிக்கவும்',
    manageContent: 'கற்றல் உள்ளடக்கத்தை நிர்வகிக்கவும்',
    manageFarm: 'உங்கள் பண்ணை விவரங்களை நிர்வகிக்கவும்',
    latestAlerts: 'சமீபத்திய ஆரோக்கிய அறிவிப்புகள்',
    accessModules: 'கற்றல் தொகுதிகளை அணுகவும்',
    viewMetrics: 'உங்கள் பண்ணை அளவீடுகளை பார்க்கவும்',
    exploreFarms: 'உள்ளூர்ப் பண்ணைகளை ஆராயவும்',
    viewScores: 'பண்ணை ஆபத்து மதிப்பெண்களை பார்க்கவும்',
    educationalContent: 'கல்வி உள்ளடக்கத்தை அணுகவும்',
    browseListings: 'பண்ணை பட்டியல்களை உலாவவும்',
    recentVisitsDesc: 'நீங்கள் சமீபத்தில் செக்-இன் செய்த பண்ணைகளை பார்க்கவும்',
    scanFarmQRDesc: 'பண்ணையில் செக்-இன் செய்ய ஸ்கேனர் திறக்கவும்',

    // Nearby Farms Search (placeholders)
    searchFarms: 'Search Farms',
    searchFarmsSubtitle: 'Find poultry farms by location, type, or capacity',
    farmNameOrLocation: 'Farm name or location...',
    poultryTypeFilter: 'Poultry Type',
    farmSizeFilter: 'Farm Size',
    searchButton: 'Search Farms',
    statusHealthy: 'Healthy',
    statusCaution: 'Caution',
    typeLabel: 'Type',
    capacityLabel: 'Capacity',
    ratingLabel: 'Rating',
    visitFarm: 'Visit Farm',

    // Recent Visits (placeholders)
    recentVisits: 'Recent Visits',
    yourVisitHistory: 'Your farm visit history',
    visitedOn: 'Visited on',
    completedStatus: 'Completed',
    durationLabel: 'Duration',

    // Find Solution Page
    findSolution: 'Find Solution',
    findSolutionDescription: 'Search for solutions to your farming problems with relevant videos and guides',
    searchPlaceholder: 'Search for farming problems or solutions...',
    searching: 'Searching...',
    search: 'Search',
    resultsFor: 'Results for',
    popularSolutions: 'Popular Solutions',
    searchingSolutions: 'Searching for solutions',
    views: 'views',
    watchNow: 'Watch Now',

    // QR Scan (placeholders)
    scanFarmTitle: 'Scan Farm QR',
    scanSubtitle: 'Point your camera at the farm QR to check in',
    openCamera: 'Open Camera',
    switchCamera: 'Switch Camera',
    scanning: 'Scanning…',
    cameraPermissionDenied: 'Camera permission denied. Please enable camera access in your browser settings.',
    cameraNotSupported: 'Camera or Barcode scanning not supported on this device/browser.',
    decodedText: 'Decoded Text',
    goToFarm: 'Go to Farm',

    // Admin Approvals (placeholders)
    approvalsTitle: 'Farm Approvals',
    approvalsSubtitle: 'Review and manage farm registration approvals',
    tabPending: 'Pending',
    tabApproved: 'Approved',
    tabRejected: 'Rejected',
    farmNameLabel: 'Farm Name',
    ownerNameLabel: 'Owner',
    submittedOnLabel: 'Submitted on',
    approveAction: 'Approve',
    rejectAction: 'Reject',
    viewApplication: 'View Application',
    statusPending: 'Pending',
    statusApproved: 'Approved',
    statusRejected: 'Rejected',

    // Admin Farm Management (placeholders)
    farmMgmtTitle: 'Farm Management',
    farmMgmtSubtitle: 'Search, view, and manage all registered farms',
    filterState: 'State',
    filterTypeLabel: 'Type',
    filterStatus: 'Status',
    resetFilters: 'Reset Filters',
    addFarmAdmin: 'Add Farm',
    colFarm: 'Farm',
    colOwner: 'Owner',
    colType: 'Type',
    colCapacity: 'Capacity',
    colStatus: 'Status',
    colActions: 'Actions',
    viewDetailsAction: 'View Details',
    manageAction: 'Manage',
  }
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
