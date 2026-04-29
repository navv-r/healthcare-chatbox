import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const completion = await client.chat.completions.create({
      model: "deepseek-ai/DeepSeek-V3-0324:novita",
      messages: [
        {
          role: "system",
          content:
            "You are a knowledgeable and empathetic AI health assistant. Provide clear, accurate, and helpful information about health and medical topics. Always remind users to consult a qualified healthcare professional for personal medical advice, diagnosis, or treatment.",
        },
        ...messages,
      ],
    });

    const reply = completion.choices[0].message.content ?? "Sorry, I couldn't generate a response.";
    return NextResponse.json({ message: reply });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
