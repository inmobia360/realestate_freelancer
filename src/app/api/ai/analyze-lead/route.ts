import { NextResponse } from 'next/server';
import { RealEstateAIEngine } from '@/lib/ai/engine';
import { Lead, Property } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { lead, property } = body as {
      lead: Partial<Lead>;
      property?: Property;
    };

    if (!lead || !lead.message) {
      return NextResponse.json(
        { error: 'Lead data missing message' },
        { status: 400 }
      );
    }

    const analysis = RealEstateAIEngine.analyzeLead(lead, property);

    return NextResponse.json({
      success: true,
      analysis,
      analyzedAt: new Date().toISOString()
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Unknown Lead analysis error';
    return NextResponse.json(
      { error: errMessage },
      { status: 500 }
    );
  }
}
