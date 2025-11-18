'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  getLakeTiticacaInfo,
  LakeChatOutput,
} from '@/ai/flows/lake-chat-flow';
import { Loader2, Search, Sparkles, Droplet, Fish, Leaf, Zap } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const suggestedQuestions = [
  {
    text: '¿Cuáles son las principales fuentes de contaminación en el Lago Titicaca?',
    icon: Droplet,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    text: '¿Qué impacto tienen los metales pesados en la fauna del lago?',
    icon: Fish,
    color: 'bg-green-100 text-green-600',
  },
  {
    text: 'Explica el problema de la eutrofización y cómo afecta al Titicaca.',
    icon: Leaf,
    color: 'bg-teal-100 text-teal-600',
  },
  {
    text: '¿Qué iniciativas de biorremediación se han propuesto o implementado?',
    icon: Zap,
    color: 'bg-yellow-100 text-yellow-600',
  },
];

export function ChatInterface() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LakeChatOutput | null>(null);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery) return;
    setLoading(true);
    setResult(null);
    try {
      const response = await getLakeTiticacaInfo({ question: searchQuery });
      setResult(response);
    } catch (error) {
      console.error('Error fetching data from AI flow:', error);
      setResult({
        answer: 'Lo siento, ha ocurrido un error al procesar tu pregunta. Por favor, inténtalo de nuevo.',
        sources: [],
      });
    }
    setLoading(false);
  };

  const handleSuggestedQuestionClick = (text: string) => {
    setQuery(text);
    handleSearch(text);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 pt-24 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">
          ¿Qué quieres saber sobre el Lago Titicaca?
        </h1>
        <p className="text-muted-foreground mt-3 text-lg">
          Pregúntame sobre su ecosistema, contaminación, y esfuerzos de conservación.
        </p>
      </div>

      <div className="mb-8">
        <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Escribe tu pregunta aquí..."
            className="flex-grow text-base"
          />
          <Button type="submit" disabled={loading} className="w-28">
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <Search className="mr-2" /> Buscar
              </>
            )}
          </Button>
        </form>
      </div>

      {!result && !loading && (
        <div>
          <h3 className="mb-4 text-sm font-semibold text-muted-foreground">
            Preguntas de investigación sugeridas:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestedQuestions.map((q) => (
              <button
                key={q.text}
                onClick={() => handleSuggestedQuestionClick(q.text)}
                className="flex items-center gap-4 p-4 text-left bg-slate-50 border rounded-lg hover:bg-slate-100 hover:shadow-sm transition-all"
              >
                <div className={`p-2 rounded-lg ${q.color}`}>
                  <q.icon className="w-5 h-5" />
                </div>
                <span className="text-sm">{q.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Loader2 className="animate-spin text-primary" />
              Pensando...
            </CardTitle>
            <CardDescription>
              Estoy buscando la información más actualizada sobre tu consulta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
              <div className="h-4 bg-slate-200 rounded animate-pulse w-5/6"></div>
              <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4"></div>
            </div>
          </CardContent>
        </Card>
      )}

      {result && (
        <Alert className='mt-8 animate-fade-in-up'>
          <Sparkles className="h-5 w-5 text-primary" />
          <AlertTitle className="font-bold text-xl mb-2">Respuesta</AlertTitle>
          <AlertDescription className="prose prose-sm dark:prose-invert max-w-none">
            <p>{result.answer}</p>
            {result.sources && result.sources.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold">Fuentes:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {result.sources.map((source, index) => (
                    <li key={index}>
                      <a
                        href={source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {source}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
