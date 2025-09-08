import React, { useState, useEffect } from 'react';
import { aboutAPI, handleAPIError } from '../services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Target, Heart, Users, Lightbulb, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const AboutPage = () => {
  const [aboutContent, setAboutContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const iconMap = {
    0: Target,
    1: Lightbulb,
    2: Users,
    3: Heart
  };

  useEffect(() => {
    loadAboutContent();
  }, []);

  const loadAboutContent = async () => {
    try {
      setLoading(true);
      const content = await aboutAPI.getAboutContent();
      setAboutContent(content);
    } catch (error) {
      console.error('Error loading about content:', error);
      toast.error(handleAPIError(error, 'Hakkımda sayfası yüklenirken bir hata oluştu'));
      
      // Use fallback content if API fails
      setAboutContent({
        title: "Zirve Hikayem",
        subtitle: "Her deneyim bir hikaye, her hikaye bir ders",
        description: `
          Merhaba, ben Aydın Kocatürk! Bu platformda hayatımın farklı dönemlerinde yaşadığım deneyimleri, 
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
      });
    } finally {
      setLoading(false);
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

  if (!aboutContent) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-4xl">Z</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            {aboutContent.title}
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            {aboutContent.subtitle}
          </p>
        </div>

        {/* About Content */}
        <Card className="mb-12 border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800">Hikayem</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {aboutContent.description.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-slate-700 leading-relaxed">
                {paragraph.trim()}
              </p>
            ))}
          </CardContent>
        </Card>

        {/* Mission */}
        <Card className="mb-12 border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800 flex items-center">
              <Target className="h-6 w-6 mr-2 text-slate-600" />
              Misyonum
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 leading-relaxed text-lg">
              {aboutContent.mission}
            </p>
          </CardContent>
        </Card>

        {/* Values */}
        <Card className="mb-12 border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800">Değerlerim</CardTitle>
            <CardDescription>
              Bu platformda paylaştığım içeriklerin temelini oluşturan değerler
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aboutContent.values.map((value, index) => {
                const IconComponent = iconMap[index] || Target;
                return (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-slate-50 rounded-lg">
                    <IconComponent className="h-6 w-6 text-slate-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 font-medium">{value}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Topics */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800">Yazı Konularım</CardTitle>
            <CardDescription>
              Bu blogda hangi konularda yazılar bulabilirsiniz
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {[
                'Girişimcilik',
                'Kişisel Gelişim', 
                'Motivasyon',
                'Yaşam Deneyimleri',
                'İş Dünyası',
                'Başarı Hikayeleri',
                'Öğrenme',
                'İlham Verici Anılar',
                'Strateji',
                'Planlama'
              ].map((topic) => (
                <Badge key={topic} variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200">
                  {topic}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-white rounded-lg shadow-sm border-0">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Benimle İletişime Geçin
          </h2>
          <p className="text-slate-600 mb-6 max-w-xl mx-auto">
            Sorularınız, önerileriniz veya işbirliği teklifleriniz için 
            benimle iletişime geçmekten çekinmeyin.
          </p>
          <a 
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition-colors duration-200"
          >
            İletişime Geç
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;