import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Cookie, X, Settings } from 'lucide-react';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    functional: false
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show consent banner after a short delay
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    setPreferences(allAccepted);
    saveConsent(allAccepted);
    setShowConsent(false);
  };

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    setPreferences(necessaryOnly);
    saveConsent(necessaryOnly);
    setShowConsent(false);
  };

  const saveCustom = () => {
    saveConsent(preferences);
    setShowConsent(false);
    setShowSettings(false);
  };

  const saveConsent = (prefs) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    
    // Initialize Google Analytics if analytics is accepted
    if (prefs.analytics && !window.gtag) {
      import('./GoogleAnalytics').then(({ initGA }) => {
        initGA();
      });
    }
  };

  const handlePreferenceChange = (type) => {
    if (type === 'necessary') return; // Cannot disable necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="max-w-4xl mx-auto shadow-xl border-2 border-purple-200 bg-white">
        <CardContent className="p-6">
          {!showSettings ? (
            // Main consent banner
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              <div className="flex items-center space-x-3 flex-1">
                <Cookie className="h-8 w-8 text-purple-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Çerez Kullanımı</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Bu web sitesi, deneyiminizi iyileştirmek, site trafiğini analiz etmek ve 
                    kişiselleştirilmiş içerik sunmak için çerezler kullanır. 
                    Çerez tercihlerinizi yönetebilir veya tümünü kabul edebilirsiniz.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 lg:flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSettings(true)}
                  className="border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Ayarlar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={acceptNecessary}
                  className="border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  Sadece Gerekli
                </Button>
                <Button
                  size="sm"
                  onClick={acceptAll}
                  className="zirve-button-primary"
                >
                  Tümünü Kabul Et
                </Button>
              </div>
            </div>
          ) : (
            // Detailed settings
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-800 flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Çerez Tercihleri
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(false)}
                  className="text-slate-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                {/* Necessary Cookies */}
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-slate-800">Gerekli Çerezler</h4>
                    <p className="text-sm text-slate-600">
                      Web sitesinin çalışması için gerekli temel çerezler. Devre dışı bırakılamaz.
                    </p>
                  </div>
                  <div className="w-12 h-6 bg-purple-600 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-slate-800">Analitik Çerezler</h4>
                    <p className="text-sm text-slate-600">
                      Site trafiğini ve kullanıcı davranışlarını anlamamıza yardımcı olur.
                    </p>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('analytics')}
                    className={`w-12 h-6 rounded-full relative transition-colors ${
                      preferences.analytics ? 'bg-purple-600' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                        preferences.analytics ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    ></div>
                  </button>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-slate-800">Pazarlama Çerezler</h4>
                    <p className="text-sm text-slate-600">
                      Kişiselleştirilmiş reklamlar ve içerik sunmak için kullanılır.
                    </p>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('marketing')}
                    className={`w-12 h-6 rounded-full relative transition-colors ${
                      preferences.marketing ? 'bg-purple-600' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                        preferences.marketing ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    ></div>
                  </button>
                </div>

                {/* Functional Cookies */}
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-slate-800">Fonksiyonel Çerezler</h4>
                    <p className="text-sm text-slate-600">
                      Tercihlerinizi hatırlayarak deneyiminizi kişiselleştirir.
                    </p>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('functional')}
                    className={`w-12 h-6 rounded-full relative transition-colors ${
                      preferences.functional ? 'bg-purple-600' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                        preferences.functional ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    ></div>
                  </button>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <Button
                  variant="outline"
                  onClick={acceptNecessary}
                  className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  Sadece Gerekli
                </Button>
                <Button
                  onClick={saveCustom}
                  className="flex-1 zirve-button-primary"
                >
                  Tercihleri Kaydet
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieConsent;