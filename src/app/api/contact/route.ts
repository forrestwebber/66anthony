
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log('Contact form submission:', body);
  return NextResponse.json({ message: 'Form submitted successfully' });
}
