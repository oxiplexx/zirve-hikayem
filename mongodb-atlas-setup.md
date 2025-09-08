# 🗄️ MongoDB Atlas Kurulum Rehberi - Zirve Hikayem

## 🚀 Adım 1: Hesap Oluşturma

1. **MongoDB Atlas'a gidin:** https://cloud.mongodb.com/
2. **"Try Free" butonuna tıklayın**
3. **Google hesabınızla** veya **email ile kayıt olun**
4. **Verify email** - Email'inizi doğrulayın

## 🌍 Adım 2: Cluster Oluşturma

### Organization & Project
1. **Organization Name:** `Zirve Hikayem`
2. **Project Name:** `zirve-hikayem-production`

### Cluster Configuration
1. **"Create a deployment" tıklayın**
2. **M0 Sandbox seçin** (FREE - $0/month)
3. **Provider:** AWS 
4. **Region:** Europe (Frankfurt) - Türkiye'ye en yakın
5. **Cluster Name:** `zirve-hikayem-cluster`
6. **"Create Deployment" tıklayın**

⏰ **Bekleme süresi:** 1-3 dakika

## 🔐 Adım 3: Database User Oluşturma

### Security Quickstart
1. **Username:** `zirvehikayem-admin`
2. **Password:** Güçlü şifre oluşturun (önerilen: otomatik generate)
   ```
   Örnek: Zrv2024!HkYm$Pr0d
   ```
3. **"Create User" tıklayın**

### 📝 **KAYDET!** 
```
Username: zirvehikayem-admin
Password: [oluşturulan-güçlü-şifre]
```

## 🌐 Adım 4: Network Access

1. **"Network Access" sekmesine gidin**
2. **"Add IP Address" tıklayın**
3. **"Allow access from anywhere" seçin** (0.0.0.0/0)
   - Bu Vercel serverless functions için gerekli
4. **"Confirm" tıklayın**

## 🔗 Adım 5: Connection String Alma

1. **"Database" sekmesine geri dönün**
2. **"Connect" butonuna tıklayın**
3. **"Drivers" seçin**
4. **Driver:** Python, **Version:** 3.6 or later
5. **Connection string'i kopyalayın:**

```
mongodb+srv://zirvehikayem-admin:<password>@zirve-hikayem-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

## 📊 Adım 6: Database ve Collection Oluşturma

1. **"Browse Collections" tıklayın**
2. **"Create Database" tıklayın**
3. **Database Name:** `zirvehikayem`
4. **Collection Name:** `blog_posts`
5. **"Create" tıklayın**

### Ek Collections:
- `contact_messages`
- `about_content`

## ✅ Connection String Hazırlama

### Template:
```
mongodb+srv://zirvehikayem-admin:<password>@zirve-hikayem-cluster.xxxxx.mongodb.net/zirvehikayem?retryWrites=true&w=majority
```

### Gerçek String (örnek):
```
mongodb+srv://zirvehikayem-admin:Zrv2024!HkYm$Pr0d@zirve-hikayem-cluster.abc123.mongodb.net/zirvehikayem?retryWrites=true&w=majority
```

## 🧪 Test Connection

Python ile test:
```python
from pymongo import MongoClient

# Connection string
uri = "mongodb+srv://zirvehikayem-admin:PASSWORD@zirve-hikayem-cluster.xxxxx.mongodb.net/zirvehikayem?retryWrites=true&w=majority"

# Test connection
client = MongoClient(uri)
try:
    client.admin.command('ping')
    print("MongoDB Atlas bağlantısı başarılı!")
except Exception as e:
    print(f"Bağlantı hatası: {e}")
```

## 📝 Sonraki Adım

MongoDB Atlas kurulduktan sonra:
1. ✅ Connection string'i kaydedin
2. ➡️ GitHub repository oluşturacağız
3. ➡️ Vercel'e deploy edeceğiz

---

**⚠️ ÖNEMLİ:** Connection string'inizi güvenli bir yerde saklayın! Bu production veritabanınızın anahtarıdır.