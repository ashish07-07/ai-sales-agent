

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/db";
import { createGroq } from "@ai-sdk/groq";
import { streamText, createDataStreamResponse } from "ai";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    // Fetch customer feedback from database
    const feedback = await prisma.feedback.findMany();

    console.log(`are this si the feedback ${feedback}`)
    feedback.forEach(function(val:any)
{
        console.log(val.feedback)
})
    if (!feedback.length) {
      return NextResponse.json(
        { summary: "No customer feedback available." },
        { status: 200 }
      );
    }

    const feedbackText = feedback.map((f: any) => f.feedback).join("\n");
    console.log(feedbackText)

    // AI prompt for better summarization
    const systemMessage:any = {
      role: "system",
      content: `Summarize the customer feedback. Provide two key sections: 
      1. **What Went Well** 
      2. **Areas for Improvement** 
      Ensure the summary is clear and concise. Feedback: ${feedbackText}`,
    };

    return createDataStreamResponse({
      execute: (dataStream) => {
        const result = streamText({
          model: groq("llama3-70b-8192"),
          messages: [systemMessage],
          onChunk(chunk) {
            dataStream.writeData({ summary: chunk });
          },
          onFinish() {
            dataStream.writeData({ status: "Feedback analysis complete" });
          },
        });

        result.mergeIntoDataStream(dataStream);
      },
      onError: (error) => {
        console.error("Streaming error:", error);
        return error instanceof Error ? error.message : "Unknown error";
      },
    });
  } catch (e: any) {
    console.error("Error:", e);
    return NextResponse.json(
      { error: "Failed to process feedback analysis" },
      { status: 500 }
    );
  }
}

