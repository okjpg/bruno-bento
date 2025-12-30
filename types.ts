export enum SocialPlatform {
  YouTube = 'YouTube',
  Instagram = 'Instagram',
  LinkedIn = 'LinkedIn',
  TikTok = 'TikTok',
  Newsletter = 'Newsletter'
}

export enum AspectRatio {
  Square = "1:1",
  Portrait = "3:4",
  Landscape = "4:3",
  Wide = "16:9",
  Tall = "9:16",
  UltraWide = "21:9",
  StandardLandscape = "3:2",
  StandardPortrait = "2:3"
}

export enum ImageSize {
  OneK = "1K",
  TwoK = "2K",
  FourK = "4K"
}

export interface SaaSProduct {
  name: string;
  description: string;
  status: 'Live' | 'Beta' | 'Coming Soon';
  url?: string;
}

export interface ServiceItem {
  title: string;
  icon: string;
}
