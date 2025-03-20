export interface IPrompt {
  model?: string;
  systemContext?: string;
  prompt: string;
}

export interface IImagePrompt {
  model?: string;
  size?: '1024x1024' | '256x256' | '512x512' | '1792x1024' | '1024x1792' | null | undefined;
  quality?: 'standard' | 'hd' | undefined;
  imageCount?: number;
  prompt: string;
}
