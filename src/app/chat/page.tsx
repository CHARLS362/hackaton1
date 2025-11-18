'use client';
import { ChatInterface } from '@/components/chat/chat-interface';
import { AudioPlayer } from '@/components/layout/audio-player';

export default function ChatPage() {
  const pageDescription =
    'Bienvenido al Asistente de IA. Haz cualquier pregunta sobre el ecosistema, la contaminación y los esfuerzos de conservación del Lago Titicaca. Estoy aquí para darte respuestas basadas en datos científicos.';
  return (
    <>
      <AudioPlayer text={pageDescription} />
      <ChatInterface />
    </>
  );
}
