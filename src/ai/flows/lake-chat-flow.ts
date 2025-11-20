'use server';
/**
 * @fileOverview A conversational AI flow for answering questions about Lake Titicaca.
 *
 * - getLakeTiticacaInfo - A function that provides expert answers on the lake's environmental status.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import fs from 'fs';
import path from 'path';

const LakeChatInputSchema = z.object({
  question: z
    .string()
    .describe('The user\'s question about Lake Titicaca.'),
});
type LakeChatInput = z.infer<typeof LakeChatInputSchema>;

const LakeChatOutputSchema = z.object({
  answer: z
    .string()
    .describe(
      'A detailed and informative answer to the user\'s question.'
    ),
  sources: z
    .array(z.string())
    .describe('A list of URLs for the scientific papers or articles used as sources.'),
});
type LakeChatOutput = z.infer<typeof LakeChatOutputSchema>;

// Load local data
const dataDir = path.join(process.cwd(), 'src', 'data');
const articlesPath = path.join(dataDir, 'articles.json');
const pointsPath = path.join(dataDir, 'point_details.json');

let localContext = '';

try {
  const articlesData = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));
  const pointsData = JSON.parse(fs.readFileSync(pointsPath, 'utf-8'));

  localContext = `
  CONTEXTO DE DATOS LOCALES:
  
  Artículos Científicos Disponibles:
  ${JSON.stringify(articlesData, null, 2)}

  Detalles de Puntos de Monitoreo:
  ${JSON.stringify(pointsData, null, 2)}
  `;
} catch (error) {
  console.error("Error loading local data:", error);
  localContext = "No se pudieron cargar los datos locales.";
}

const lakeTiticacaExpertPrompt = ai.definePrompt({
  name: 'lakeTiticacaExpertPrompt',
  input: { schema: LakeChatInputSchema },
  output: { schema: LakeChatOutputSchema },
  prompt: `Eres un asistente de IA experto y un científico ambiental especializado en el ecosistema del Lago Titicaca. Tu propósito es proporcionar respuestas breves, precisas y educativas sobre la prevención, control y reversión de la contaminación en el lago.

  ${localContext}

  REGLAS ESTRICTAS:
  1.  **TEMA EXCLUSIVO:** SOLO responde preguntas relacionadas con la contaminación, ecología, y conservación del Lago Titicaca. Si la pregunta NO está relacionada (ej. política general, cocina, otros temas), recházala amablemente diciendo que solo puedes hablar sobre el Lago Titicaca y su contaminación.
  2.  **RESPUESTAS CORTAS:** Mantén tus respuestas concisas y directas. Evita parrafadas largas innecesarias.
  3.  **USO DE DATOS:** Prioriza la información del "CONTEXTO DE DATOS LOCALES" proporcionado arriba. Si la respuesta se encuentra en los artículos o puntos de monitoreo, úsalos. Si no, usa tu conocimiento general pero mantén el enfoque en el Titicaca.
  4.  **CITAS:** Si usas información de los artículos del contexto, incluye sus URLs en el campo 'sources'.

  Cuando respondas a la pregunta del usuario, sigue estas directrices:
  1.  **Analiza la pregunta:** Verifica si es sobre el Lago Titicaca y su contaminación. Si no, rechaza.
  2.  **Sintetiza la información:** Respuesta CORTA y al grano.
  3.  **Cita tus fuentes:** URLs de los artículos usados.

Pregunta del usuario:
{{question}}
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
