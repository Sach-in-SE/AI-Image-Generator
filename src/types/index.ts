export type ImageStyle = 'photorealistic' | 'cartoon' | 'digital-art' | 'sketch' | 'painting';

export interface ImageGenerationParams {
  prompt: string;
  style: ImageStyle;
  size: string;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  style: ImageStyle;
  size: string;
  createdAt: Date;
}