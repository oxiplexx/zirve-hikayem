# Google Analytics 4 Kurulum Rehberi - Zirve Hikayem

## 📊 Google Analytics Hesabı Oluşturma

### 1. Google Analytics Hesabı Açın
1. https://analytics.google.com adresine gidin
2. Google hesabınızla giriş yapın
3. "Başla" butonuna tıklayın

### 2. Hesap Oluşturun
- **Hesap Adı:** Zirve Hikayem
- **Veri Paylaşımı:** İsteğe bağlı (önerilir)

### 3. Özellik (Property) Oluşturun
- **Özellik Adı:** Zirve Hikayem Website
- **Raporlama Saat Dilimi:** Türkiye
- **Para Birimi:** Türk Lirası (TRY)

### 4. İş Bilgilerini Girin
- **Sektör:** Yayıncılık ve Medya
- **İşletme Büyüklüğü:** Küçük (1-10 çalışan)
- **Kullanım Amacı:** İçerik ve yayıncılık

### 5. Veri Akışı Oluşturun
- **Platform:** Web
- **Web Site URL'si:** https://zirvehikayem.com
- **Akış Adı:** Zirve Hikayem Web Sitesi

## 🔧 Kod Entegrasyonu

### 1. Measurement ID'yi Alın
Google Analytics'ten **G-XXXXXXXXXX** formatında Measurement ID'nizi kopyalayın.

### 2. Kodu Güncelleyin
`/app/frontend/src/components/GoogleAnalytics.js` dosyasında:

```javascript
// Bu satırı kendi Measurement ID'nizle değiştirin
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Kendi ID'nizi buraya yazın
```

### 3. Örnek Measurement ID Formatı
```
G-1234567890  // Örnek format
```

## ✅ Test Etme

### 1. Real-time Raporlar
- Google Analytics → Real-time → Overview
- Sitenize girip test yapın
- Canlı ziyaretçi sayısı görünmelidir

### 2. Debug Modu
Tarayıcı console'da şu komutları çalıştırın:
```javascript
// GA yüklenmiş mi kontrol et
console.log('GA loaded:', typeof gtag !== 'undefined');

// Test event gönder
gtag('event', 'test_event', {
  event_category: 'test',
  event_label: 'setup_test'
});
```

## 📈 Takip Edilen Metrikler

### Otomatik Takip
- ✅ Sayfa görüntülemeleri
- ✅ Oturum süreleri
- ✅ Bounce rate
- ✅ Demografik veriler
- ✅ Cihaz bilgileri
- ✅ Coğrafi konum

### Özel Etkinlikler
- 📖 **Blog okuma:** Hangi yazılar okunuyor
- 📝 **Form gönderimi:** İletişim formu kullanımı
- 🔗 **Sosyal medya tıklamaları:** Hangi platformlar popüler
- ⚙️ **Admin işlemleri:** Yazı ekleme/düzenleme/silme
- 🖱️ **CTA tıklamaları:** Buton performansları

## 🎯 Rapor Kategorileri

### 1. Kitle (Audience)
- Ziyaretçi demografikleri
- İlgi alanları
- Teknoloji bilgileri
- Davranış analizleri

### 2. Kazanım (Acquisition)
- Trafik kaynakları
- Sosyal medya trafiği
- Arama motoru trafiği
- Doğrudan ziyaretler

### 3. Davranış (Behavior)
- Sayfa performansları
- İçerik etkileşimleri
- Site arama sorguları
- Olay izleme

### 4. Dönüşümler (Conversions)
- İletişim formu gönderileri
- Sosyal medya takipleri
- Newsletter kayıtları
- Admin panel kullanımı

## 🔒 Gizlilik ve GDPR

### Çerez Onayı
- ✅ Çerez onay sistemi entegre edildi
- ✅ Kullanıcı tercih yönetimi
- ✅ IP anonimleştirme
- ✅ Veri saklama süreleri ayarlandı

### Veri Koruma
- Analytics verisi 26 ay saklanır
- IP adresleri anonimleştirilir
- Çerez tercihleri yerel depolama kullanır
- GDPR uyumlu veri işleme

## 📞 Destek

### Sorun Giderme
1. Tarayıcı console'da hata mesajlarını kontrol edin
2. Network sekmesinde GA isteklerini izleyin
3. Real-time raporlarda veri akışını test edin

### Ek Kaynak
- [Google Analytics Yardım Merkezi](https://support.google.com/analytics)
- [GA4 Kurulum Rehberi](https://developers.google.com/analytics/devguides/collection/ga4)

---

**Not:** Bu dosyayı production'a çıkmadan önce silebilirsiniz. Sadece kurulum için rehber amaçlıdır.