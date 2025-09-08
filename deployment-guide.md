# 🚀 Zirve Hikayem - Production Deployment Rehberi

## 📋 Deployment Seçenekleri

### 🌟 Önerilen: Vercel + MongoDB Atlas (Kolay & Hızlı)
- **Frontend:** Vercel (Ücretsiz)
- **Backend:** Vercel Serverless Functions
- **Database:** MongoDB Atlas (Ücretsiz 512MB)
- **Domain:** Vercel subdomaini veya kendi domain'iniz

### 🔧 Alternatif: DigitalOcean Droplet (Tam Kontrol)
- **Server:** DigitalOcean Droplet ($6/ay)
- **Database:** MongoDB Atlas veya kendi MongoDB
- **Domain:** Kendi domain'inizle

### ☁️ Alternatif: AWS/Google Cloud (Scalable)
- **Frontend:** AWS S3 + CloudFront
- **Backend:** AWS Lambda veya EC2
- **Database:** MongoDB Atlas

## 🎯 Önerilen Deployment: Vercel + MongoDB Atlas

### ✅ Avantajları:
- ✅ **Ücretsiz başlangıç**
- ✅ **Otomatik HTTPS**
- ✅ **Global CDN**
- ✅ **Otomatik scaling**
- ✅ **GitHub entegrasyonu**
- ✅ **Çok kolay kurulum**

---

## 📂 1. DOSYA HAZIRLIĞI

### Frontend Production Build
```bash
cd /app/frontend
yarn build
```

### Environment Variables
```bash
# /app/frontend/.env.production
REACT_APP_BACKEND_URL=https://your-domain.vercel.app
```

### Package.json Optimizasyonu
```json
{
  "scripts": {
    "build": "craco build",
    "start": "craco start"
  }
}
```

---

## 🗄️ 2. DATABASE KURULUMU

### MongoDB Atlas (Ücretsiz)

1. **Hesap Oluşturun:** https://cloud.mongodb.com
2. **Cluster Oluşturun:**
   - Cluster Name: `zirve-hikayem`
   - Provider: AWS
   - Region: Europe (Frankfurt) - Türkiye'ye yakın
   - Tier: M0 Sandbox (FREE)

3. **Database User Oluşturun:**
   - Username: `zirvehikayem`
   - Password: Güçlü şifre oluşturun
   - Role: `Atlas Admin`

4. **Network Access:**
   - IP Address: `0.0.0.0/0` (tümüne izin)
   - Veya Vercel IP range'leri

5. **Connection String Alın:**
   ```
   mongodb+srv://zirvehikayem:<password>@zirve-hikayem.xxxxx.mongodb.net/zirvehikayem?retryWrites=true&w=majority
   ```

### Data Migration
```bash
# Local veritabanından Atlas'a veri aktarma
cd /app/backend
python data_migration.py
```

---

## 🔧 3. BACKEND DEPLOYMENT

### Vercel için Backend Hazırlığı

1. **requirements.txt kontrolü:**
```txt
fastapi==0.110.1
uvicorn==0.25.0
pymongo==4.5.0
motor==3.3.1
pydantic>=2.6.4
bcrypt>=4.0.1
pyjwt>=2.10.1
python-dotenv>=1.0.1
```

2. **vercel.json oluşturun:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/main.py",
      "use": "@vercel/python"
    },
    {
      "src": "frontend/build/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/main.py"
    },
    {
      "src": "/(.*)",
      "dest": "frontend/build/$1"
    }
  ],
  "env": {
    "MONGO_URL": "@mongo_url",
    "DB_NAME": "zirvehikayem"
  }
}
```

3. **main.py oluşturun (Vercel entry point):**
```python
# /app/backend/main.py
from server import app

# Vercel için handler
def handler(request, context):
    return app(request, context)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

---

## 🌐 4. FRONTEND DEPLOYMENT

### Vercel Deployment

1. **GitHub Repository:**
   - Kodu GitHub'a push edin
   - Repository: `zirve-hikayem-website`

2. **Vercel'e Bağlayın:**
   - https://vercel.com → Import Project
   - GitHub repository seçin
   - Framework: `Create React App`

3. **Environment Variables (Vercel Dashboard):**
   ```
   REACT_APP_BACKEND_URL = https://your-app.vercel.app
   ```

4. **Build Settings:**
   - Build Command: `yarn build`
   - Output Directory: `frontend/build`
   - Install Command: `yarn install`

### Domain Yapılandırması

1. **Vercel Subdomain:**
   ```
   https://zirve-hikayem.vercel.app
   ```

2. **Custom Domain:**
   - Domain satın alın: `zirvehikayem.com`
   - Vercel'de domain ekleyin
   - DNS ayarlarını yapın:
     ```
     A Record: @ → 76.76.19.61
     CNAME: www → zirve-hikayem.vercel.app
     ```

