import { NextRequest, NextResponse } from "next/server";

const DIFY_API_KEY = process.env.NEXT_PUBLIC_DIFY_API_KEY;
const DIFY_BASE_URL = process.env.NEXT_PUBLIC_DIFY_BASE_URL;

export async function POST(request: NextRequest) {
  if (!DIFY_API_KEY) {
    return NextResponse.json(
      { error: "Dify API key is not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${DIFY_BASE_URL}/chat-messages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${DIFY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: {},
        query: message,
        response_mode: "blocking",
        conversation_id: "",
        user: "user"
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Dify API error:", response.status, errorText);
      return NextResponse.json(
        { error: "Failed to get response from chatbot" },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json({
      answer: data.answer,
      conversation_id: data.conversation_id,
      model: data.model || data.metadata?.model_name,
      usage: data.metadata?.usage,
    });

  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
