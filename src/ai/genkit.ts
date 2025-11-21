import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI({ apiKey: 'AIzaSyB4KveIkzDsKqf55R0joh3kIpfm0BVlJ' })],
  model: 'googleai/gemini-2.5-flash',
});
