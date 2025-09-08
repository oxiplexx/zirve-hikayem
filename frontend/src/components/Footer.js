import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-purple-900 via-pink-900 to-orange-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link to="/" className="zirve-logo-container">
              <img 
                src="https://customer-assets.emergentagent.com/job_zirvehikayeleri/artifacts/u9h2xa09_Logo1.png" 
                alt="Zirve Hikayem Logo"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-xl font-bold text-white">Zirve Hikayem</span>
            </Link>
            <p className="text-pink-100 text-sm leading-relaxed">
              Her deneyim bir hikaye, her hikaye bir ders. Girişimcilik, kişisel gelişim ve 
              yaşam deneyimlerimi paylaştığım kişisel blog platformum.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-orange-200">Hızlı Bağlantılar</h3>
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="text-pink-100 hover:text-white transition-colors duration-200 text-sm"
              >
                Ana Sayfa
              </Link>
              <Link 
                to="/about" 
                className="text-pink-100 hover:text-white transition-colors duration-200 text-sm"
              >
                Hakkımda
              </Link>
              <Link 
                to="/contact" 
                className="text-pink-100 hover:text-white transition-colors duration-200 text-sm"
              >
                İletişim
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-orange-200">İletişim</h3>
            <div className="space-y-3">
              <a 
                href="mailto:zirvehikayem@gmail.com"
                className="flex items-center space-x-2 text-pink-100 hover:text-white transition-colors duration-200 text-sm"
              >
                <Mail className="h-4 w-4" />
                <span>zirvehikayem@gmail.com</span>
              </a>
              <a 
                href="#"
                className="flex items-center space-x-2 text-pink-100 hover:text-white transition-colors duration-200 text-sm"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Sosyal Medya</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-pink-800 mt-8 pt-8 text-center">
          <p className="text-pink-200 text-sm">
            © {currentYear} Zirve Hikayem. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;