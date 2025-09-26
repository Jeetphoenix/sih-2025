import { motion } from 'framer-motion'
import { AlertTriangle, MapPin, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import LanguageSelector from '../components/LanguageSelector'

// Static Thane map image (open source/OSM-based screenshot URL). In a real app, host this locally.
const THANE_MAP_URL =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Maharashtra_Thane_locator_map.svg/800px-Maharashtra_Thane_locator_map.svg.png'

// Helper to render a static map with overlay markers using absolute positioning
function StaticThaneMap({
  title,
  markers
}: {
  title: string
  markers: Array<{
    id: string
    label: string
    // approximate position in percentage relative to the image container
    topPct: number
    leftPct: number
    severity: 'red' | 'amber' | 'green'
  }>
}) {
  const { t } = useLanguage()
  const colorMap: Record<'red' | 'amber' | 'green', string> = {
    red: 'bg-red-500',
    amber: 'bg-amber-500',
    green: 'bg-green-500'
  }

  return (
    <div className='bg-white rounded-lg shadow-md p-4'>
      <div className='flex items-center justify-between mb-3'>
        <h3 className='text-lg font-semibold text-gray-900 flex items-center gap-2'>
          <AlertTriangle className='h-5 w-5 text-amber-600' /> {title}
        </h3>
        <div className='flex items-center gap-4 text-xs text-gray-600'>
          <span className='inline-flex items-center gap-1'>
            <span className='inline-block w-3 h-3 rounded-full bg-red-500' /> {t('high')}
          </span>
          <span className='inline-flex items-center gap-1'>
            <span className='inline-block w-3 h-3 rounded-full bg-amber-500' /> {t('medium')}
          </span>
          <span className='inline-flex items-center gap-1'>
            <span className='inline-block w-3 h-3 rounded-full bg-green-500' /> {t('low')}
          </span>
        </div>
      </div>

      <div className='relative w-full overflow-hidden rounded-md border border-gray-200'>
        {/* Keep a consistent aspect ratio for the map container */}
        <div className='w-full' style={{ aspectRatio: '4 / 3' }}>
          <img
            src={THANE_MAP_URL}
            alt='Thane District Map'
            className='w-full h-full object-contain pointer-events-none select-none'
          />
          {/* Markers */}
          {markers.map((m) => (
            <div
              key={m.id}
              className='absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center'
              style={{ top: `${m.topPct}%`, left: `${m.leftPct}%` }}
            >
              <span
                className={`w-3 h-3 rounded-full ring-2 ring-white shadow ${colorMap[m.severity]}`}
                title={m.label}
              />
              <span className='mt-1 text-[10px] bg-white/80 px-1 rounded text-gray-700 shadow'>
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-3 text-xs text-gray-600 flex items-center gap-1'>
        <MapPin className='h-3 w-3' /> {t('thaneStaticNote')}
      </div>
    </div>
  )
}

export default function DiseaseAlerts() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  // Demo data: Adjusted rough positions on the static map (percentages)
  const yourFarmMarkers = [
    { id: 'your-1', label: t('yourFarm'), topPct: 58, leftPct: 38, severity: 'red' as const }
  ]

  const nearbyFarmMarkers = [
    { id: 'near-1', label: t('farmA'), topPct: 44, leftPct: 52, severity: 'green' as const },
    { id: 'near-2', label: t('farmB'), topPct: 62, leftPct: 47, severity: 'amber' as const },
    { id: 'near-3', label: t('farmC'), topPct: 36, leftPct: 35, severity: 'red' as const }
  ]

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='bg-green-500 text-white shadow-lg'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-4'>
            <div className='flex items-center space-x-3'>
              <span className='text-2xl'>👨‍🌾</span>
              <h1 className='text-xl font-semibold'>{t('diseaseAlerts')}</h1>
            </div>
            <div className='flex items-center space-x-3'>
              <LanguageSelector 
                variant='compact' 
                position='inline' 
                className='bg-white/10 border-white/20 text-white hover:bg-white/20 focus:ring-white/50' 
              />
            <button
              onClick={() => navigate(-1)}
              className='flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg transition-colors text-white border border-white/20'
            >
              <ArrowLeft className='h-4 w-4' />
              <span className='text-sm font-medium'>{t('back') || 'Back'}</span>
            </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <StaticThaneMap title={t('yourFarmAlert')} markers={yourFarmMarkers} />
            <StaticThaneMap title={t('nearbyFarmAlerts')} markers={nearbyFarmMarkers} />
          </div>

          {/* Info cards */}
          <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='bg-white rounded-lg shadow p-4'>
              <h4 className='font-semibold text-gray-900 mb-1'>{t('yourFarm')}</h4>
              <p className='text-sm text-gray-600'>{t('yourFarmStatusText')}</p>
            </div>
            <div className='bg-white rounded-lg shadow p-4'>
              <h4 className='font-semibold text-gray-900 mb-1'>{t('nearbyFarmB')}</h4>
              <p className='text-sm text-gray-600'>{t('nearbyFarmBStatusText')}</p>
            </div>
            <div className='bg-white rounded-lg shadow p-4'>
              <h4 className='font-semibold text-gray-900 mb-1'>{t('regionalNote')}</h4>
              <p className='text-sm text-gray-600'>{t('regionalNoteText')}</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
