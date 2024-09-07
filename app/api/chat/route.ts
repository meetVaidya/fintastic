// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { message } = await req.json();

    // TODO: Implement your chatbot logic here.
    //       For now, we'll just return a dummy response.
    const chatbotResponse = `You said: ${message}`;

    return NextResponse.json({ message: chatbotResponse });
}
