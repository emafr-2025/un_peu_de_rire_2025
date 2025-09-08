import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hasApiKey: !!process.env.NEXT_PUBLIC_DIFY_API_KEY,
    hasBaseUrl: !!process.env.NEXT_PUBLIC_DIFY_BASE_URL,
    baseUrl: process.env.NEXT_PUBLIC_DIFY_BASE_URL,
    // APIキーは最初の数文字のみ表示
    apiKeyPreview: process.env.NEXT_PUBLIC_DIFY_API_KEY?.slice(0, 8) + "...",
    nodeEnv: process.env.NODE_ENV,
  });
}