import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, Star, ArrowLeft } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import LanguageSelector from '../components/LanguageSelector'

interface FarmItem {
  id: string
  name: string
  location: string
  type: string
  capacity: number
  rating: number
  status: 'Healthy' | 'Caution'
}

const MOCK_FARMS: FarmItem[] = [
  { id: '1', name: 'Green Valley Poultry Farm', location: 'Agriculture City, State', type: 'Layer Chickens', capacity: 1500, rating: 4.8, status: 'Healthy' },
  { id: '2', name: 'Sunrise Egg Farm', location: 'Farm District, State', type: 'Mixed Poultry', capacity: 2000, rating: 4.5, status: 'Caution' },
  { id: '3', name: 'Heritage Broiler Farm', location: 'Rural County, State', type: 'Broiler Chickens', capacity: 800, rating: 4.9, status: 'Healthy' }
]

const NearbyFarms: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useLanguage()

  const [query, setQuery] = useState('')
  const [type, setType] = useState('')
  const [size, setSize] = useState('')

  const filtered = useMemo(() => {
    return MOCK_FARMS.filter(f => {
      const matchesQuery = query
        ? f.name.toLowerCase().includes(query.toLowerCase()) || f.location.toLowerCase().includes(query.toLowerCase())
        : true
      const matchesType = type ? f.type.toLowerCase().includes(type.toLowerCase()) : true
      const matchesSize = size
        ? size === 'small' ? f.capacity < 1000 : size === 'medium' ? f.capacity >= 1000 && f.capacity < 2000 : f.capacity >= 2000
        : true
      return matchesQuery && matchesType && matchesSize
    })
  }, [query, type, size])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20" aria-label="Back">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-semibold">{t('nearbyFarms')}</h1>
          </div>
          <LanguageSelector variant="compact" position="inline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Search Panel */}
        <section className="bg-white rounded-xl shadow-sm p-4 border">
          <div className="flex items-center gap-2 text-gray-800 font-semibold mb-2">
            <Search className="h-5 w-5" />
            <span>{t('searchFarms')}</span>
          </div>
          <p className="text-sm text-gray-500 mb-4">{t('searchFarmsSubtitle')}</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('farmNameOrLocation')}
              className="md:col-span-2 w-full px-4 py-3 rounded-lg border border-gray-300"
            />
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300">
              <option value="">{t('poultryTypeFilter')}</option>
              <option value="broiler">{t('poultryBroiler')}</option>
              <option value="layer">{t('poultryLayer')}</option>
              <option value="mixed">Mixed</option>
            </select>
            <select value={size} onChange={(e) => setSize(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300">
              <option value="">{t('farmSizeFilter')}</option>
              <option value="small">Small (&lt; 1000)</option>
              <option value="medium">Medium (1000-1999)</option>
              <option value="large">Large (2000+)</option>
            </select>
            <div className="md:col-span-4">
              <button className="w-full px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700">{t('searchButton')}</button>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filtered.map((farm) => (
            <div key={farm.id} className="bg-white rounded-xl shadow-md border border-blue-100 overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="h-28 bg-blue-50 flex items-center justify-center text-blue-200"><MapPin className="h-8 w-8" /></div>
              <div className="p-4 border-t border-blue-50">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900">{farm.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${farm.status === 'Healthy' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {farm.status === 'Healthy' ? t('statusHealthy') : t('statusCaution')}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{farm.location}</p>
                <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-gray-700">
                  <div>
                    <div className="text-gray-500">{t('typeLabel')}:</div>
                    <div className="font-medium">{farm.type}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">{t('capacityLabel')}:</div>
                    <div className="font-medium">{farm.capacity}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">{farm.rating}</span>
                    <span className="text-gray-500">{t('ratingLabel')}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <button 
                    onClick={() => navigate(`/government/farm-details/${farm.id}`)} 
                    className="w-full px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
                  >
                    {t('viewDetails')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}

export default NearbyFarms
