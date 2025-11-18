'use client';

import { useState } from 'react';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getLakeTiticacaInfo } from '@/ai/flows/lake-chat-flow';
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

// Define the schema and types here, in the client component.
const LakeChatOutputSchema = z.object({
  answer: z
    .string()
    .describe(
      'A detailed and informative answer to the user\'s question.'
    ),
  sources: z
    .array(z.string().url())
    .describe('A list of URLs for the scientific papers or articles used as sources.'),
});
type LakeChatOutput = z.infer<typeof LakeChatOutputSchema>;


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
    <div className="bg-slate-950 min-h-screen">
      <div className="container mx-auto px-4 py-8 pt-24 max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-white">
            ¿Qué quieres saber sobre el Lago Titicaca?
          </h1>
          <p className="text-slate-300 mt-3 text-lg">
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
              className="flex-grow text-base bg-white/10 text-white placeholder:text-slate-400 border-slate-600 focus:ring-blue-400"
            />
            <Button type="submit" disabled={loading} className="w-28 bg-blue-500 hover:bg-blue-600 text-white">
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
            <h3 className="mb-4 text-sm font-semibold text-slate-300">
              Preguntas de investigación sugeridas:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suggestedQuestions.map((q) => (
                <button
                  key={q.text}
                  onClick={() => handleSuggestedQuestionClick(q.text)}
                  className="flex items-center gap-4 p-4 text-left bg-white/5 border border-slate-700 rounded-lg hover:bg-white/10 hover:shadow-sm transition-all text-white"
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
          <Card className="bg-white/5 border-slate-700 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Loader2 className="animate-spin text-primary" />
                Pensando...
              </CardTitle>
              <CardDescription className="text-slate-400">
                Estoy buscando la información más actualizada sobre tu consulta.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-4 bg-slate-700 rounded animate-pulse"></div>
                <div className="h-4 bg-slate-700 rounded animate-pulse w-5/6"></div>
                <div className="h-4 bg-slate-700 rounded animate-pulse w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        )}

        {result && (
          <Alert className='mt-8 animate-fade-in-up bg-white/5 border-slate-700 text-white'>
            <Sparkles className="h-5 w-5 text-primary" />
            <AlertTitle className="font-bold text-xl mb-2">Respuesta</AlertTitle>
            <AlertDescription className="prose prose-sm prose-invert max-w-none text-slate-300">
              <p>{result.answer}</p>
              {result.sources && result.sources.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold text-slate-200">Fuentes:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {result.sources.map((source, index) => (
                      <li key={index}>
                        <a
                          href={source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
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
    </div>
  );
}
