import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hasApiKey: !!process.env.DIFY_API_KEY,
    hasBaseUrl: !!process.env.DIFY_API_URL,
    baseUrl: process.env.DIFY_API_URL,
    // APIキーは最初の数文字のみ表示
    apiKeyPreview: process.env.DIFY_API_KEY?.slice(0, 8) + "...",
    nodeEnv: process.env.NODE_ENV,
    hasGoogleForm: !!process.env.NEXT_PUBLIC_GOOGLE_FORM_URL,
  });
}