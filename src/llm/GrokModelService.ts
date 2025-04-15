import axios, { AxiosResponse } from 'axios';
import * as z from 'zod';
import {GROK_API_URL, GROK_KEY} from "./Grok";

const ModelsResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      object: z.literal('model'),
    })
  ),
  object: z.literal('list'),
});

type ModelsResponse = z.infer<typeof ModelsResponseSchema>;

export const getGrokModels = async (): Promise<ModelsResponse>  => {
    try {
      const response: AxiosResponse = await axios.get(`${GROK_API_URL}/models`, {
        headers: {
          Authorization: `Bearer ${GROK_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      // Validate response with Zod
      return ModelsResponseSchema.parse(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to fetch models: ${error.response?.data?.error || error.message}`);
      }
      throw new Error(`Unexpected error: ${error}`);
    }
}

export default getGrokModels;