'use client';

import { useEffect, useRef } from 'react';

interface AudioPlayerProps {
  src: string;
}

export function AudioPlayer({ src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => console.error("Audio playback failed:", error));
    }
  }, [src]);

  return <audio ref={audioRef} src={src} className="hidden" />;
}
