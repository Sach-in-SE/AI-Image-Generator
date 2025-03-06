import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import ImagePromptForm from './components/ImagePromptForm';
import ImageGallery from './components/ImageGallery';
import ErrorMessage from './components/ErrorMessage';
import { generateImage } from './services/stableHorde';
import { GeneratedImage, ImageStyle } from './types';

function App() {
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = async (prompt: string, style: ImageStyle, size: string) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const newImage = await generateImage({ prompt, style, size });
      setImages((prevImages) => [newImage, ...prevImages]);
    } catch (err: any) {
      console.error('Error generating image:', err);
      setError(err.message || 'Failed to generate image. Please try again later.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeleteImage = (id: string) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== id));
  };

  const dismissError = () => {
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="bottom-right" />
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Amazing Images with AI</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Enter a detailed description, choose your style preferences, and let our AI generate stunning images in seconds.
            </p>
          </div>
          
          <ImagePromptForm 
            onGenerate={handleGenerateImage} 
            isGenerating={isGenerating} 
          />
        </section>
        
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Generated Images</h2>
            {images.length > 0 && (
              <span className="text-sm text-gray-500">
                {images.length} {images.length === 1 ? 'image' : 'images'} generated
              </span>
            )}
          </div>
          
          <ImageGallery 
            images={images} 
            onDeleteImage={handleDeleteImage} 
          />
        </section>
      </main>
      
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-80">
            AI Image Generator © {new Date().getFullYear()} | Developed by Sachin Kumar
          </p>
          <p className="text-xs opacity-60 mt-2">
            Images are generated using artificial intelligence and may not represent real people or places.
          </p>
        </div>
      </footer>
      
      {error && <ErrorMessage message={error} onDismiss={dismissError} />}
    </div>
  );
}

export default App;