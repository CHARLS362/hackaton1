import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI({ apiKey: 'AIzaSyDoTnkpgSKYch5k3PHR0ndovszlw94CW1M' })],
  model: 'googleai/gemini-2.5-flash',
});
