
'use client';

import { textToSpeech } from '@/ai/flows/tts-flow';
import { Loader2, Volume2 } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

interface AudioPlayerProps {
  text: string;
}

// Client-side cache to store generated audio
const audioCache = new Map<string, string>();

export function AudioPlayer({ text }: AudioPlayerProps) {
  const [audioData, setAudioData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const generateAudio = async () => {
      if (audioCache.has(text)) {
        if (isMounted) {
          setAudioData(audioCache.get(text)!);
          setIsLoading(false);
        }
        return;
      }

      try {
        if (isMounted) {
          setIsLoading(true);
        }
        const response = await textToSpeech(text);
        if (isMounted) {
          audioCache.set(text, response.media);
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
      // Stop audio when component unmounts
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [text]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioData && audioElement) {
      if (audioElement.src !== audioData) {
        audioElement.src = audioData;
      }
      
      const playPromise = audioElement.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.warn("Audio autoplay was blocked by the browser.", error)
          setIsPlaying(false);
        });
      }

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      audioElement.addEventListener('play', handlePlay);
      audioElement.addEventListener('pause', handlePause);
      audioElement.addEventListener('ended', handlePause);

      return () => {
        audioElement.removeEventListener('play', handlePlay);
        audioElement.removeEventListener('pause', handlePause);
        audioElement.removeEventListener('ended', handlePause);
      }
    }
  }, [audioData]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  }

  return (
    <div className="absolute top-20 right-4 z-50">
      {isLoading ? (
        <div className="p-2 rounded-full bg-slate-100 border flex items-center justify-center h-9 w-9">
          <Loader2 className="h-5 w-5 text-primary animate-spin" />
        </div>
      ) : (
        <>
          <audio ref={audioRef} className="hidden" />
          <button onClick={togglePlay} className="p-2 rounded-full bg-slate-100 border hover:bg-slate-200 transition-colors flex items-center justify-center h-9 w-9">
            <Volume2 className={`h-5 w-5 ${isPlaying ? 'text-primary' : 'text-slate-500'}`} />
          </button>
        </>
      )}
    </div>
  );
}
