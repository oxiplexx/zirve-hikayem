import React, { useState } from 'react';
import { contactAPI, handleAPIError } from '../services/api';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';
import { Mail, Send, MessageCircle, Phone, Loader2 } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Submit form data to API
      const response = await contactAPI.submitMessage(formData);
      
      // Show success message
      toast.success(response.message || 'Mesajınız başarıyla gönderildi!');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Error submitting contact form:', error);
      const errorMessage = handleAPIError(error, 'Mesaj gönderilirken bir hata oluştu');
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            İletişim
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Sorularınız, önerileriniz veya işbirliği teklifleriniz için 
            benimle iletişime geçin. Size en kısa sürede dönüş yapacağım.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800 flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  E-posta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">zirvehikayem@gmail.com</p>
                <p className="text-sm text-slate-500 mt-2">
                  Genellikle 24 saat içinde yanıtlarım
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800 flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Sosyal Medya
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">@zirvehikayem</p>
                <p className="text-sm text-slate-500 mt-2">
                  Günlük paylaşımlarım için takip edebilirsiniz
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800 flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Çalışma Saatleri
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Pazartesi - Cuma</p>
                <p className="text-slate-600">09:00 - 18:00</p>
                <p className="text-sm text-slate-500 mt-2">
                  Türkiye saati (UTC+3)
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800">
                  Mesaj Gönder
                </CardTitle>
                <CardDescription>
                  Aşağıdaki formu doldurarak benimle iletişime geçebilirsiniz
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Adınız *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        placeholder="Adınız ve soyadınız"
                        className="border-slate-300 focus:border-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        placeholder="ornek@email.com"
                        className="border-slate-300 focus:border-slate-500"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Konu</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      placeholder="Mesajınızın konusu"
                      className="border-slate-300 focus:border-slate-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Mesajınız *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      placeholder="Mesajınızı buraya yazın..."
                      rows={6}
                      className="border-slate-300 focus:border-slate-500 resize-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                        Gönderiliyor...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="h-4 w-4 mr-2" />
                        Mesajı Gönder
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-800">
                Sık Sorulan Sorular
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">
                    Ne kadar sürede yanıt veriyorsunuz?
                  </h3>
                  <p className="text-slate-600">
                    Genellikle mesajlara 24 saat içinde yanıt vermeye çalışırım. 
                    Hafta sonları biraz daha geç yanıtlayabilirim.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">
                    İşbirliği teklifleri kabul ediyor musunuz?
                  </h3>
                  <p className="text-slate-600">
                    Evet, değerlerimle uyumlu ve okuyucularıma değer katacak 
                    işbirliği tekliflerini değerlendiriyorum.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">
                    Misafir yazar olarak yazı gönderebilir miyim?
                  </h3>
                  <p className="text-slate-600">
                    Kaliteli ve özgün içerikler için misafir yazar başvurularını 
                    değerlendiriyorum. Önce benimle iletişime geçin.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;