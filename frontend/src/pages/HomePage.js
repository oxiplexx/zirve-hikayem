import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogAPI, categoriesAPI, handleAPIError } from '../services/api';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Clock, ArrowRight, Star, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [posts, setPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [categories, setCategories] = useState(['Tümü']);
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(false);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  // Load posts when category changes
  useEffect(() => {
    if (categories.length > 1) { // Only load after categories are loaded
      loadPosts();
    }
  }, [selectedCategory]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      
      // Load categories and featured posts in parallel
      const [categoriesData, featuredData] = await Promise.all([
        categoriesAPI.getCategories(),
        blogAPI.getFeaturedPosts()
      ]);

      setCategories(categoriesData);
      setFeaturedPosts(featuredData);
      
      // Load all posts for initial view
      const allPosts = await blogAPI.getPosts();
      setPosts(allPosts);
      
    } catch (error) {
      console.error('Error loading initial data:', error);
      toast.error(handleAPIError(error, 'Sayfa yüklenirken bir hata oluştu'));
    } finally {
      setLoading(false);
    }
  };

  const loadPosts = async () => {
    try {
      setPostsLoading(true);
      const postsData = await blogAPI.getPosts(selectedCategory);
      setPosts(postsData);
    } catch (error) {
      console.error('Error loading posts:', error);
      toast.error(handleAPIError(error, 'Yazılar yüklenirken bir hata oluştu'));
    } finally {
      setPostsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-slate-800 mx-auto" />
          <p className="text-slate-600">Sayfa yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 leading-tight">
              Zirve <span className="text-slate-600">Hikayem</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Girişimcilik yolculuğum, kişisel gelişim deneyimlerim ve hayatın her alanından 
              öğrendiklerimi paylaştığım kişisel blog platformum.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-slate-800 hover:bg-slate-700 text-white px-8">
                Blog Yazılarını Keşfet
              </Button>
              <Link to="/about">
                <Button variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8">
                  Hakkımda
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 mb-8">
              <Star className="h-6 w-6 text-amber-500" />
              <h2 className="text-3xl font-bold text-slate-800">Öne Çıkan Yazılar</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
                  <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                        {post.category}
                      </Badge>
                      <div className="flex items-center text-sm text-slate-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-slate-600 transition-colors duration-200">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600 leading-relaxed">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">{post.publishDate}</span>
                      <Link to={`/post/${post.slug}`}>
                        <Button variant="ghost" size="sm" className="text-slate-700 hover:text-slate-900 p-0">
                          Devamını Oku
                          <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Filter */}
      <section className="py-8 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                disabled={postsLoading}
                className={`transition-all duration-200 ${
                  selectedCategory === category 
                    ? 'bg-slate-800 text-white hover:bg-slate-700' 
                    : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-800">
              {selectedCategory === 'Tümü' ? 'Tüm Yazılar' : `${selectedCategory} Yazıları`}
            </h2>
            {postsLoading && (
              <Loader2 className="h-6 w-6 animate-spin text-slate-600" />
            )}
          </div>
          
          {postsLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[...Array(4)].map((_, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="h-6 w-20 bg-slate-200 rounded animate-pulse"></div>
                      <div className="h-4 w-16 bg-slate-200 rounded animate-pulse"></div>
                    </div>
                    <div className="h-6 w-3/4 bg-slate-200 rounded animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-slate-200 rounded animate-pulse"></div>
                      <div className="h-4 w-2/3 bg-slate-200 rounded animate-pulse"></div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {posts.map((post) => (
                <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
                  <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="border-slate-300 text-slate-700">
                        {post.category}
                      </Badge>
                      <div className="flex items-center text-sm text-slate-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-slate-600 transition-colors duration-200">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600 leading-relaxed">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">{post.publishDate}</span>
                      <Link to={`/post/${post.slug}`}>
                        <Button variant="ghost" size="sm" className="text-slate-700 hover:text-slate-900 p-0">
                          Devamını Oku
                          <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">Bu kategoride henüz yazı bulunmuyor.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;