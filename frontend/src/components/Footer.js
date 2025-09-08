import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ExternalLink, Instagram, Youtube, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/zirvehikayem',
      handle: '@zirvehikayem'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://youtube.com/@zirvehikayem',
      handle: '@zirvehikayem'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/Aydinkocaturk',
      handle: '@Aydinkocaturk'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/in/aydinkocaturk',
      handle: 'Aydın Kocatürk'
    }
  ];

  return (
    <footer className="bg-gradient-to-r from-purple-900 via-pink-900 to-orange-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-orange-200">Sosyal Medya</h3>
            <div className="space-y-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-pink-100 hover:text-white transition-all duration-200 text-sm group"
                  >
                    <IconComponent className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                    <span>{social.handle}</span>
                    <ExternalLink className="h-3 w-3 opacity-70" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-pink-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-pink-200 text-sm">
              © {currentYear} Zirve Hikayem - Aydın Kocatürk. Tüm hakları saklıdır.
            </p>
            
            {/* Social Icons Row */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-pink-100 hover:text-white hover:bg-white/20 transition-all duration-200 hover:scale-110"
                    title={social.name}
                  >
                    <IconComponent className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;