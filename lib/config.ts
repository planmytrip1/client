// lib/config.ts
export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5005/api',
  imageUrl: process.env.NEXT_PUBLIC_IMAGE_URL || 'http://localhost:5005/api/images',
};