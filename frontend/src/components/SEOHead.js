import React from 'react';
import { Helmet } from 'react-helmet';

const SEOHead = ({ 
  title = "Zirve Hikayem - Yeniden Başlamak, Daha Güçlü Yükselmek | Aydın Kocatürk",
  description = "Hayatın inişleri ve çıkışlarından dersler çıkararak yeniden ayağa kalkmanın hikayelerini paylaşıyorum. Kişisel gelişim, girişimcilik, motivasyon ve yaşam deneyimleri.",
  keywords = "zirve hikayem, aydın kocatürk, kişisel gelişim, motivasyon, girişimcilik, yaşam hikayeleri, başarı, ilham, blog, türkiye",
  image = "https://customer-assets.emergentagent.com/job_zirvehikayeleri/artifacts/u9h2xa09_Logo1.png",
  url = "https://zirvehikayem.com",
  type = "website",
  publishedTime,
  modifiedTime,
  author = "Aydın Kocatürk",
  canonicalUrl
}) => {
  const fullTitle = title.includes('Zirve Hikayem') ? title : `${title} | Zirve Hikayem`;
  const fullUrl = url.startsWith('http') ? url : `https://zirvehikayem.com${url}`;
  const canonical = canonicalUrl || fullUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Zirve Hikayem" />
      <meta property="og:locale" content="tr_TR" />
      
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@Aydinkocaturk" />
    </Helmet>
  );
};

export default SEOHead;