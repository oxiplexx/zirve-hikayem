#!/usr/bin/env python3
"""
Seed script to populate database with initial blog posts
"""
import asyncio
import os
import sys
sys.path.append('/app/backend')

from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def seed_database():
    """Seed database with mock blog posts"""
    
    # Connect to MongoDB
    mongo_url = os.environ.get('MONGO_URL')
    db_name = os.environ.get('DB_NAME', 'zirvehikayem')
    
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    print("🔗 Connected to MongoDB")
    
    def generate_slug(title: str) -> str:
        """Generate URL-friendly slug from title"""
        import re
        slug = title.lower()
        turkish_chars = {
            'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
            'Ç': 'c', 'Ğ': 'g', 'İ': 'i', 'Ö': 'o', 'Ş': 's', 'Ü': 'u'
        }
        for turkish, english in turkish_chars.items():
            slug = slug.replace(turkish, english)
        
        slug = re.sub(r'[^a-z0-9\s-]', '', slug)
        slug = re.sub(r'\s+', '-', slug)
        slug = re.sub(r'-+', '-', slug)
        return slug.strip('-')

    def calculate_read_time(content: str) -> str:
        """Calculate estimated reading time"""
        word_count = len(content.split())
        minutes = max(1, round(word_count / 200))
        return f"{minutes} dakika"
    
    # Mock blog posts data
    mock_posts = [
        {
            'title': 'Hayatımın Dönüm Noktası: İlk Girişimim',
            'excerpt': '25 yaşında kurduğum ilk şirketin hikayesi ve bu süreçte öğrendiklerimi paylaşıyorum.',
            'content': '''<p>Merhaba değerli okuyucularım,</p>
<p>Bugün sizlerle hayatımın en önemli dönüm noktalarından birini paylaşmak istiyorum. 25 yaşında kurduğum ilk şirketin hikayesi...</p>
<p>O dönemde üniversiteden yeni mezun olmuştum ve klasik kariyer yolunu takip etmek yerine kendi işimi kurmaya karar verdim. Bu karar kolay olmadı tabii ki.</p>
<p>İlk günlerde karşılaştığım zorluklar, başarısızlıklar ve nihayetinde elde ettiğim başarılar bu yazının konusu.</p>
<h3>Başlangıç</h3>
<p>Girişimcilik yolculuğum aslında bir hayal ile başladı. Üniversite yıllarımda hep farklı fikirler üretir, bunları arkadaşlarımla paylaşırdım...</p>''',
            'category': 'Girişimcilik',
            'tags': ['girişimcilik', 'başarı', 'motivasyon'],
            'featured': True
        },
        {
            'title': 'Başarısızlıktan Öğrendiklerim',
            'excerpt': 'Her başarısızlık aslında bir ders. İşte benim en büyük hatalarımdan çıkardığım dersler.',
            'content': '''<p>Başarısızlık kelimesi çoğumuz için korkutucu. Ancak benim deneyimlerime göre, en büyük öğretmenimiz aslında başarısızlıklarımız.</p>
<p>Bu yazıda, girişimcilik yolculuğumda yaptığım en büyük hataları ve bunlardan çıkardığım dersleri paylaşacağım.</p>
<h3>İlk Büyük Hatam</h3>
<p>İlk şirketimi kurarken yaptığım en büyük hata, müşteri araştırması yapmadan ürün geliştirmeye başlamaktı...</p>''',
            'category': 'Kişisel Gelişim',
            'tags': ['başarısızlık', 'ders', 'deneyim'],
            'featured': False
        },
        {
            'title': 'Motivasyonu Yüksek Tutmanın 5 Yolu',
            'excerpt': 'Zor günlerde motivasyonumu nasıl yüksek tuttuğuma dair pratik öneriler.',
            'content': '''<p>Motivasyon, başarıya giden yolda en önemli yakıtımız. Ancak her zaman yüksek seviyede tutmak kolay değil.</p>
<p>İşte benim yıllar içinde geliştirdiğim 5 etkili yöntem:</p>
<h3>1. Günlük Rutinler</h3>
<p>Her sabah aynı rutinle güne başlamak, zihninizi hazır hale getirir...</p>''',
            'category': 'Motivasyon',
            'tags': ['motivasyon', 'rutinler', 'başarı'],
            'featured': True
        },
        {
            'title': 'Teknoloji ve İnsan İlişkileri',
            'excerpt': 'Dijital çağda insan ilişkilerini nasıl koruyabiliriz? Deneyimlerim ve önerilerim.',
            'content': '''<p>Teknolojinin hayatımıza bu kadar hızlı girmesiyle birlikte insan ilişkilerimiz de değişti.</p>
<p>Bu değişimin olumlu ve olumsuz yönlerini ele alıp, sağlıklı bir denge kurmanın yollarını paylaşıyorum.</p>''',
            'category': 'Yaşam Tarzı',
            'tags': ['teknoloji', 'ilişkiler', 'denge'],
            'featured': False
        },
        {
            'title': '2024 Hedeflerim ve Stratejilerim',
            'excerpt': 'Yeni yıl için belirlediğim hedefler ve bunlara ulaşmak için geliştirdiğim stratejiler.',
            'content': '''<p>2024 yılına girerken belirlediğim hedefleri ve bu hedeflere ulaşmak için oluşturduğum stratejileri sizlerle paylaşmak istiyorum.</p>
<p>Belki siz de kendi hedeflerinizi belirlerken ilham alabilirsiniz.</p>''',
            'category': 'Planlama',
            'tags': ['hedefler', 'planlama', 'strateji'],
            'featured': False
        }
    ]
    
    print('🌱 Seeding database with mock posts...')
    
    # Clear existing posts
    await db.blog_posts.delete_many({})
    
    # Insert mock posts
    for i, post_data in enumerate(mock_posts, 1):
        # Generate slug and read time
        slug = generate_slug(post_data['title'])
        read_time = calculate_read_time(post_data['content'])
        
        # Create complete post document
        post_doc = {
            'id': f'post_{i}',
            'title': post_data['title'],
            'slug': slug,
            'excerpt': post_data['excerpt'],
            'content': post_data['content'],
            'author': 'Zirve Hikayem',
            'publishDate': datetime.now().strftime('%Y-%m-%d'),
            'category': post_data['category'],
            'tags': post_data['tags'],
            'readTime': read_time,
            'featured': post_data['featured'],
            'createdAt': datetime.utcnow(),
            'updatedAt': datetime.utcnow()
        }
        
        # Insert into database
        await db.blog_posts.insert_one(post_doc)
        print(f'✅ Inserted: {post_doc["title"]}')
    
    print(f'🎉 Successfully seeded {len(mock_posts)} blog posts')
    
    # Close connection
    client.close()
    print("🔒 Database connection closed")

if __name__ == "__main__":
    asyncio.run(seed_database())