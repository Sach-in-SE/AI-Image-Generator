import React from 'react';
import { GeneratedImage } from '../types';
import ImageDisplay from './ImageDisplay';
import { ImageIcon } from 'lucide-react';

interface ImageGalleryProps {
  images: GeneratedImage[];
  onDeleteImage: (id: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onDeleteImage }) => {
  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <ImageIcon size={64} className="mb-4 opacity-30" />
        <h3 className="text-xl font-medium mb-2">No images yet</h3>
        <p className="text-center max-w-md">
          Enter a description above and click "Generate Image" to create your first AI-generated image.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image) => (
        <ImageDisplay 
          key={image.id} 
          image={image} 
          onDelete={onDeleteImage} 
        />
      ))}
    </div>
  );
};

export default ImageGallery;