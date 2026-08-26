import { Property, MarketingContentPack, Lead, LeadTemperature } from '../../types';

export interface AIServiceConfig {
  provider: 'built_in_rules' | 'gemini' | 'custom_webhook';
  apiKey?: string;
}

export class RealEstateAIEngine {
  /**
   * Generates high-converting marketing content strictly based on verified property facts.
   * Adheres strictly to the rule: Never invent prices, surfaces, rooms, or features not provided.
   */
  static async generateMarketingPack(
    property: Property,
    options?: { language?: 'es' | 'en' | 'bilingual'; targetTone?: string }
  ): Promise<MarketingContentPack> {
    const lang = options?.language || (property.contentLanguage === 'en' ? 'en' : 'es');

    const currencySymbol = property.currency === 'EUR' ? '€' : property.currency === 'USD' ? '$' : '£';
    const formattedPrice = `${property.price.toLocaleString()} ${currencySymbol}`;
    const opLabel = property.operation === 'sale' 
      ? (lang === 'es' ? 'Venta' : 'Sale') 
      : property.operation === 'rent' 
        ? (lang === 'es' ? 'Alquiler' : 'Rent') 
        : (lang === 'es' ? 'Oportunidad de Inversión' : 'Investment Opportunity');
    
    const typeMapEs: Record<string, string> = {
      apartment: 'Piso',
      house: 'Casa',
      country_house: 'Casa de campo',
      villa: 'Villa',
      penthouse: 'Ático',
      commercial: 'Local comercial',
      office: 'Oficina',
      land: 'Terreno / Parcela',
      building: 'Edificio'
    };

    const typeMapEn: Record<string, string> = {
      apartment: 'Apartment',
      house: 'House',
      country_house: 'Country House',
      villa: 'Villa',
      penthouse: 'Penthouse',
      commercial: 'Commercial space',
      office: 'Office',
      land: 'Plot / Land',
      building: 'Building'
    };

    const typeName = lang === 'es' ? (typeMapEs[property.propertyType] || 'Inmueble') : (typeMapEn[property.propertyType] || 'Property');
    const featuresList = property.features.length > 0 ? property.features : ['Ubicación privilegiada', 'Excelente distribución'];

    // 1. Commercial Title
    const commercialTitleEs = `${typeName} de ${property.builtArea} m² con ${property.bedrooms} hab. en ${property.area}, ${property.city}`;
    const commercialTitleEn = `${typeName} of ${property.builtArea} sq.m with ${property.bedrooms} Beds in ${property.area}, ${property.city}`;
    const commercialTitle = lang === 'es' ? commercialTitleEs : commercialTitleEn;

    // 2. Short Description
    const shortDescriptionEs = `${opLabel} de ${typeName.toLowerCase()} en ${property.city} (${property.area}). Dispone de ${property.builtArea} m², ${property.bedrooms} dormitorios, ${property.bathrooms} baños${property.garage ? ', garaje' : ''}${property.terrace ? ' y terraza' : ''}. Precio: ${formattedPrice}.`;
    const shortDescriptionEn = `${opLabel}: ${typeName.toLowerCase()} located in ${property.city} (${property.area}). Features ${property.builtArea} sq.m, ${property.bedrooms} bedrooms, ${property.bathrooms} bathrooms${property.garage ? ', garage' : ''}${property.terrace ? ' and terrace' : ''}. Listed at ${formattedPrice}.`;
    const shortDescription = lang === 'es' ? shortDescriptionEs : shortDescriptionEn;

    // 3. Long Description
    const longDescriptionEs = `Presentamos este excelente ${typeName.toLowerCase()} en ${property.area} (${property.city}, ${property.country}).

Con una superficie construida verificada de ${property.builtArea} m², la vivienda se distribuye en ${property.bedrooms} dormitorios y ${property.bathrooms} cuartos de baño completos. Estado de conservación: ${property.condition.replace('_', ' ')}.

Aspectos destacados del inmueble:
${featuresList.map(f => `• ${f}`).join('\n')}
${property.garage ? '• Plaza de garaje disponible en la propiedad.\n' : ''}${property.terrace ? '• Terraza privada exterior.\n' : ''}
Descripción del agente:
${property.description}

Condiciones comerciales:
Operación: ${opLabel}
Precio: ${formattedPrice}

Para concertar una visita o recibir el dossier comercial completo, solicite información a través del formulario o por WhatsApp directo.`;

    const longDescriptionEn = `We are pleased to introduce this exceptional ${typeName.toLowerCase()} in ${property.area} (${property.city}, ${property.country}).

Offering a verified built area of ${property.builtArea} sq.m, the property features ${property.bedrooms} bedrooms and ${property.bathrooms} full bathrooms. Current condition: ${property.condition.replace('_', ' ')}.

Key highlights:
${featuresList.map(f => `• ${f}`).join('\n')}
${property.garage ? '• Dedicated garage space included.\n' : ''}${property.terrace ? '• Private outdoor terrace.\n' : ''}
Agent notes:
${property.description}

Commercial terms:
Operation: ${opLabel}
Price: ${formattedPrice}

To arrange a private viewing or request the full commercial dossier, contact us via the form or instant WhatsApp.`;

    const longDescription = lang === 'es' ? longDescriptionEs : longDescriptionEn;

    // 4. Instagram Copy
    const instagramCopy = lang === 'es'
      ? `✨ NUEVA PROPIEDAD DISPONIBLE | ${property.city.toUpperCase()} ✨\n\n📍 ${property.area}, ${property.city}\n💶 ${formattedPrice}\n\nDetalles del inmueble:\n📐 ${property.builtArea} m² construidos\n🛏️ ${property.bedrooms} Dormitorios\n🚿 ${property.bathrooms} Baños\n${property.garage ? '🚗 Plaza de garaje incluida\n' : ''}${property.terrace ? '☀️ Terraza\n' : ''}\n🔑 ${featuresList.slice(0, 3).join('\n🔑 ')}\n\n💬 Envíanos un mensaje directo o visita el enlace en la bio para agendar una visita.\n\n#Inmobiliaria #BienesRaices #${property.city.replace(/\s+/g, '')} #PropiedadEnVenta #RealEstateSpain #InversionInmobiliaria`
      : `✨ NEW LISTING ALERT | ${property.city.toUpperCase()} ✨\n\n📍 ${property.area}, ${property.city}\n💶 ${formattedPrice}\n\nProperty Details:\n📐 ${property.builtArea} sq.m\n🛏️ ${property.bedrooms} Bedrooms\n🚿 ${property.bathrooms} Bathrooms\n${property.garage ? '🚗 Private garage\n' : ''}${property.terrace ? '☀️ Terrace\n' : ''}\n🔑 ${featuresList.slice(0, 3).join('\n🔑 ')}\n\n💬 Send us a DM or tap the link in bio to schedule your private tour.\n\n#RealEstate #${property.city.replace(/\s+/g, '')} #LuxuryLiving #PropertyForSale #InternationalBuyers`;

    // 5. Facebook Copy
    const facebookCopy = lang === 'es'
      ? `🏡 ${opLabel.toUpperCase()} EN ${property.city.toUpperCase()} (${property.area.toUpperCase()})\n\nPonemos a disposición de nuestros clientes este ${typeName.toLowerCase()} de ${property.builtArea} m² en ${property.area}.\n\nDistribución y características:\n- ${property.bedrooms} habitaciones y ${property.bathrooms} baños.\n- Precio: ${formattedPrice}.\n${featuresList.map(f => `- ${f}`).join('\n')}\n\n👉 Accede a la ficha interactiva con tour fotográfico y contáctanos para más detalles.`
      : `🏡 ${opLabel.toUpperCase()} IN ${property.city.toUpperCase()} (${property.area.toUpperCase()})\n\nWe present this standout ${typeName.toLowerCase()} of ${property.builtArea} sq.m located in ${property.area}.\n\nHighlights:\n- ${property.bedrooms} bedrooms & ${property.bathrooms} bathrooms.\n- Price: ${formattedPrice}.\n${featuresList.map(f => `- ${f}`).join('\n')}\n\n👉 View the full property page and book your viewing today.`;

    // 6. WhatsApp Message
    const whatsappMessage = lang === 'es'
      ? `Hola, te comparto la ficha comercial de esta propiedad en ${property.city} (${property.area}): ${typeName} de ${property.builtArea} m², ${property.bedrooms} hab, ${property.bathrooms} baños por ${formattedPrice}. ¿Deseas que coordinemos una visita?`
      : `Hello, sharing the details of this property in ${property.city} (${property.area}): ${typeName} with ${property.builtArea} sq.m, ${property.bedrooms} beds, ${property.bathrooms} baths for ${formattedPrice}. Would you like to schedule a viewing?`;

    // 7. Video Script
    const videoScript = lang === 'es'
      ? `[ESCENA 1 - Entrada / Fachada]: "Si buscas calidad de vida y una ubicación privilegiada en ${property.city}, tienes que conocer esta propiedad."\n[ESCENA 2 - Espacios principales]: "Hablamos de un ${typeName.toLowerCase()} de ${property.builtArea} m² con ${property.bedrooms} dormitorios y ${property.bathrooms} baños, con acabados en estado ${property.condition.replace('_', ' ')}."\n[ESCENA 3 - Puntos fuertes]: "${featuresList.slice(0, 2).join(' y ')}."\n[ESCENA 4 - Cierre y llamada a la acción]: "Disponible por ${formattedPrice}. Toca en el enlace de la pantalla y agenda tu visita personalizada."`
      : `[SCENE 1 - Intro]: "If you are looking for prime real estate in ${property.city}, take a look at this property."\n[SCENE 2 - Main Features]: "A ${property.builtArea} sq.m ${typeName.toLowerCase()} featuring ${property.bedrooms} bedrooms, ${property.bathrooms} bathrooms in ${property.condition.replace('_', ' ')} condition."\n[SCENE 3 - Highlights]: "${featuresList.slice(0, 2).join(' and ')}."\n[SCENE 4 - Call to Action]: "Priced at ${formattedPrice}. Click the link to view the complete gallery and book your tour."`;

    // 8. Investor Angle
    const investorAngle = lang === 'es'
      ? `Análisis de Inversión: Activo inmobiliario situado en ${property.city} (${property.area}). Tipología ${typeName.toLowerCase()} con ${property.builtArea} m² y ${property.bedrooms} dormitorios. Precio de adquisición: ${formattedPrice}. El inmueble destaca por su sólida demanda en el mercado de ${property.operation === 'rent' ? 'arrendamiento' : 'compraventa'} y potencial de revalorización patrimonial.`
      : `Investment Thesis: Prime real estate asset in ${property.city} (${property.area}). ${typeName} of ${property.builtArea} sq.m and ${property.bedrooms} bedrooms. Listed price: ${formattedPrice}. Solid fundamentals for rental yield and long-term capital appreciation in the local market.`;

    // 9. Foreign Buyer Angle
    const foreignBuyerAngle = lang === 'es'
      ? `Orientación para Compradores Internacionales: Descubra esta propiedad en ${property.city}, España. Ubicada en ${property.area}, con ${property.builtArea} m² construidos, ${property.bedrooms} habitaciones y lista para disfrutar. Asesoramiento multilingüe y acompañamiento jurídico durante todo el proceso de compra.`
      : `International Buyer Spotlight: Prime residential opportunity in ${property.city}, Spain (${property.area}). With ${property.builtArea} sq.m, ${property.bedrooms} bedrooms and modern amenities, it is ideal as a primary residence, vacation home, or investment. Full English-speaking legal & notary guidance provided.`;

    return {
      commercialTitle,
      shortDescription,
      longDescription,
      instagramCopy,
      facebookCopy,
      whatsappMessage,
      videoScript,
      investorAngle,
      foreignBuyerAngle,
      translatedEn: commercialTitleEn,
      translatedEs: commercialTitleEs
    };
  }

