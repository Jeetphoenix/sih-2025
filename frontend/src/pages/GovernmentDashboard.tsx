import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, CheckCircle, MapPin, AlertTriangle, QrCode } from 'lucide-react';

const GovernmentDashboard = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Government Login</h2>
          <p className="text-gray-600 mb-6">You have been logged out</p>
          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Top Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold flex items-center space-x-2">
            <span className="text-2xl">🚜</span>
            <span>Government Farm Dashboard</span>
          </h1>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm bg-white/20 px-2 py-1 rounded">US ▾</span>
            </div>
            <span className="text-sm">Welcome, Admin!</span>
            <button
              onClick={handleLogout}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Dashboard Overview
          </h2>
          <p className="text-gray-600 mb-8">
            Manage farm approvals and stay updated on local farm activities.
          </p>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => navigate('/government/approvals')}
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 p-4 rounded-full mb-4 group-hover:bg-green-200 transition-colors">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Farm Approvals</h3>
                <p className="text-gray-500 text-sm">
                  Review and manage farm applications
                </p>
              </div>
            </div>

            <div 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => navigate('/government/nearby-farms')}
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-4 rounded-full mb-4 group-hover:bg-blue-200 transition-colors">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Nearby Farms</h3>
                <p className="text-gray-500 text-sm">
                  Explore local farms in your area
                </p>
              </div>
            </div>

            <div 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => navigate('/government/scan-farm')}
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 p-4 rounded-full mb-4 group-hover:bg-purple-200 transition-colors">
                  <QrCode className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Scan Farm QR</h3>
                <p className="text-gray-500 text-sm">
                  Scan a farm's QR code to view details
                </p>
              </div>
            </div>

            <Link to="/government/alerts" className="block">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-red-100 p-4 rounded-full mb-4 group-hover:bg-red-200 transition-colors">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Disease Alerts</h3>
                  <p className="text-gray-500 text-sm">
                    View and manage farm alerts and inspections
                  </p>
                </div>
              </div>
            </Link>

            {/* <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 p-4 rounded-full mb-4 group-hover:bg-purple-200 transition-colors">
                  <QrCode className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Scan Farm QR</h3>
                <p className="text-gray-500 text-sm">
                  Open scanner to check farm details
                </p>
              </div>
            </div> */}
          </div>

          {/* Quick Stats */}
          <div className="bg-white p-6 rounded-xl shadow-md flex justify-around text-center">
            <div>
              <p className="text-blue-600 text-2xl font-bold">25</p>
              <p className="text-gray-500 text-sm">Pending Approvals</p>
            </div>
            <div>
              <p className="text-blue-600 text-2xl font-bold">158</p>
              <p className="text-gray-500 text-sm">Registered Farms</p>
            </div>
            <div>
              <p className="text-blue-600 text-2xl font-bold">3</p>
              <p className="text-gray-500 text-sm">Active Alerts</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-sm text-gray-300 px-6 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Emergency Support */}
          <div>
            <h3 className="flex items-center font-semibold text-red-400 mb-4">
              <span className="mr-2">🚨</span>
              Emergency Support
            </h3>
            <div className="space-y-2">
              <p>
                Disease Alert:{" "}
                <span className="text-red-300 font-medium">1800-123-4567</span>
              </p>
              <p>
                Veterinary Emergency:{" "}
                <span className="text-red-300 font-medium">108</span>
              </p>
            </div>
          </div>

          {/* Technical Support */}
          <div>
            <h3 className="flex items-center font-semibold text-blue-400 mb-4">
              <span className="mr-2">🛠</span>
              Technical Support
            </h3>
            <div className="space-y-2">
              <p>
                Email:{" "}
                <span className="text-blue-300">support@digitalfarm.gov.in</span>
              </p>
              <p>
                WhatsApp: <span className="text-blue-300">+91-9876543210</span>
              </p>
            </div>
          </div>

          {/* Farmer Helpline */}
          <div>
            <h3 className="flex items-center font-semibold text-yellow-400 mb-4">
              <span className="mr-2">👨‍🌾</span>
              Farmer Helpline
            </h3>
            <div className="space-y-2">
              <p>
                Helpline: <span className="text-yellow-300 font-medium">1551</span>
              </p>
              <p>
                Training Support:{" "}
                <span className="text-yellow-300 font-medium">1800-HELP-FARM</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2025 Digital Farm Initiative. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default GovernmentDashboard;