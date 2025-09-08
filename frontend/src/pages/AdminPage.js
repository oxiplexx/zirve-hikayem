import React, { useState, useEffect } from 'react';
import { blogAPI, handleAPIError } from '../services/api';
import { trackAdminAction } from '../components/GoogleAnalytics';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Switch } from '../components/ui/switch';
import { toast } from 'sonner';
import { Plus, Edit3, Trash2, Save, X, Eye, Loader2 } from 'lucide-react';

const AdminPage = () => {
  const [posts, setPosts] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    featured: false
  });

  const categories = ['Girişimcilik', 'Kişisel Gelişim', 'Motivasyon', 'Yaşam Tarzı', 'Planlama'];

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const postsData = await blogAPI.getPosts();
      setPosts(postsData);
    } catch (error) {
      console.error('Error loading posts:', error);
      toast.error(handleAPIError(error, 'Yazılar yüklenirken bir hata oluştu'));
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSwitchChange = (checked) => {
    setFormData(prev => ({
      ...prev,
      featured: checked
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      
      const postData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        featured: formData.featured
      };

      if (editingPost) {
        // Update existing post
        await blogAPI.updatePost(editingPost.id, postData);
        toast.success('Yazı başarıyla güncellendi!');
      } else {
        // Create new post
        await blogAPI.createPost(postData);
        toast.success('Yeni yazı başarıyla eklendi!');
      }

      // Reload posts and reset form
      await loadPosts();
      resetForm();
      
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error(handleAPIError(error, 'Yazı kaydedilirken bir hata oluştu'));
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      tags: '',
      featured: false
    });
    setIsCreating(false);
    setEditingPost(null);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content.replace(/<br>/g, '\n'),
      category: post.category,
      tags: post.tags.join(', '),
      featured: post.featured
    });
    setIsCreating(true);
  };

  const handleDelete = async (post) => {
    if (window.confirm(`"${post.title}" yazısını silmek istediğinizden emin misiniz?`)) {
      try {
        await blogAPI.deletePost(post.id);
        toast.success('Yazı başarıyla silindi!');
        await loadPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
        toast.error(handleAPIError(error, 'Yazı silinirken bir hata oluştu'));
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-slate-800 mx-auto" />
          <p className="text-slate-600">Admin paneli yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Admin Paneli</h1>
          <p className="text-slate-600">Blog yazılarınızı yönetin</p>
        </div>

        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="posts">Yazılar</TabsTrigger>
            <TabsTrigger value="create">
              {editingPost ? 'Yazıyı Düzenle' : 'Yeni Yazı'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-slate-800">Tüm Yazılar ({posts.length})</h2>
              <Button 
                onClick={() => {
                  resetForm();
                  setIsCreating(true);
                }}
                className="bg-slate-800 hover:bg-slate-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Yeni Yazı Ekle
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {posts.map((post) => (
                <Card key={post.id} className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {post.category}
                          </Badge>
                          {post.featured && (
                            <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-800">
                              Öne Çıkan
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-1">
                          {post.title}
                        </h3>
                        <p className="text-slate-600 text-sm mb-2">{post.excerpt}</p>
                        <div className="flex items-center space-x-4 text-xs text-slate-500">
                          <span>{post.publishDate}</span>
                          <span>{post.readTime}</span>
                          <span>{post.tags?.length || 0} etiket</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(`/post/${post.slug}`, '_blank')}
                          className="text-slate-600 hover:text-slate-800"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(post)}
                          className="text-slate-600 hover:text-slate-800"
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(post)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800">
                  {editingPost ? 'Yazıyı Düzenle' : 'Yeni Yazı Oluştur'}
                </CardTitle>
                <CardDescription>
                  {editingPost ? 'Mevcut yazıyı düzenleyin' : 'Yeni bir blog yazısı oluşturun'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Başlık *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      disabled={submitting}
                      placeholder="Yazı başlığını girin"
                      className="border-slate-300 focus:border-slate-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Özet *</Label>
                    <Textarea
                      id="excerpt"
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      required
                      disabled={submitting}
                      placeholder="Yazının kısa bir özetini girin"
                      rows={3}
                      className="border-slate-300 focus:border-slate-500 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Kategori *</Label>
                      <Select 
                        name="category" 
                        value={formData.category} 
                        onValueChange={(value) => 
                          setFormData(prev => ({ ...prev, category: value }))
                        }
                        disabled={submitting}
                      >
                        <SelectTrigger className="border-slate-300">
                          <SelectValue placeholder="Kategori seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tags">Etiketler</Label>
                      <Input
                        id="tags"
                        name="tags"
                        value={formData.tags}
                        onChange={handleInputChange}
                        disabled={submitting}
                        placeholder="etiket1, etiket2, etiket3"
                        className="border-slate-300 focus:border-slate-500"
                      />
                      <p className="text-xs text-slate-500">Etiketleri virgülle ayırın</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={handleSwitchChange}
                      disabled={submitting}
                    />
                    <Label htmlFor="featured">Öne çıkan yazı olarak işaretle</Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">İçerik *</Label>
                    <Textarea
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      required
                      disabled={submitting}
                      placeholder="Yazı içeriğini girin..."
                      rows={15}
                      className="border-slate-300 focus:border-slate-500 resize-none"
                    />
                    <p className="text-xs text-slate-500">
                      HTML etiketleri kullanabilirsiniz (h3, p, strong, em vb.)
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    <Button 
                      type="submit"
                      disabled={submitting}
                      className="bg-slate-800 hover:bg-slate-700 disabled:opacity-50"
                    >
                      {submitting ? (
                        <div className="flex items-center">
                          <Loader2 className="animate-spin h-4 w-4 mr-2" />
                          {editingPost ? 'Güncelleniyor...' : 'Kaydediliyor...'}
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Save className="h-4 w-4 mr-2" />
                          {editingPost ? 'Güncelle' : 'Yayınla'}
                        </div>
                      )}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={resetForm}
                      disabled={submitting}
                      className="border-slate-300 text-slate-700 hover:bg-slate-50"
                    >
                      <X className="h-4 w-4 mr-2" />
                      İptal
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;