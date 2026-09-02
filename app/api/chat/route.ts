import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';

export async function POST(request: Request) {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: 'GOOGLE_GENERATIVE_AI_API_KEY is not configured.' },
      { status: 500 },
    );
  }

  const body = (await request.json()) as { prompt?: unknown };

  if (typeof body.prompt !== 'string' || body.prompt.trim() === '') {
    return Response.json(
      { error: 'The request must include a non-empty prompt.' },
      { status: 400 },
    );
  }

  const google = createGoogleGenerativeAI({ apiKey });
  const result = streamText({
    model: google('gemini-3.6-flash'),
    prompt: body.prompt,
  });

  return result.toTextStreamResponse();
}