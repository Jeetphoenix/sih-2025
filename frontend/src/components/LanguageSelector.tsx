import React, { useState, useRef, useEffect } from 'react'
import { useLanguage, Language } from '../contexts/LanguageContext'
import { ChevronDown, Globe, Check } from 'lucide-react'

const languages = [
  { code: 'en' as Language, name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'hi' as Language, name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'mr' as Language, name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'gu' as Language, name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'ta' as Language, name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' }
]

interface LanguageSelectorProps {
  className?: string
  variant?: 'default' | 'compact' | 'minimal'
  position?: 'top-right' | 'inline'
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  className = '', 
  variant = 'default',
  position = 'top-right'
}) => {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const currentLang = languages.find(lang => lang.code === language)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleLanguageSelect = (langCode: Language) => {
    setLanguage(langCode)
    setIsOpen(false)
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return 'px-2 py-1 text-xs'
      case 'minimal':
        return 'px-1 py-1 text-xs bg-transparent border-none shadow-none hover:bg-gray-50'
      default:
        return 'px-3 py-2 text-sm'
    }
  }

  const getPositionClasses = () => {
    if (position === 'inline') return 'relative'
    
    return position === 'top-right' 
      ? 'absolute top-4 right-4 z-50' 
      : 'relative'
  }

  const getDropdownClasses = () => {
    if (position === 'inline') {
      return 'absolute top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-[60] max-h-60 overflow-y-auto'
    }
    return 'absolute top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto'
  }

  return (
    <div className={`${getPositionClasses()} ${className}`} ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative flex items-center gap-2 bg-white border border-gray-200 
          rounded-lg shadow-sm hover:shadow-md transition-all duration-200 
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          ${getVariantStyles()}
          ${variant === 'minimal' ? 'text-gray-700 hover:text-gray-900' : 'text-gray-700 hover:bg-gray-50'}
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select language"
      >
        {/* Current Language Display */}
        <div className="flex items-center gap-2">
          <span className="text-lg">{currentLang?.flag}</span>
          {variant !== 'minimal' && (
            <span className="font-medium truncate max-w-[80px]">
              {variant === 'compact' ? currentLang?.name.substring(0, 3) : currentLang?.name}
            </span>
          )}
        </div>
        
        <ChevronDown 
          className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

            {/* Dropdown Menu */}
            {isOpen && (
        <div 
          className={getDropdownClasses()}
          role="listbox"
          style={{
            minWidth: buttonRef.current ? buttonRef.current.offsetWidth : 'auto',
            position: 'absolute',
            left: position === 'inline' ? 'auto' : '0',
            right: position === 'inline' ? '0' : 'auto'
          }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg"
              role="option"
              aria-selected={language === lang.code}
            >
              {/* Language Flag */}
              <span className="text-lg flex-shrink-0">{lang.flag}</span>
              
              {/* Language Names */}
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-medium text-gray-900 truncate">
                  {lang.name}
                </span>
                <span className="text-xs text-gray-500 truncate">
                  {lang.nativeName}
                </span>
              </div>
              
              {/* Checkmark for selected language */}
              {language === lang.code && (
                <Check className="h-4 w-4 text-primary-600 flex-shrink-0" />
              )}
            </button>
          ))}
          
          {/* Footer with Globe Icon */}
          <div className="border-t border-gray-100 px-4 py-2 bg-gray-50 rounded-b-lg">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Globe className="h-3 w-3" />
              <span>Choose your language</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LanguageSelector