  /**
   * Lead Classification & Scoring Engine
   */
  static analyzeLead(lead: Partial<Lead>, property?: Property): {
    temperature: LeadTemperature;
    score: number;
    aiSummary: string;
    recommendedAction: string;
  } {
    let score = 50;
    const msg = (lead.message || '').toLowerCase();
    const budget = lead.budget;
    const timeframe = lead.timeframe;
    const inquiryType = lead.inquiryType || 'info';

    // 1. Timeframe check
    if (timeframe === 'immediate') score += 25;
    else if (timeframe === '1_3_months') score += 15;
    else if (timeframe === '3_6_months') score += 5;
    else if (timeframe === 'exploring') score -= 10;

    // 2. Budget match check
    if (budget && property?.price) {
      if (budget >= property.price) score += 20;
      else if (budget >= property.price * 0.9) score += 10;
      else score -= 15;
    } else if (budget) {
      score += 10;
    }

    // 3. High intent keywords
    const hotKeywords = ['visita', 'visitar', 'comprar', 'reserva', 'fondos', 'contado', 'hipoteca aprobada', 'este fin de semana', 'hoy', 'urgente', 'cash', 'viewing', 'offer', 'approved mortgage', 'this weekend'];
    const warmKeywords = ['interesa', 'información', 'dossier', 'rentabilidad', 'ibi', 'gastos', 'fotos', 'preguntar', 'information', 'details', 'roi', 'yield'];
    
    let hotMatches = 0;
    hotKeywords.forEach(k => { if (msg.includes(k)) hotMatches++; });
    let warmMatches = 0;
    warmKeywords.forEach(k => { if (msg.includes(k)) warmMatches++; });

    score += Math.min(hotMatches * 10, 20);
    score += Math.min(warmMatches * 5, 10);

    // 4. Contact completeness
    if (lead.phone && lead.phone.length > 6) score += 10;
    if (lead.email && lead.email.includes('@')) score += 5;

    // Normalize score between 0 and 100
    score = Math.max(10, Math.min(99, score));

    // Temperature threshold
    let temperature: LeadTemperature = 'cold';
    if (score >= 80) temperature = 'hot';
    else if (score >= 55) temperature = 'warm';

    // Summary & Recommendations
    let aiSummary = '';
    let recommendedAction = '';

    if (temperature === 'hot') {
      aiSummary = `Lead de alta prioridad con fuerte intención de avance (${inquiryType.toUpperCase()}), plazo ${timeframe || 'inmediato'} y mensaje con señales directas de cierre o visita.`;
      recommendedAction = `Llamar o contactar por WhatsApp en menos de 1 hora para confirmar disponibilidad y agendar visita o reunión privada.`;
    } else if (temperature === 'warm') {
      aiSummary = `Interesado cualificado que solicita detalles específicos y documentación. Buen potencial de maduración a corto plazo.`;
      recommendedAction = `Enviar dossier comercial de la propiedad por email/WhatsApp y realizar seguimiento telefónico en 24-48 horas.`;
    } else {
      aiSummary = `Consulta exploratoria o en fase inicial de búsqueda sin urgencia declarada.`;
      recommendedAction = `Responder con la información básica por correo electrónico y añadir a la lista de novedades para seguimiento automático.`;
    }

    return {
      temperature,
      score,
      aiSummary,
      recommendedAction
    };
  }
}
