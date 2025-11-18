'use server';
/**
 * @fileOverview A conversational AI flow for answering questions about Lake Titicaca.
 *
 * - getLakeTiticacaInfo - A function that provides expert answers on the lake's environmental status.
 * - LakeChatInput - The input type for the getLakeTiticacaInfo function.
 * - LakeChatOutput - The return type for the getLakeTiticacaInfo function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const LakeChatInputSchema = z.object({
  question: z
    .string()
    .describe('The user\'s question about Lake Titicaca.'),
});
export type LakeChatInput = z.infer<typeof LakeChatInputSchema>;

export const LakeChatOutputSchema = z.object({
  answer: z
    .string()
    .describe(
      'A detailed and informative answer to the user\'s question.'
    ),
  sources: z
    .array(z.string().url())
    .describe('A list of URLs for the scientific papers or articles used as sources.'),
});
export type LakeChatOutput = z.infer<typeof LakeChatOutputSchema>;

const lakeTiticacaExpertPrompt = ai.definePrompt({
  name: 'lakeTiticacaExpertPrompt',
  input: { schema: LakeChatInputSchema },
  output: { schema: LakeChatOutputSchema },
  prompt: `Eres un asistente de IA experto y un científico ambiental especializado en el ecosistema del Lago Titicaca. Tu propósito es proporcionar respuestas detalladas, precisas y educativas sobre la prevención, control y reversión de la contaminación en el lago.

Basa tus respuestas únicamente en información verificable de artículos científicos, trabajos de investigación, informes de organizaciones ambientales y datos gubernamentales.

Cuando respondas a la pregunta del usuario, sigue estas directrices:
1.  **Analiza la pregunta:** Comprende la intención del usuario, ya sea que pregunten sobre causas, efectos, soluciones, actores involucrados, etc.
2.  **Sintetiza la información:** Proporciona una respuesta clara y bien estructurada. Explica conceptos complejos (como eutrofización, metales pesados, biorremediación) en términos comprensibles pero sin simplificar en exceso.
3.  **Cita tus fuentes:** Al final de tu respuesta, incluye una lista de las URLs de los artículos o informes que utilizaste para formular tu respuesta. Es crucial que las fuentes sean reales y relevantes.

Pregunta del usuario:
{{{question}}}
`,
});

const getLakeTiticacaInfoFlow = ai.defineFlow(
  {
    name: 'getLakeTiticacaInfoFlow',
    inputSchema: LakeChatInputSchema,
    outputSchema: LakeChatOutputSchema,
  },
  async (input) => {
    const { output } = await lakeTiticacaExpertPrompt(input);
    return output!;
  }
);

export async function getLakeTiticacaInfo(
  input: LakeChatInput
): Promise<LakeChatOutput> {
  return getLakeTiticacaInfoFlow(input);
}
