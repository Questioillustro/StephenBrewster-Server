export interface IPrompt {
  prompt: string;
  temperature?: number;
  model?: string;
  systemContext?: string;
}

export interface IImagePrompt {
  model?: string;
  size?: '1024x1024' | '256x256' | '512x512' | '1792x1024' | '1024x1792' | null | undefined;
  quality?: 'standard' | 'hd' | undefined;
  imageCount?: number;
  prompt: string;
}
