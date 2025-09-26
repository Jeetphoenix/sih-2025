import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, XCircle, Clock, ArrowLeft, Eye } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import LanguageSelector from '../components/LanguageSelector'

interface ApplicationItem {
  id: string
  farmName: string
  owner: string
  submittedOn: string
}

const MOCK_PENDING: ApplicationItem[] = [
  { id: '11', farmName: 'Shivam Layer Farm', owner: 'Raghav Sharma', submittedOn: 'Mar 14, 2024' },
  { id: '12', farmName: 'Prachi Poultry', owner: 'Prachi Desai', submittedOn: 'Mar 13, 2024' }
]

const MOCK_APPROVED: ApplicationItem[] = [
  { id: '01', farmName: 'Green Valley Poultry Farm', owner: 'John Farmer', submittedOn: 'Feb 28, 2024' }
]

const MOCK_REJECTED: ApplicationItem[] = [
  { id: '21', farmName: 'Sunrise Egg Farm', owner: 'A. Kumar', submittedOn: 'Feb 22, 2024' }
]

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }>=({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md border transition-colors ${active ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
  >
    {children}
  </button>
)

const Row: React.FC<{ item: ApplicationItem; status: 'pending'|'approved'|'rejected'; t: (k:string)=>string; onView: (id:string)=>void }>=({ item, status, t, onView }) => {
  const statusPill = status === 'pending'
    ? { cls: 'bg-yellow-100 text-yellow-700 border-yellow-200', Icon: Clock, text: t('statusPending') }
    : status === 'approved' ? { cls: 'bg-green-100 text-green-700 border-green-200', Icon: CheckCircle2, text: t('statusApproved') }
    : { cls: 'bg-red-100 text-red-700 border-red-200', Icon: XCircle, text: t('statusRejected') }
  const Icon = statusPill.Icon
  return (
    <div className="flex items-center justify-between bg-gray-50 border rounded-lg px-4 py-3">
      <div>
        <div className="font-medium text-gray-900">{item.farmName}</div>
        <div className="text-xs text-gray-500">
          {t('ownerNameLabel')}: {item.owner} • {t('submittedOnLabel')}: {item.submittedOn}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border ${statusPill.cls}`}>
          <Icon className="h-3.5 w-3.5" /> {statusPill.text}
        </span>
        <button onClick={() => onView(item.id)} className="px-3 py-1.5 rounded-md border bg-white hover:bg-gray-50 inline-flex items-center gap-1 text-sm">
          <Eye className="h-4 w-4" /> {t('viewApplication')}
        </button>
        {status==='pending' && (
          <>
            <button className="px-3 py-1.5 rounded-md bg-green-600 text-white hover:bg-green-700 text-sm">{t('approveAction')}</button>
            <button className="px-3 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700 text-sm">{t('rejectAction')}</button>
          </>
        )}
      </div>
    </div>
  )
}

const AdminApprovals: React.FC = () => {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [tab, setTab] = useState<'pending'|'approved'|'rejected'>('pending')

  const list = tab==='pending' ? MOCK_PENDING : tab==='approved' ? MOCK_APPROVED : MOCK_REJECTED

  const handleView = (id: string) => {
    // For now, navigate to farm dashboard if present in system, else no-op
    if (id === '01') navigate('/farms/1')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header (Admin theme: blue) */}
      <header className="bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20" aria-label="Back">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-lg font-semibold">{t('approvalsTitle')}</h1>
              <p className="text-xs text-white/80">{t('approvalsSubtitle')}</p>
            </div>
          </div>
          <LanguageSelector variant="compact" position="inline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-4">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-4 border">
          <div className="flex flex-wrap gap-2">
            <TabButton active={tab==='pending'} onClick={()=>setTab('pending')}>{t('tabPending')}</TabButton>
            <TabButton active={tab==='approved'} onClick={()=>setTab('approved')}>{t('tabApproved')}</TabButton>
            <TabButton active={tab==='rejected'} onClick={()=>setTab('rejected')}>{t('tabRejected')}</TabButton>
          </div>
        </div>

        {/* List */}
        <section className="bg-white rounded-xl shadow-sm p-4 border">
          <div className="space-y-3">
            {list.map(item => (
              <Row key={item.id} item={item} status={tab} t={t} onView={handleView} />
            ))}
            {list.length === 0 && (
              <div className="text-sm text-gray-500">No applications in this state.</div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default AdminApprovals
