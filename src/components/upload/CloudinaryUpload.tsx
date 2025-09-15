import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface CloudinaryUploadProps {
  onUpload?: (url: string) => void;
  accept?: string;
  multiple?: boolean;
  className?: string;
}

export const CloudinaryUpload: React.FC<CloudinaryUploadProps> = ({
  onUpload,
  accept = "image/*",
  multiple = false,
  className = ""
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const { toast } = useToast();

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      const uploadPromises = Array.from(files).map(file => uploadToCloudinary(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      
      setUploadedImages(prev => [...prev, ...uploadedUrls]);
      
      uploadedUrls.forEach(url => {
        onUpload?.(url);
      });

      toast({
        title: "Başarılı",
        description: `${uploadedUrls.length} resim başarıyla yüklendi`,
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Resim yükleme başarısız oldu",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  }, [onUpload, toast]);

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="relative">
        <Input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
          id="cloudinary-upload"
        />
        <label htmlFor="cloudinary-upload">
          <Button
            type="button"
            variant="outline"
            disabled={uploading}
            className="w-full cursor-pointer"
            asChild
          >
            <div className="flex items-center gap-2">
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  Yükleniyor...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Resim Yükle
                </>
              )}
            </div>
          </Button>
        </label>
      </div>

      {uploadedImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {uploadedImages.map((url, index) => (
            <Card key={index} className="relative group overflow-hidden">
              <img
                src={url}
                alt={`Uploaded ${index + 1}`}
                className="w-full h-24 object-cover"
              />
              <Button
                size="sm"
                variant="destructive"
                className="absolute top-1 right-1 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="w-3 h-3" />
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};