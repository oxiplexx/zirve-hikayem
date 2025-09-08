# 🌟 Zirve Hikayem - Yeniden Başlamak, Daha Güçlü Yükselmek

> Hayatın inişleri ve çıkışlarından dersler çıkararak yeniden ayağa kalkmanın hikayelerini paylaşan kişisel blog platformu.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/aydinkocaturk/zirve-hikayem)

## 🚀 Live Demo

**Website:** [https://zirvehikayem.com](https://zirvehikayem.com)

## ✨ Özellikler

### 📖 Blog Sistemi
- **Modern blog yönetimi** - Full CRUD işlemleri
- **Kategori filtreleme** - Girişimcilik, Kişisel Gelişim, Motivasyon
- **Etiket sistemi** - İçerik organizasyonu
- **Öne çıkan yazılar** - Featured content system
- **Türkçe URL desteği** - SEO friendly slugs

### 🎨 Modern Tasarım
- **Responsive design** - Mobil ve desktop uyumlu
- **Professional UI** - Shadcn UI components
- **Brand colors** - Mor-pembe-turuncu gradient tema
- **Smooth animations** - Hover effects ve transitions

### 🔐 Admin Panel
- **Güvenli giriş sistemi** - JWT authentication 
- **Blog yazısı yönetimi** - Create, edit, delete
- **Preview özelliği** - Yayınlamadan önce görüntüleme
- **Responsive admin UI** - Mobil admin yönetimi

### 📊 Analytics & SEO
- **Google Analytics 4** - Detaylı ziyaretçi analizi
- **SEO optimized** - Meta tags, Open Graph, Twitter Cards
- **Structured data** - Schema.org markup
- **Sitemap & robots.txt** - Arama motoru optimizasyonu

### 🍪 Privacy & GDPR
- **Cookie consent** - GDPR uyumlu çerez yönetimi
- **Privacy controls** - Kullanıcı tercih yönetimi
- **Data protection** - Güvenli veri işleme

## 🛠️ Teknoloji Stack

### Frontend
- **React 19** - Modern JavaScript framework
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - Modern component library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Helmet** - Dynamic SEO management

### Backend
- **FastAPI** - Modern Python web framework
- **MongoDB** - NoSQL document database
- **Motor** - Async MongoDB driver
- **JWT** - JSON Web Token authentication
- **bcrypt** - Password hashing
- **Pydantic** - Data validation

### Deployment
- **Vercel** - Serverless deployment platform
- **MongoDB Atlas** - Cloud database service
- **GitHub** - Version control and CI/CD

### Analytics & Monitoring
- **Google Analytics 4** - Web analytics
- **Vercel Analytics** - Performance monitoring
- **Sentry** - Error tracking (optional)

## 🚀 Hızlı Başlangıç

### Gereksinimler
- Node.js 16+ 
- Python 3.8+
- MongoDB (local veya Atlas)
- Yarn package manager

### Kurulum

1. **Repository'yi klonlayın:**
```bash
git clone https://github.com/aydinkocaturk/zirve-hikayem.git
cd zirve-hikayem
```

2. **Frontend dependencies:**
```bash
cd frontend
yarn install
```

3. **Backend dependencies:**
```bash
cd ../backend
pip install -r requirements.txt
```

4. **Environment variables:**
```bash
# frontend/.env
REACT_APP_BACKEND_URL=http://localhost:8001

# backend/.env  
MONGO_URL=mongodb://localhost:27017
DB_NAME=zirvehikayem
```

5. **Veritabanını seed edin:**
```bash
cd backend
python seed_data.py
```

6. **Development servers:**
```bash
# Terminal 1: Backend
cd backend
python -m uvicorn server:app --reload --port 8001

# Terminal 2: Frontend  
cd frontend
yarn start
```

## 📝 Admin Paneli

**URL:** `http://localhost:3000/admin`

**Giriş Bilgileri:**
- Username: `admin`
- Password: `ZirveHikayem2024!`

## 🌐 Production Deployment

### Vercel ile Deploy

1. **GitHub'a push edin**
2. **Vercel'e import edin:** https://vercel.com
3. **Environment variables ekleyin:**
   ```
   MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/db
   DB_NAME=zirvehikayem
   ```
4. **Deploy edin!**

### MongoDB Atlas Kurulumu

1. **Hesap açın:** https://cloud.mongodb.com
2. **Free cluster oluşturun**
3. **Database user ekleyin**
4. **Network access ayarlayın** (0.0.0.0/0)
5. **Connection string alın**

## 📊 Google Analytics Kurulumu

1. **GA4 hesabı oluşturun:** https://analytics.google.com
2. **Measurement ID alın** (G-XXXXXXXXXX)
3. **Kodu güncelleyin:**
```javascript
// frontend/src/components/GoogleAnalytics.js
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
```

## 🔧 API Endpoints

### Blog Posts
```
GET    /api/posts              # Tüm yazıları getir
GET    /api/posts/featured     # Öne çıkan yazıları getir  
GET    /api/posts/{slug}       # Tek yazı getir
POST   /api/posts              # Yeni yazı oluştur (admin)
PUT    /api/posts/{id}         # Yazı güncelle (admin)
DELETE /api/posts/{id}         # Yazı sil (admin)
```

### Authentication
```
POST   /api/auth/login         # Admin girişi
POST   /api/auth/verify        # Token doğrulama
POST   /api/auth/logout        # Çıkış
```

### Contact & Content
```
POST   /api/contact            # İletişim formu
GET    /api/categories         # Kategorileri getir
GET    /api/about              # Hakkında içeriği
```

## 📈 Analytics Events

### Otomatik Takipler
- Page views (sayfa görüntülemeleri)
- User sessions (kullanıcı oturumları) 
- Bounce rate (çıkış oranı)
- Geographic data (coğrafi veriler)

### Custom Events
- `blog_read` - Blog yazısı okunması
- `form_submit` - Form gönderimi
- `social_click` - Sosyal medya tıklamaları
- `admin_action` - Admin panel işlemleri

## 🎨 Tasarım Sistemi

### Renkler
```css
--zirve-purple: #6B46C1    /* Ana mor */
--zirve-pink: #EC4899      /* Vurgu pembe */
--zirve-orange: #F97316    /* Aksan turuncu */
```

### Typography
- **Headings:** Inter, bold
- **Body:** Inter, regular
- **Code:** JetBrains Mono

### Components
- **Buttons:** Gradient hover effects
- **Cards:** Subtle shadows, rounded corners
- **Forms:** Clean, accessible inputs
- **Navigation:** Smooth transitions

## 🔒 Güvenlik

### Authentication
- JWT token based auth
- Secure password hashing with bcrypt
- Protected admin routes
- Session management

### Data Protection
- HTTPS enforcement
- CORS configuration
- Input validation & sanitization
- Environment variable security

### Privacy
- GDPR compliant cookie consent
- User preference management
- Data anonymization
- Transparent privacy policy

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👨‍💻 Geliştirici

**Aydın Kocatürk**
- Website: [zirvehikayem.com](https://zirvehikayem.com)
- Instagram: [@zirvehikayem](https://instagram.com/zirvehikayem)
- YouTube: [@zirvehikayem](https://youtube.com/@zirvehikayem)
- Twitter: [@Aydinkocaturk](https://twitter.com/Aydinkocaturk)
- LinkedIn: [aydinkocaturk](https://linkedin.com/in/aydinkocaturk)

## 💖 Teşekkürler

Bu projeyi geliştirirken kullanılan açık kaynak kütüphaneler ve araçlar için teşekkürler:
- React Team
- FastAPI Team  
- MongoDB
- Vercel
- Tailwind CSS
- Shadcn UI

---

**⭐ Eğer bu proje işinize yaradıysa, lütfen star verin!**

Made with ❤️ by [Aydın Kocatürk](https://zirvehikayem.com)