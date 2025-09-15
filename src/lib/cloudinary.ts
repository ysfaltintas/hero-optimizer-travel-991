import { v2 as cloudinary } from 'cloudinary';

// Cloudinary configuration using environment variables
export const cloudinaryConfig = {
  cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dwi7o19nn',
  api_key: import.meta.env.VITE_CLOUDINARY_API_KEY || '549144472596919',
  api_secret: import.meta.env.VITE_CLOUDINARY_API_SECRET || 'AnNiPOszr1R0YCelomUmi9IyuBM',
  folder: import.meta.env.VITE_CLOUDINARY_FOLDER || 'test'
};

// Initialize Cloudinary (for server-side usage)
cloudinary.config(cloudinaryConfig);

// Frontend upload function using unsigned upload
export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ml_default'); // You might need to create this preset in Cloudinary dashboard
  formData.append('folder', cloudinaryConfig.folder);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

// Generate Cloudinary URL with transformations
export const getCloudinaryUrl = (publicId: string, transformations?: string) => {
  const baseUrl = `https://res.cloudinary.com/${cloudinaryConfig.cloud_name}/image/upload`;
  return transformations ? `${baseUrl}/${transformations}/${publicId}` : `${baseUrl}/${publicId}`;
};

export default cloudinary;