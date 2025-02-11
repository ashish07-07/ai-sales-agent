
import { NextRequest } from 'next/server';
import prisma from '@/app/db';
import { createGroq } from '@ai-sdk/groq';
import { streamText, createDataStreamResponse } from 'ai';

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {

    const productDetails = await prisma.itemDetails.findMany();
    const sanitizedProducts = productDetails.map((val: any) => ({
      name: val.itemName,
      description: val.description,
      stock: val.stock,
      price: val.cost,
    }));

 
    const body = await req.json();
    console.log("Received body:", body); // Debugging

    const messages = Array.isArray(body.messages) ? body.messages : [];

    const systemMessage = {
      role: 'system',
      content: `You are an AI sales assistant. Use this product data to answer: ${JSON.stringify(
        sanitizedProducts
      )}. Be persuasive but honest. Keep responses under 3 sentences.`,
    };

    // Check if messages array is valid before continuing
    if (!messages.length) {
      console.warn("Warning: Empty or invalid messages array");
    }

    // Start streaming response with additional data
    return createDataStreamResponse({
      execute: (dataStream) => {
        dataStream.writeData({ status: 'Initializing AI response...' });

        const result = streamText({
          model: groq('llama3-70b-8192'),
          messages: [systemMessage, ...messages],
          onChunk() {
            dataStream.writeMessageAnnotation({ chunk: 'Processing...' });
          },
          onFinish() {
            dataStream.writeMessageAnnotation({
              id: `msg_${Date.now()}`,
              timestamp: new Date().toISOString(),
            });

            dataStream.writeData({ status: 'Response complete' });
          },
        });

        result.mergeIntoDataStream(dataStream);
      },
      onError: (error) => {
        console.error("Streaming error:", error);
        return error instanceof Error ? error.message : 'Unknown error';
      },
    });
  } catch (e: any) {
    console.error('Error:', e);
    return new Response(JSON.stringify({ error: 'Failed to process request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
