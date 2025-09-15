import React, { useState } from 'react';
import { CloudinaryUpload } from '@/components/upload/CloudinaryUpload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getCloudinaryUrl } from '@/lib/cloudinary';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CloudinaryDemo = () => {
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const handleUpload = (url: string) => {
    setUploadedUrls(prev => [...prev, url]);
  };

  const copyToClipboard = async (url: string, index: number) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedIndex(index);
      toast({
        title: "Kopyalandı",
        description: "URL panoya kopyalandı",
      });
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      toast({
        title: "Hata",
        description: "URL kopyalanırken hata oluştu",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-4">Cloudinary Entegrasyonu</h1>
          <p className="text-muted-foreground">
            Cloudinary ile resim yükleme ve yönetim sistemi aktif. Aşağıdan resimlerinizi yükleyebilirsiniz.
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Resim Yükleme
                <Badge variant="secondary">Aktif</Badge>
              </CardTitle>
              <CardDescription>
                Resimlerinizi yükleyin ve Cloudinary URL'lerini alın
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CloudinaryUpload
                onUpload={handleUpload}
                multiple={true}
                className="mb-4"
              />
            </CardContent>
          </Card>

          {uploadedUrls.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Yüklenen Resimler</CardTitle>
                <CardDescription>
                  Toplam {uploadedUrls.length} resim yüklendi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {uploadedUrls.map((url, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                      <img
                        src={getCloudinaryUrl(url.split('/').pop()?.split('.')[0] || '', 'w_100,h_100,c_fill')}
                        alt={`Upload ${index + 1}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">Resim {index + 1}</p>
                        <p className="text-xs text-muted-foreground truncate">{url}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(url, index)}
                        className="shrink-0"
                      >
                        {copiedIndex === index ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Cloudinary Ayarları</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Cloud Name:</strong> dwi7o19nn
                </div>
                <div>
                  <strong>Folder:</strong> test
                </div>
                <div>
                  <strong>Upload Preset:</strong> ml_default
                </div>
                <div>
                  <strong>Durum:</strong> <Badge variant="secondary">Aktif</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CloudinaryDemo;