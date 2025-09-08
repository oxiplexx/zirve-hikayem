import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogAPI, handleAPIError } from '../services/api';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { ArrowLeft, Clock, Calendar, Tag, Share2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import SEOHead from '../components/SEOHead';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPost();
  }, [slug]);

  const loadPost = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load the main post
      const postData = await blogAPI.getPostBySlug(slug);
      setPost(postData);
      
      // Load related posts (same category, excluding current post)
      const allPosts = await blogAPI.getPosts(postData.category);
      const related = allPosts
        .filter(p => p.id !== postData.id)
        .slice(0, 2);
      setRelatedPosts(related);
      
    } catch (error) {
      console.error('Error loading post:', error);
      if (error.response?.status === 404) {
        setError('Yazı bulunamadı');
      } else {
        setError(handleAPIError(error, 'Yazı yüklenirken bir hata oluştu'));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share && post) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Sayfa bağlantısı panoya kopyalandı!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-slate-800 mx-auto" />
          <p className="text-slate-600">Yazı yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-slate-800">
            {error === 'Yazı bulunamadı' ? 'Yazı Bulunamadı' : 'Hata Oluştu'}
          </h1>
          <p className="text-slate-600">{error}</p>
          <Link to="/">
            <Button className="bg-slate-800 hover:bg-slate-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Ana Sayfaya Dön
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  // Create structured data for blog post
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": "https://customer-assets.emergentagent.com/job_zirvehikayeleri/artifacts/u9h2xa09_Logo1.png",
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Person",
      "name": "Aydın Kocatürk"
    },
    "datePublished": post.publishDate,
    "dateModified": post.updatedAt || post.publishDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://zirvehikayem.com/post/${post.slug}`
    },
    "keywords": post.tags?.join(', '),
    "articleSection": post.category,
    "wordCount": post.content.split(' ').length
  };

  return (
    <>
      <SEOHead 
        title={`${post.title} | Zirve Hikayem`}
        description={post.excerpt}
        keywords={`${post.tags?.join(', ')}, ${post.category.toLowerCase()}, zirve hikayem, aydın kocatürk`}
        url={`/post/${post.slug}`}
        type="article"
        publishedTime={post.publishDate}
        modifiedTime={post.updatedAt || post.publishDate}
        author={post.author}
        image="https://customer-assets.emergentagent.com/job_zirvehikayeleri/artifacts/u9h2xa09_Logo1.png"
      />
      
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Link to="/" className="inline-flex items-center mb-8">
            <Button variant="ghost" className="text-slate-600 hover:text-slate-800 p-0">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Tüm Yazılara Dön
            </Button>
          </Link>

          {/* Article Header */}
          <article className="bg-white rounded-lg shadow-sm border-0 overflow-hidden">
            <div className="p-8 md:p-12">
              <header className="space-y-6 mb-8">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-slate-100 text-slate-800">
                    {post.category}
                  </Badge>
                  {post.featured && (
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                      Öne Çıkan
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
                  {post.title}
                </h1>
                
                <p className="text-xl text-slate-600 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {post.publishDate}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime}
                  </div>
                  <div className="flex items-center">
                    <span>Yazar: {post.author}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                    className="text-slate-500 hover:text-slate-700 p-0"
                  >
                    <Share2 className="h-4 w-4 mr-1" />
                    Paylaş
                  </Button>
                </div>
              </header>

              <Separator className="my-8" />

              {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none text-slate-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <Separator className="my-8" />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center flex-wrap gap-2">
                  <Tag className="h-4 w-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-700 mr-2">Etiketler:</span>
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs border-slate-300 text-slate-600">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </article>

          {/* Related Posts Section */}
          {relatedPosts.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">İlgili Yazılar</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/post/${relatedPost.slug}`}
                    className="block bg-white rounded-lg shadow-sm border-0 p-6 hover:shadow-md transition-shadow duration-200"
                  >
                    <Badge variant="outline" className="mb-3 border-slate-300 text-slate-700">
                      {relatedPost.category}
                    </Badge>
                    <h3 className="font-semibold text-slate-800 mb-2 leading-tight">
                      {relatedPost.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-4 text-xs text-slate-500">
                      <span>{relatedPost.publishDate}</span>
                      <span>{relatedPost.readTime}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPost;