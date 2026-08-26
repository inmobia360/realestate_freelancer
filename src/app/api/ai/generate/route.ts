import { NextResponse } from 'next/server';
import { RealEstateAIEngine } from '@/lib/ai/engine';
import { Property } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { property, language, targetTone } = body as {
      property: Property;
      language?: 'es' | 'en' | 'bilingual';
      targetTone?: string;
    };

    if (!property || !property.title || !property.price) {
      return NextResponse.json(
        { error: 'Property details missing or incomplete' },
        { status: 400 }
      );
    }

    const contentPack = await RealEstateAIEngine.generateMarketingPack(property, {
      language,
      targetTone
    });

    return NextResponse.json({
      success: true,
      content: contentPack,
      generatedAt: new Date().toISOString()
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Unknown AI generation error';
    return NextResponse.json(
      { error: errMessage },
      { status: 500 }
    );
  }
}
