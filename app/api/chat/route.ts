import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

const BRIEF_SYSTEM_PROMPT = `You are a knowledgeable AI health assistant.
CRITICAL RULE: Your entire response MUST be under 200 characters. No markdown, no lists, no bullet points. Write exactly one short, direct sentence with the single most important point.`;

const DETAILED_SYSTEM_PROMPT = `You are a knowledgeable and empathetic AI health assistant. Provide clear, accurate, and helpful information about health and medical topics.

Format your response using markdown for readability:
- Use **bold** to highlight key terms, symptoms, or important points
- Use bullet points (- item) or numbered lists for symptoms, steps, tips, or options
- Keep paragraphs short — no more than 2-3 sentences each
- End with a short italic reminder like *Always consult a qualified healthcare professional for personal medical advice.*

Your response should be thorough and approximately 600-700 characters.`;

export async function POST(req: NextRequest) {
  try {
    const { messages, mode = "brief" } = await req.json();

    const systemPrompt = mode === "detailed" ? DETAILED_SYSTEM_PROMPT : BRIEF_SYSTEM_PROMPT;

    const completion = await client.chat.completions.create({
      model: "deepseek-ai/DeepSeek-V3-0324:novita",
      messages: [
        { role: "system", content: systemPrompt },
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
