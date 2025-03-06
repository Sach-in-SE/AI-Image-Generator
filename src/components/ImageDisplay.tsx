import React from 'react';
import { DownloadIcon, TrashIcon } from 'lucide-react';
import { GeneratedImage } from '../types';

interface ImageDisplayProps {
  image: GeneratedImage;
  onDelete: (id: string) => void;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ image, onDelete }) => {
  const handleDownload = async () => {
    try {
      // Fetch the image as a blob
      const response = await fetch(image.url);
      if (!response.ok) throw new Error('Failed to download image');
      
      const blob = await response.blob();
      
      // Create a blob URL
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `ai-image-${image.id}.png`;
      
      // Append to body, click, and cleanup
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Revoke the blob URL to free up memory
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Failed to download image. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div className="relative group">
        <img 
          src={image.url} 
          alt={image.prompt} 
          className="w-full h-64 object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button 
            onClick={handleDownload}
            className="bg-white text-gray-800 p-2 rounded-full mx-2 hover:bg-gray-100 transition-colors"
            title="Download image"
          >
            <DownloadIcon size={20} />
          </button>
          <button 
            onClick={() => onDelete(image.id)}
            className="bg-white text-red-500 p-2 rounded-full mx-2 hover:bg-gray-100 transition-colors"
            title="Delete image"
          >
            <TrashIcon size={20} />
          </button>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-semibold">Style:</span> {image.style.replace('-', ' ')}
        </p>
        <p className="text-sm text-gray-800 line-clamp-2">{image.prompt}</p>
        <p className="text-xs text-gray-500 mt-2">
          {new Date(image.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ImageDisplay;