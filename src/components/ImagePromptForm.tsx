import React, { useState } from 'react';
import { Wand2Icon, LoaderIcon } from 'lucide-react';
import { ImageStyle } from '../types';

interface ImagePromptFormProps {
  onGenerate: (prompt: string, style: ImageStyle, size: string) => Promise<void>;
  isGenerating: boolean;
}

const ImagePromptForm: React.FC<ImagePromptFormProps> = ({ onGenerate, isGenerating }) => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState<ImageStyle>('photorealistic');
  const [size, setSize] = useState('512x512');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      await onGenerate(prompt, style, size);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="mb-6">
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
          Describe the image you want to generate
        </label>
        <textarea
          id="prompt"
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          placeholder="A futuristic cityscape with flying cars and neon lights..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-2">
            Image Style
          </label>
          <select
            id="style"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={style}
            onChange={(e) => setStyle(e.target.value as ImageStyle)}
          >
            <option value="photorealistic">Photorealistic</option>
            <option value="cartoon">Cartoon</option>
            <option value="digital-art">Digital Art</option>
            <option value="sketch">Sketch</option>
            <option value="painting">Painting</option>
          </select>
        </div>

        <div>
          <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
            Image Size
          </label>
          <select
            id="size"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="512x512">Medium (512x512)</option>
            <option value="768x768">Large (768x768)</option>
            <option value="384x384">Small (384x384)</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <button
          type="submit"
          disabled={isGenerating || !prompt.trim()}
          className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-medium transition-colors ${
            isGenerating || !prompt.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
          }`}
        >
          {isGenerating ? (
            <>
              <LoaderIcon className="animate-spin mr-2" size={20} />
              Generating...
            </>
          ) : (
            <>
              <Wand2Icon className="mr-2" size={20} />
              Generate Image
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ImagePromptForm;