---

## 🔒 5. GÜVENLIK VE SSL

### Otomatik SSL
- Vercel otomatik SSL sağlar
- Let's Encrypt sertifikası
- HTTPS zorunlu yönlendirme

### Environment Variables Güvenliği
```bash
# Production Environment Variables
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/db
JWT_SECRET=super-secure-secret-key-here
ADMIN_PASSWORD_HASH=your-bcrypt-hash
```

### CORS Güvenliği
```python
# backend/server.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://zirvehikayem.com", "https://www.zirvehikayem.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 📊 6. MONITORING & ANALYTICS

### Google Analytics Production
```javascript
// Google Analytics Production ID
const GA_MEASUREMENT_ID = 'G-REAL-PRODUCTION-ID';
```

### Error Monitoring (Önerilen)
```bash
# Sentry.io entegrasyonu
yarn add @sentry/react @sentry/tracing
```

### Performance Monitoring
- Vercel Analytics (ücretsiz)
- Google PageSpeed Insights
- GTmetrix performance tests

---

## 🚀 7. DEPLOYMENT ADIMLARI

### Adım 1: GitHub'a Push
```bash
cd /app
git init
git add .
git commit -m "Production ready - Zirve Hikayem"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/zirve-hikayem.git
git push -u origin main
```

### Adım 2: MongoDB Atlas Setup
1. Cluster oluştur
2. Database user ekle
3. Network access ayarla
4. Connection string al

### Adım 3: Vercel Deployment
1. Vercel'e GitHub repo import et
2. Environment variables ekle
3. Deploy butonuna bas
4. Domain ayarlarını yap

### Adım 4: DNS Configuration
```
A     @     76.76.19.61
CNAME www   zirve-hikayem.vercel.app
```

### Adım 5: Final Tests
- Site erişimi: https://zirvehikayem.com
- API endpoints test
- Admin panel erişimi
- Form submissions
- Analytics tracking

---

## ✅ 8. PRODUCTION CHECKLIST

### 🔍 Teknik Kontroller
- [ ] HTTPS çalışıyor
- [ ] API endpoints çalışıyor
- [ ] Database bağlantısı OK
- [ ] Admin login çalışıyor
- [ ] Form submissions çalışıyor
- [ ] Google Analytics aktif
- [ ] Cookie consent çalışıyor
- [ ] Mobile responsive OK
- [ ] Page load speed < 3 saniye

### 📊 SEO & Analytics
- [ ] Google Analytics tracking
- [ ] Google Search Console setup
- [ ] Meta tags doğru
- [ ] Sitemap.xml erişilebilir
- [ ] Robots.txt doğru
- [ ] Social media tags OK

### 🔒 Güvenlik
- [ ] HTTPS zorunlu
- [ ] Admin şifre güçlü
- [ ] Environment variables güvenli
- [ ] CORS ayarları production
- [ ] Rate limiting aktif

---

## 💰 MALIYET TAHMİNİ

### Ücretsiz Başlangıç
- **Vercel:** Ücretsiz (hobby plan)
- **MongoDB Atlas:** Ücretsiz (512MB)
- **Domain:** $10-15/yıl
- **SSL:** Ücretsiz (Let's Encrypt)
- **Total:** ~$15/yıl

### Büyüme ile Birlikte
- **Vercel Pro:** $20/ay (daha fazla bandwidth)
- **MongoDB Atlas:** $9/ay (2GB)
- **Custom Analytics:** $10/ay
- **Total:** ~$40/ay

---

## 🆘 TROUBLESHOOTING

### Yaygın Sorunlar
1. **Build Errors:** Package.json dependencies
2. **API Errors:** CORS configuration
3. **Database Errors:** Connection string/IP whitelist
4. **Domain Errors:** DNS propagation (24-48 saat)

### Debug Komutları
```bash
# Vercel logs
vercel logs

# Build logs
vercel build

# Environment variables check
vercel env ls
```

---

## 📞 POST-DEPLOYMENT

### İlk 24 Saat
- [ ] Google Search Console sitemap gönder
- [ ] Google Analytics real-time test
- [ ] Social media profillerde link güncelle
- [ ] Dostlarla paylaş ve feedback al

### İlk Hafta
- [ ] Performance monitoring
- [ ] User feedback toplama
- [ ] Analytics data analizi
- [ ] SEO optimizasyonları

### Devam Eden Bakım
- [ ] Haftalık analytics reports
- [ ] Content updates
- [ ] Security updates
- [ ] Performance optimizations

---

Bu rehber size production'a çıkarken rehberlik edecek. Hangi deployment yöntemini tercih edersiniz?