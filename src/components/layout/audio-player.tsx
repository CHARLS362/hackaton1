
'use client';

import { textToSpeech } from '@/ai/flows/tts-flow';
import { Loader2 } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

interface AudioPlayerProps {
  text: string;
}

export function AudioPlayer({ text }: AudioPlayerProps) {
  const [audioData, setAudioData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let isMounted = true;
    const generateAudio = async () => {
      try {
        setIsLoading(true);
        const response = await textToSpeech(text);
        if (isMounted) {
          setAudioData(response.media);
        }
      } catch (error) {
        console.error('Error generating audio:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    generateAudio();

    return () => {
      isMounted = false;
    };
  }, [text]);

  useEffect(() => {
    if (audioData && audioRef.current) {
      audioRef.current.src = audioData;
      // Browsers often block autoplay unless there has been user interaction.
      // We'll attempt to play, but it might be silently blocked.
      audioRef.current.play().catch(error => console.warn("Audio autoplay was blocked by the browser.", error));
    }
  }, [audioData]);

  return (
    <div className="absolute top-20 right-4 z-50">
      {isLoading ? (
        <div className="p-2 rounded-full bg-slate-100 border">
          <Loader2 className="h-5 w-5 text-primary animate-spin" />
        </div>
      ) : (
        <audio ref={audioRef} controls={false} className="hidden" />
      )}
    </div>
  );
}
