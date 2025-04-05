import { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  title: 'Meme Creator - Create and Share Memes Online',
  description: 'Create, customize, and share memes with our easy-to-use meme creator. Add text, images, and effects to make your perfect meme in seconds.',
  keywords: 'meme creator, meme maker, create memes, custom memes, meme generator, online meme maker',
  authors: [{ name: 'Meme Creator Team' }],
  creator: 'Meme Creator',
  publisher: 'Meme Creator',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://meme-creator.sassflair.com',
    title: 'Meme Creator - Create and Share Memes Online',
    description: 'Create, customize, and share memes with our easy-to-use meme creator. Add text, images, and effects to make your perfect meme in seconds.',
    siteName: 'Meme Creator',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Meme Creator - Create and Share Memes Online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meme Creator - Create and Share Memes Online',
    description: 'Create, customize, and share memes with our easy-to-use meme creator. Add text, images, and effects to make your perfect meme in seconds.',
    images: ['/twitter-image.jpg'],
    creator: '@memecreator',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
}; 