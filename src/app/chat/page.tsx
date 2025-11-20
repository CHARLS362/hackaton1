'use client';
import { ChatInterface } from '@/components/chat/chat-interface';
import Aurora from '@/components/ui/aurora';

export default function ChatPage() {
  return (
    <div className="relative w-full h-full">
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      <div className="relative z-10">
        <ChatInterface />
      </div>
    </div>
  );
}
