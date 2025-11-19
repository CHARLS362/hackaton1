'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import GradientText from '../ui/gradient-text';

export function Hero() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-background');

  return (
    <section className="relative h-[90vh] min-h-[700px] max-h-[1080px] w-full flex items-center justify-center text-center text-white overflow-hidden">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover object-center"
          data-ai-hint={heroImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-blue-900/40" />
      <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight animate-fade-in-up font-headline text-white">
          Protegiendo el
          <br />
          <GradientText
            colors={["#2dd4bf", "#3b82f6", "#2dd4bf"]}
            animationSpeed={15}
            showBorder={false}
          >
            corazón de los Andes
          </GradientText>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-100 animate-fade-in-up animation-delay-200">
          Una plataforma inteligente para el monitoreo y la preservación del Lago Titicaca, uniendo tecnología y comunidad.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-400">
          <Button
            size="lg"
            className="group rounded-full text-lg px-8 py-6 bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30"
            asChild
          >
            <Link href="/dashboard">
              <MessageSquare className="mr-3 h-6 w-6" />
              Comienza a explorar
              <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
