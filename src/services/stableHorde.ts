import { ImageGenerationParams } from '../types';

const API_URL = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0';
const API_KEY = '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';

// Map our app's style options to prompt enhancements
const styleToPrompt: Record<string, string> = {
  'photorealistic': 'photorealistic, highly detailed, 8k resolution',
  'cartoon': 'cartoon style, vibrant colors, cel shaded',
  'digital-art': 'digital art style, detailed, trending on artstation',
  'sketch': 'pencil sketch, detailed linework, hand-drawn style',
  'painting': 'oil painting style, artistic, detailed brushstrokes'
};

const generateImage = async (params: ImageGenerationParams) => {
  try {
    console.log('Starting image generation with Hugging Face...');
    
    const { prompt, style, size } = params;
    const [width, height] = size.split('x').map(Number);
    
    // Enhance prompt with style
    const enhancedPrompt = `${prompt}, ${styleToPrompt[style] || ''}`;
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: enhancedPrompt,
        parameters: {
          width: width,
          height: height,
          num_inference_steps: 30,
          guidance_scale: 7.5,
          negative_prompt: 'blurry, bad quality, distorted, disfigured'
        }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Hugging Face API error: ${error}`);
    }

    // The response is a binary blob
    const imageBlob = await response.blob();
    const imageUrl = URL.createObjectURL(imageBlob);

    return {
      id: crypto.randomUUID(),
      url: imageUrl,
      prompt: params.prompt,
      style: params.style,
      size: params.size,
      createdAt: new Date()
    };
  } catch (error: any) {
    console.error('Error generating image:', error);
    
    if (error.message.includes('429')) {
      throw new Error('Too many requests. Please try again later.');
    } else if (error.message.includes('401')) {
      throw new Error('Invalid API key. Please check your configuration.');
    } else if (error.message) {
      throw new Error(`Hugging Face API error: ${error.message}`);
    } else {
      throw new Error('Failed to generate image. Please try again later.');
    }
  }
};

export { generateImage };