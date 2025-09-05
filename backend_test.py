#!/usr/bin/env python3
"""
Comprehensive Backend API Tests for Zirve Hikayem Blog
Tests all API endpoints with Turkish content and special characters
"""

import requests
import json
import uuid
from datetime import datetime
import sys
import os

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading frontend .env: {e}")
        return None

BASE_URL = get_backend_url()
if not BASE_URL:
    print("❌ Could not get backend URL from frontend/.env")
    sys.exit(1)

API_URL = f"{BASE_URL}/api"
print(f"🔗 Testing API at: {API_URL}")

# Test data with Turkish content and special characters
TURKISH_TEST_DATA = {
    "blog_post": {
        "title": "Girişimcilik Yolculuğumda Öğrendiklerim: Başarı ve Başarısızlık Hikayeleri",
        "excerpt": "Girişimcilik serüvenimde yaşadığım zorluklar, aldığım dersler ve elde ettiğim başarılar hakkında samimi düşüncelerim.",
        "content": """
        Merhaba değerli okuyucularım! Bugün sizlerle girişimcilik yolculuğumda yaşadığım en önemli deneyimleri paylaşmak istiyorum. 
        
        ## İlk Adımlar
        
        Girişimcilik yolculuğuma başladığımda, çok şey bildiğimi sanıyordum. Ancak gerçek hayat bana çok farklı dersler verdi. İlk projemde karşılaştığım zorluklar:
        
        - Müşteri ihtiyaçlarını yanlış analiz etmek
        - Finansal planlamada eksiklikler
        - Ekip yönetimindeki hatalar
        
        ## Öğrendiğim Dersler
        
        Her başarısızlık aslında bir öğrenme fırsatıydı. En değerli derslerim:
        
        1. **Sabır ve Azim**: Başarı bir gecede gelmiyor
        2. **Müşteri Odaklılık**: Her zaman müşteriyi dinlemek gerekiyor
        3. **Sürekli Öğrenme**: Hiçbir zaman öğrenmeyi bırakmamalıyız
        
        ## Başarı Hikayeleri
        
        Tabii ki sadece başarısızlıklar yaşamadım. Küçük başarılarım da oldu:
        
        - İlk 100 müşteriye ulaşmak
        - Ekibimle güçlü bir bağ kurmak  
        - Sürdürülebilir bir iş modeli geliştirmek
        
        ## Sonuç
        
        Girişimcilik kolay değil, ama imkansız da değil. Önemli olan doğru yaklaşım ve sürekli gelişim odaklı olmak.
        
        Sizin de girişimcilik deneyimleriniz var mı? Yorumlarda paylaşırsanız çok memnun olurum! 🚀
        """,
        "category": "Girişimcilik",
        "tags": ["girişimcilik", "başarı", "ders", "deneyim", "motivasyon"],
        "featured": True
    },
    "contact_message": {
        "name": "Mehmet Özkan",
        "email": "mehmet.ozkan@example.com",
        "subject": "Blog yazılarınız hakkında",
        "message": "Merhaba! Blog yazılarınızı çok beğeniyorum. Özellikle girişimcilik konularındaki deneyimleriniz çok değerli. Teşekkürler! 🙏"
    },
    "about_content": {
        "title": "Zirve Hikayem - Kişisel Blog",
        "subtitle": "Her deneyim bir hikaye, her hikaye bir ders",
        "description": "Bu platformda hayatımın farklı dönemlerinde yaşadığım deneyimleri, girişimcilik yolculuğumda karşılaştığım zorlukları ve başarıları paylaşıyorum. Amacım, kendi hikayelerim aracılığıyla sizlere ilham vermek.",
        "mission": "İnsanların kendi potansiyellerini keşfetmelerine yardımcı olmak ve başarı yolculuklarında yanlarında olmak.",
        "values": [
            "Samimi ve dürüst paylaşımlar",
            "Sürekli öğrenme ve gelişim", 
            "Topluma değer katma",
            "İlham verici içerik üretimi"
        ]
    }
}

