import React from 'react';
import { mockAboutContent } from '../mock';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Target, Heart, Users, Lightbulb } from 'lucide-react';

const AboutPage = () => {
  const iconMap = {
    0: Target,
    1: Lightbulb,
    2: Users,
    3: Heart
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-4xl">Z</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            {mockAboutContent.title}
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            {mockAboutContent.subtitle}
          </p>
        </div>

        {/* About Content */}
        <Card className="mb-12 border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800">Hikayem</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockAboutContent.description.split('\n\n').map((paragraph, index) => (
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
              {mockAboutContent.mission}
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
              {mockAboutContent.values.map((value, index) => {
                const IconComponent = iconMap[index];
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