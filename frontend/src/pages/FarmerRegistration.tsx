import React, { useState, useRef,  } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FormData {
  farmerName: string;
  mobileNumber: string;
  preferredLanguage: string;
  govId: string;
  photo: File | null;
}

const FarmerRegistration: React.FC = () => {
  useLanguage();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    farmerName: '',
    mobileNumber: '',
    preferredLanguage: 'en',
    govId: '',
    photo: null,
  });

  const availableLanguages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'mr', name: 'मराठी' },
    { code: 'gu', name: 'ગુજરાતી' },
    { code: 'ta', name: 'தமிழ்' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        photo: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Registration successful!');
    navigate(-1); // Go back to previous page
  };

  const getTranslatedLabel = (key: string) => {
    // This function will get the translated label based on the selected language
    const translations: Record<string, Record<string, string>> = {
      farmerName: {
        en: 'Farmer Name',
        hi: 'किसान का नाम',
        mr: 'शेतकऱ्याचे नाव',
        gu: 'ખેડૂતનું નામ',
        ta: 'விவசாயியின் பெயர்',
      },
      mobileNumber: {
        en: 'Mobile Number',
        hi: 'मोबाइल नंबर',
        mr: 'मोबाइल नंबर',
        gu: 'મોબાઇલ નંબર',
        ta: 'மொபைல் எண்',
      },
      preferredLanguage: {
        en: 'Preferred Language',
        hi: 'पसंदीदा भाषा',
        mr: 'प्राधान्य भाषा',
        gu: 'પસંદીદા ભાષા',
        ta: 'விருப்ப மொழி',
      },
      govId: {
        en: 'Aadhaar / Gov ID',
        hi: 'आधार / सरकारी आईडी',
        mr: 'आधार / शासकीय ओळखपत्र',
        gu: 'આધાર / શાસકીય આઈડી',
        ta: 'ஆதார் / அரசு அடையாளம்',
      },
      uploadPhoto: {
        en: 'Upload Photo',
        hi: 'फोटो अपलोड करें',
        mr: 'फोटो अपलोड करा',
        gu: 'ફોટો અપલોડ કરો',
        ta: 'புகைப்படம் பதிவேற்று',
      },
      submit: {
        en: 'Submit',
        hi: 'जमा करें',
        mr: 'सबमिट',
        gu: 'સબમિટ',
        ta: 'சமர்ப்பிக்கவும்',
      },
      cancel: {
        en: 'Cancel',
        hi: 'रद्द करें',
        mr: 'रद्द करा',
        gu: 'રદ કરો',
        ta: 'ரத்துசெய்',
      },
    };

    return translations[key]?.[formData.preferredLanguage] || key;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            {getTranslatedLabel('farmerRegistration')}
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit}>
            {/* Language Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslatedLabel('preferredLanguage')}
              </label>
              <select
                name="preferredLanguage"
                value={formData.preferredLanguage}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {availableLanguages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Farmer Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslatedLabel('farmerName')}
              </label>
              <input
                type="text"
                name="farmerName"
                value={formData.farmerName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Mobile Number */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslatedLabel('mobileNumber')}
              </label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                pattern="[0-9]{10}"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Government ID */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslatedLabel('govId')}
              </label>
              <input
                type="text"
                name="govId"
                value={formData.govId}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Photo Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslatedLabel('uploadPhoto')}
              </label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoChange}
                accept="image/*"
                className="hidden"
                required
              />
              <div className="flex items-center justify-center w-full">
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
                >
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="h-28 w-28 object-cover rounded-md"
                    />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        Click to upload photo
                      </p>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 mt-8">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {getTranslatedLabel('cancel')}
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {getTranslatedLabel('submit')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FarmerRegistration;
