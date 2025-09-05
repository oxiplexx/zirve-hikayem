// Mock data for Zirve Hikayem blog
export const mockBlogPosts = [
  {
    id: 1,
    title: "Hayatımın Dönüm Noktası: İlk Girişimim",
    slug: "hayatimin-donum-noktasi-ilk-girisimim",
    excerpt: "25 yaşında kurduğum ilk şirketin hikayesi ve bu süreçte öğrendiklerimi paylaşıyorum.",
    content: `
      <p>Merhaba değerli okuyucularım,</p>
      <p>Bugün sizlerle hayatımın en önemli dönüm noktalarından birini paylaşmak istiyorum. 25 yaşında kurduğum ilk şirketin hikayesi...</p>
      <p>O dönemde üniversiteden yeni mezun olmuştum ve klasik kariyer yolunu takip etmek yerine kendi işimi kurmaya karar verdim. Bu karar kolay olmadı tabii ki.</p>
      <p>İlk günlerde karşılaştığım zorluklar, başarısızlıklar ve nihayetinde elde ettiğim başarılar bu yazının konusu.</p>
      <h3>Başlangıç</h3>
      <p>Girişimcilik yolculuğum aslında bir hayal ile başladı. Üniversite yıllarımda hep farklı fikirler üretir, bunları arkadaşlarımla paylaşırdım...</p>
    `,
    author: "Zirve Hikayem",
    publishDate: "2024-01-15",
    category: "Girişimcilik",
    tags: ["girişimcilik", "başarı", "motivasyon"],
    readTime: "8 dakika",
    featured: true
  },
  {
    id: 2,
    title: "Başarısızlıktan Öğrendiklerim",
    slug: "basarisizliktan-ogrendiklerim",
    excerpt: "Her başarısızlık aslında bir ders. İşte benim en büyük hatalarımdan çıkardığım dersler.",
    content: `
      <p>Başarısızlık kelimesi çoğumuz için korkutucu. Ancak benim deneyimlerime göre, en büyük öğretmenimiz aslında başarısızlıklarımız.</p>
      <p>Bu yazıda, girişimcilik yolculuğumda yaptığım en büyük hataları ve bunlardan çıkardığım dersleri paylaşacağım.</p>
      <h3>İlk Büyük Hatam</h3>
      <p>İlk şirketimi kurarken yaptığım en büyük hata, müşteri araştırması yapmadan ürün geliştirmeye başlamaktı...</p>
    `,
    author: "Zirve Hikayem",
    publishDate: "2024-01-20",
    category: "Kişisel Gelişim",
    tags: ["başarısızlık", "ders", "deneyim"],
    readTime: "6 dakika",
    featured: false
  },
  {
    id: 3,
    title: "Motivasyonu Yüksek Tutmanın 5 Yolu",
    slug: "motivasyonu-yuksek-tutmanin-5-yolu",
    excerpt: "Zor günlerde motivasyonumu nasıl yüksek tuttuğuma dair pratik öneriler.",
    content: `
      <p>Motivasyon, başarıya giden yolda en önemli yakıtımız. Ancak her zaman yüksek seviyede tutmak kolay değil.</p>
      <p>İşte benim yıllar içinde geliştirdiğim 5 etkili yöntem:</p>
      <h3>1. Günlük Rutinler</h3>
      <p>Her sabah aynı rutinle güne başlamak, zihninizi hazır hale getirir...</p>
    `,
    author: "Zirve Hikayem",
    publishDate: "2024-02-01",
    category: "Motivasyon",
    tags: ["motivasyon", "rutinler", "başarı"],
    readTime: "5 dakika",
    featured: true
  },
  {
    id: 4,
    title: "Teknoloji ve İnsan İlişkileri",
    slug: "teknoloji-ve-insan-iliskileri",
    excerpt: "Dijital çağda insan ilişkilerini nasıl koruyabiliriz? Deneyimlerim ve önerilerim.",
    content: `
      <p>Teknolojinin hayatımıza bu kadar hızlı girmesiyle birlikte insan ilişkilerimiz de değişti.</p>
      <p>Bu değişimin olumlu ve olumsuz yönlerini ele alıp, sağlıklı bir denge kurmanın yollarını paylaşıyorum.</p>
    `,
    author: "Zirve Hikayem",
    publishDate: "2024-02-10",
    category: "Yaşam Tarzı",
    tags: ["teknoloji", "ilişkiler", "denge"],
    readTime: "7 dakika",
    featured: false
  },
  {
    id: 5,
    title: "2024 Hedeflerim ve Stratejilerim",
    slug: "2024-hedeflerim-ve-stratejilerim",
    excerpt: "Yeni yıl için belirlediğim hedefler ve bunlara ulaşmak için geliştirdiğim stratejiler.",
    content: `
      <p>2024 yılına girerken belirlediğim hedefleri ve bu hedeflere ulaşmak için oluşturduğum stratejileri sizlerle paylaşmak istiyorum.</p>
      <p>Belki siz de kendi hedeflerinizi belirlerken ilham alabilirsiniz.</p>
    `,
    author: "Zirve Hikayem",
    publishDate: "2024-01-01",
    category: "Planlama",
    tags: ["hedefler", "planlama", "strateji"],
    readTime: "4 dakika",
    featured: false
  }
];

export const mockCategories = [
  "Tümü",
  "Girişimcilik", 
  "Kişisel Gelişim",
  "Motivasyon",
  "Yaşam Tarzı",
  "Planlama"
];

export const mockAboutContent = {
  title: "Zirve Hikayem",
  subtitle: "Her deneyim bir hikaye, her hikaye bir ders",
  description: `
    Merhaba, ben Zirve Hikayem! Bu platformda hayatımın farklı dönemlerinde yaşadığım deneyimleri, 
    girişimcilik yolculuğumda karşılaştığım zorlukları ve başarıları, kişisel gelişim serüvenimde 
    öğrendiklerimi sizlerle paylaşıyorum.
    
    Amacım, kendi hikayelerim aracılığıyla sizlere ilham vermek ve belki de benzer yollardan geçenler 
    için rehber olmak. Çünkü inanıyorum ki her deneyim bir ders, her ders ise yeni bir başlangıç.
  `,
  mission: "İnsanların kendi potansiyellerini keşfetmelerine yardımcı olmak ve başarı yolculuklarında yanlarında olmak.",
  values: [
    "Samimi ve dürüst paylaşımlar",
    "Sürekli öğrenme ve gelişim",
    "Topluma değer katma",
    "İlham verici içerik üretimi"
  ]
};