class APITester:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
        self.created_post_id = None
        self.created_message_id = None
        self.test_results = []
        
    def log_test(self, test_name, success, message="", response_data=None):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if message:
            print(f"   {message}")
        if response_data and not success:
            print(f"   Response: {response_data}")
        print()
        
        self.test_results.append({
            'test': test_name,
            'success': success,
            'message': message
        })
    
    def test_root_endpoint(self):
        """Test API root endpoint"""
        try:
            response = self.session.get(f"{API_URL}/")
            if response.status_code == 200:
                data = response.json()
                if "Zirve Hikayem API" in data.get("message", ""):
                    self.log_test("Root Endpoint", True, f"API version: {data.get('version', 'unknown')}")
                else:
                    self.log_test("Root Endpoint", False, "Unexpected response format", data)
            else:
                self.log_test("Root Endpoint", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Root Endpoint", False, f"Exception: {str(e)}")
    
    def test_get_all_posts(self):
        """Test GET /api/posts - retrieve all posts"""
        try:
            response = self.session.get(f"{API_URL}/posts")
            if response.status_code == 200:
                posts = response.json()
                if isinstance(posts, list):
                    self.log_test("GET All Posts", True, f"Retrieved {len(posts)} posts")
                    
                    # Check if posts have Turkish content
                    turkish_posts = [p for p in posts if any(char in p.get('title', '') for char in 'çğıöşüÇĞIÖŞÜ')]
                    if turkish_posts:
                        self.log_test("Turkish Content Check", True, f"Found {len(turkish_posts)} posts with Turkish characters")
                    else:
                        self.log_test("Turkish Content Check", False, "No posts with Turkish characters found")
                else:
                    self.log_test("GET All Posts", False, "Response is not a list", posts)
            else:
                self.log_test("GET All Posts", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("GET All Posts", False, f"Exception: {str(e)}")
    
    def test_get_featured_posts(self):
        """Test GET /api/posts/featured - get featured posts only"""
        try:
            response = self.session.get(f"{API_URL}/posts/featured")
            if response.status_code == 200:
                posts = response.json()
                if isinstance(posts, list):
                    featured_count = len([p for p in posts if p.get('featured', False)])
                    if featured_count == len(posts):
                        self.log_test("GET Featured Posts", True, f"Retrieved {len(posts)} featured posts")
                    else:
                        self.log_test("GET Featured Posts", False, f"Some posts are not featured: {featured_count}/{len(posts)}")
                else:
                    self.log_test("GET Featured Posts", False, "Response is not a list", posts)
            else:
                self.log_test("GET Featured Posts", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("GET Featured Posts", False, f"Exception: {str(e)}")
    
    def test_create_post(self):
        """Test POST /api/posts - create new post with Turkish content"""
        try:
            response = self.session.post(f"{API_URL}/posts", json=TURKISH_TEST_DATA["blog_post"])
            if response.status_code == 200:
                post = response.json()
                if post.get('id') and post.get('slug'):
                    self.created_post_id = post['id']
                    expected_slug = "girisimcilik-yolculugumda-ogrendiklerim-basari-ve-basarisizlik-hikayeleri"
                    
                    # Check Turkish slug generation
                    if post['slug'] == expected_slug or post['slug'].startswith(expected_slug):
                        self.log_test("CREATE Post with Turkish Content", True, 
                                    f"Created post ID: {post['id']}, Slug: {post['slug']}")
                        
                        # Verify Turkish characters are handled correctly
                        if post['title'] == TURKISH_TEST_DATA["blog_post"]["title"]:
                            self.log_test("Turkish Character Preservation", True, "Turkish characters preserved in title")
                        else:
                            self.log_test("Turkish Character Preservation", False, "Turkish characters not preserved")
                    else:
                        self.log_test("CREATE Post with Turkish Content", False, f"Incorrect slug generation: {post['slug']}")
                else:
                    self.log_test("CREATE Post with Turkish Content", False, "Missing id or slug in response", post)
            else:
                self.log_test("CREATE Post with Turkish Content", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("CREATE Post with Turkish Content", False, f"Exception: {str(e)}")
    
    def test_get_post_by_slug(self):
        """Test GET /api/posts/{slug} - get individual post by slug"""
        if not self.created_post_id:
            self.log_test("GET Post by Slug", False, "No post created to test with")
            return
            
        try:
            # First get the created post to find its slug
            response = self.session.get(f"{API_URL}/posts")
            if response.status_code == 200:
                posts = response.json()
                created_post = next((p for p in posts if p.get('id') == self.created_post_id), None)
                
                if created_post and created_post.get('slug'):
                    slug = created_post['slug']
                    
                    # Now test getting by slug
                    response = self.session.get(f"{API_URL}/posts/{slug}")
                    if response.status_code == 200:
                        post = response.json()
                        if post.get('id') == self.created_post_id:
                            self.log_test("GET Post by Slug", True, f"Retrieved post by slug: {slug}")
                        else:
                            self.log_test("GET Post by Slug", False, "Retrieved wrong post")
                    else:
                        self.log_test("GET Post by Slug", False, f"Status code: {response.status_code}")
                else:
                    self.log_test("GET Post by Slug", False, "Could not find created post or slug")
            else:
                self.log_test("GET Post by Slug", False, "Could not retrieve posts to find slug")
        except Exception as e:
            self.log_test("GET Post by Slug", False, f"Exception: {str(e)}")
    
    def test_update_post(self):
        """Test PUT /api/posts/{id} - update existing post"""
        if not self.created_post_id:
            self.log_test("UPDATE Post", False, "No post created to test with")
            return
            
        try:
            update_data = {
                "title": "Güncellenmiş Başlık: Girişimcilik Deneyimlerim",
                "excerpt": "Bu yazı güncellenmiştir. Yeni içerikler eklendi.",
                "featured": False
            }
            
            response = self.session.put(f"{API_URL}/posts/{self.created_post_id}", json=update_data)
            if response.status_code == 200:
                post = response.json()
                if (post.get('title') == update_data['title'] and 
                    post.get('excerpt') == update_data['excerpt'] and
                    post.get('featured') == update_data['featured']):
                    self.log_test("UPDATE Post", True, f"Successfully updated post: {post['title']}")
                else:
                    self.log_test("UPDATE Post", False, "Post not updated correctly", post)
            else:
                self.log_test("UPDATE Post", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("UPDATE Post", False, f"Exception: {str(e)}")
    
    def test_get_categories(self):
        """Test GET /api/categories - get all categories"""
        try:
            response = self.session.get(f"{API_URL}/categories")
            if response.status_code == 200:
                categories = response.json()
                if isinstance(categories, list) and "Tümü" in categories:
                    self.log_test("GET Categories", True, f"Retrieved categories: {categories}")
                else:
                    self.log_test("GET Categories", False, "Categories format incorrect or missing 'Tümü'", categories)
            else:
                self.log_test("GET Categories", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("GET Categories", False, f"Exception: {str(e)}")
    
    def test_create_contact_message(self):
        """Test POST /api/contact - submit contact form with Turkish characters"""
        try:
            response = self.session.post(f"{API_URL}/contact", json=TURKISH_TEST_DATA["contact_message"])
            if response.status_code == 200:
                result = response.json()
                if "başarıyla gönderildi" in result.get("message", "").lower():
                    self.log_test("CREATE Contact Message", True, f"Message: {result['message']}")
                else:
                    self.log_test("CREATE Contact Message", False, "Unexpected response message", result)
            else:
                self.log_test("CREATE Contact Message", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("CREATE Contact Message", False, f"Exception: {str(e)}")
    
    def test_get_contact_messages(self):
        """Test GET /api/contact - retrieve contact messages"""
        try:
            response = self.session.get(f"{API_URL}/contact")
            if response.status_code == 200:
                messages = response.json()
                if isinstance(messages, list):
                    # Check if our test message is there
                    test_message = next((m for m in messages if m.get('name') == TURKISH_TEST_DATA["contact_message"]["name"]), None)
                    if test_message:
                        self.created_message_id = test_message.get('id')
                        self.log_test("GET Contact Messages", True, f"Retrieved {len(messages)} messages, found test message")
                    else:
                        self.log_test("GET Contact Messages", True, f"Retrieved {len(messages)} messages (test message not found)")
                else:
                    self.log_test("GET Contact Messages", False, "Response is not a list", messages)
            else:
                self.log_test("GET Contact Messages", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("GET Contact Messages", False, f"Exception: {str(e)}")
    
    def test_get_about_content(self):
        """Test GET /api/about - get about page content"""
        try:
            response = self.session.get(f"{API_URL}/about")
            if response.status_code == 200:
                about = response.json()
                if about.get('description') and about.get('mission'):
                    self.log_test("GET About Content", True, f"Retrieved about content: {about.get('title', 'No title')}")
                else:
                    self.log_test("GET About Content", False, "Missing required fields in about content", about)
            else:
                self.log_test("GET About Content", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("GET About Content", False, f"Exception: {str(e)}")
    
    def test_update_about_content(self):
        """Test PUT /api/about - update about page content"""
        try:
            response = self.session.put(f"{API_URL}/about", json=TURKISH_TEST_DATA["about_content"])
            if response.status_code == 200:
                about = response.json()
                if (about.get('title') == TURKISH_TEST_DATA["about_content"]["title"] and
                    about.get('mission') == TURKISH_TEST_DATA["about_content"]["mission"]):
                    self.log_test("UPDATE About Content", True, f"Successfully updated about content")
                else:
                    self.log_test("UPDATE About Content", False, "About content not updated correctly", about)
            else:
                self.log_test("UPDATE About Content", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("UPDATE About Content", False, f"Exception: {str(e)}")
    
    def test_delete_post(self):
        """Test DELETE /api/posts/{id} - delete post"""
        if not self.created_post_id:
            self.log_test("DELETE Post", False, "No post created to test with")
            return
            
        try:
            response = self.session.delete(f"{API_URL}/posts/{self.created_post_id}")
            if response.status_code == 200:
                result = response.json()
                if "deleted successfully" in result.get("message", "").lower():
                    self.log_test("DELETE Post", True, f"Successfully deleted post: {self.created_post_id}")
                    
                    # Verify post is actually deleted
                    verify_response = self.session.get(f"{API_URL}/posts")
                    if verify_response.status_code == 200:
                        posts = verify_response.json()
                        deleted_post = next((p for p in posts if p.get('id') == self.created_post_id), None)
                        if not deleted_post:
                            self.log_test("DELETE Post Verification", True, "Post successfully removed from database")
                        else:
                            self.log_test("DELETE Post Verification", False, "Post still exists in database")
                else:
                    self.log_test("DELETE Post", False, "Unexpected response message", result)
            else:
                self.log_test("DELETE Post", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("DELETE Post", False, f"Exception: {str(e)}")
    
    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Zirve Hikayem Backend API Tests")
        print("=" * 60)
        
        # Test sequence
        self.test_root_endpoint()
        self.test_get_all_posts()
        self.test_get_featured_posts()
        self.test_get_categories()
        self.test_create_post()
        self.test_get_post_by_slug()
        self.test_update_post()
        self.test_create_contact_message()
        self.test_get_contact_messages()
        self.test_get_about_content()
        self.test_update_about_content()
        self.test_delete_post()  # Keep this last to clean up
        
        # Summary
        print("=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        passed = len([r for r in self.test_results if r['success']])
        total = len(self.test_results)
        
        print(f"Total Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        print(f"Success Rate: {(passed/total)*100:.1f}%")
        
        if passed == total:
            print("\n🎉 ALL TESTS PASSED! Backend API is working correctly.")
        else:
            print(f"\n⚠️  {total - passed} tests failed. Check the details above.")
            
        return passed == total

if __name__ == "__main__":
    tester = APITester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)