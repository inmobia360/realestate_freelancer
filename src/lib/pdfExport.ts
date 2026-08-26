import { jsPDF } from 'jspdf';
import { Property, UserProfile } from '../types';

export function exportPropertyPDF(property: Property, agent: UserProfile): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const currencySymbol = property.currency === 'EUR' ? '€' : property.currency === 'USD' ? '$' : '£';

  // ==========================================
  // PAGE 1: FRONT (PORTADA DE IMPACTO & OPEN HOUSE)
  // ==========================================

  // 1. Top Brand Header Bar
  doc.setFillColor(10, 25, 47); // #0A192F
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Gradient Accent Line
  doc.setFillColor(0, 102, 255); // #0066FF
  doc.rect(0, 28, pageWidth / 2, 2, 'F');
  doc.setFillColor(123, 44, 191); // #7B2CBF
  doc.rect(pageWidth / 2, 28, pageWidth / 2, 2, 'F');

  // Brand Name & Subtitle
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('REALESTATE CONNECT', 14, 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184);
  doc.text('HUB & MARKETING PLATFORM | OPEN HOUSE BROCHURE', 14, 20);

  // Agency & Agent Quick Info on top right
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text(agent.agencyName || 'AGENCIA EXCLUSIVA', pageWidth - 14, 13, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(200, 210, 230);
  doc.text(`Tel: ${agent.phone || '+34 000 000 000'} | ${agent.email || 'tu-nombre@tu-empresa.com'}`, pageWidth - 14, 20, { align: 'right' });

  // 2. Open House Banner
  doc.setFillColor(245, 243, 255); // light violet
  doc.setDrawColor(123, 44, 191);
  doc.roundedRect(14, 34, pageWidth - 28, 12, 2, 2, 'FD');
  doc.setTextColor(123, 44, 191);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('✦ JORNADA DE PUERTAS ABIERTAS / OPEN HOUSE EXCLUSIVO', 20, 42);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Visitas privadas bajo confirmación previa', pageWidth - 20, 42, { align: 'right' });

  // 3. Property Title & Price Box
  doc.setTextColor(10, 25, 47);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(property.title, 14, 55);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`${property.address} · ${property.area}, ${property.city} (${property.region || 'España'})`, 14, 62);

  // Price Ribbon
  doc.setFillColor(0, 102, 255);
  doc.roundedRect(pageWidth - 68, 50, 54, 14, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(`${property.price.toLocaleString()} ${currencySymbol}`, pageWidth - 41, 59, { align: 'center' });

  // 4. Main Property Hero Photo Frame
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(14, 68, pageWidth - 28, 88, 3, 3, 'FD');
  
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(`[ Fotografía Principal: ${property.title} ]`, pageWidth / 2, 105, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`Ubicación: ${property.city} · Ref: ${property.id.toUpperCase()}`, pageWidth / 2, 112, { align: 'center' });

  // 5. 4 Highlights Grid
  const highlightWidth = (pageWidth - 28 - 9) / 4;
  const metrics = [
    { label: 'SUPERFICIE', val: `${property.builtArea} m²` },
    { label: 'DORMITORIOS', val: `${property.bedrooms} Hab` },
    { label: 'BAÑOS', val: `${property.bathrooms} Baños` },
    { label: 'CAP RATE EST.', val: '7.8% Anual' }
  ];

  metrics.forEach((m, idx) => {
    const xPos = 14 + (idx * (highlightWidth + 3));
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(xPos, 160, highlightWidth, 18, 2, 2, 'FD');

    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.text(m.label, xPos + (highlightWidth / 2), 166, { align: 'center' });

    doc.setTextColor(0, 102, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(m.val, xPos + (highlightWidth / 2), 174, { align: 'center' });
  });

  // 6. Property Overview / Copy
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(10, 25, 47);
  doc.text('Descripción Comercial & Estilo de Vida', 14, 188);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const splitDesc = doc.splitTextToSize(property.description, pageWidth - 28);
  doc.text(splitDesc.slice(0, 7), 14, 195);

  // Footer Page 1
  doc.setDrawColor(226, 232, 240);
  doc.line(14, 275, pageWidth - 14, 275);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(`RealEstate Connect · Folleto Open House A4 (Cara 1/2) · ${agent.agencyName}`, 14, 282);
  doc.text(`Página 1 de 2`, pageWidth - 14, 282, { align: 'right' });

  // ==========================================
  // PAGE 2: BACK (DETALLES TÉCNICOS & ASESOR)
  // ==========================================
  doc.addPage();

  // Top Header Page 2
  doc.setFillColor(10, 25, 47);
  doc.rect(0, 0, pageWidth, 20, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('DOSSIER TÉCNICO & ASESORAMIENTO INMOBILIARIO', 14, 13);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(200, 210, 230);
  doc.text(`Ref: ${property.id.toUpperCase()}`, pageWidth - 14, 13, { align: 'right' });

  // 1. Secondary Gallery Preview Boxes
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(10, 25, 47);
  doc.text('Espacios Destacados & Acabados', 14, 30);

  const boxW = (pageWidth - 28 - 6) / 2;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, 35, boxW, 40, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text('[ Zona de Día & Salón Panorámico ]', 14 + (boxW / 2), 56, { align: 'center' });

  doc.roundedRect(14 + boxW + 6, 35, boxW, 40, 2, 2, 'FD');
  doc.text('[ Master Suite & Terraza Privada ]', 14 + boxW + 6 + (boxW / 2), 56, { align: 'center' });

  // 2. Features List
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(10, 25, 47);
  doc.text('Equipamiento & Memoria de Calidades', 14, 86);

  const features = property.features.length > 0 ? property.features : [
    'Climatización por conductos frío/calor',
    'Cocina de diseño equipada con electrodomésticos de alta gama',
    'Suelos de tarima noble y carpintería de rotura de puente térmico',
    'Persianas motorizadas y domótica integrada',
    'Plaza de garaje de acceso directo y trastero',
    'Certificación energética de alta eficiencia'
  ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  features.slice(0, 6).forEach((f, idx) => {
    const y = 94 + (idx * 6);
    doc.setTextColor(0, 102, 255);
    doc.text('✓', 16, y);
    doc.setTextColor(51, 65, 85);
    doc.text(f, 22, y);
  });

  // 3. Investment & Financial Model Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(10, 25, 47);
  doc.text('Análisis Financiero & Rentabilidad Estimada', 14, 138);

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, 144, pageWidth - 28, 42, 2, 2, 'FD');

  const rentMonthly = Math.round(property.price * 0.0055);
  const finRows = [
    { label: 'Precio Inmueble:', val: `${property.price.toLocaleString()} €` },
    { label: 'Renta Mensual Estimada:', val: `${rentMonthly.toLocaleString()} € / mes` },
    { label: 'Rentabilidad Bruta Anual:', val: '7.8% - 8.4%' },
    { label: 'Gastos de Comunidad Estimados:', val: '140 € / mes' },
    { label: 'IBI Anual Estimado:', val: '850 € / año' }
  ];

  finRows.forEach((r, idx) => {
    const y = 152 + (idx * 7);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text(r.label, 20, y);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(10, 25, 47);
    doc.text(r.val, pageWidth - 20, y, { align: 'right' });
  });

  // 4. Agent Dedicated Contact Card
  doc.setFillColor(10, 25, 47);
  doc.roundedRect(14, 196, pageWidth - 28, 52, 3, 3, 'F');

  doc.setFillColor(123, 44, 191);
  doc.roundedRect(20, 202, 40, 40, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(agent.name.charAt(0) || 'A', 40, 226, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text(agent.name, 66, 212);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184);
  doc.text(`Consultor Inmobiliario · ${agent.agencyName}`, 66, 218);
  doc.text(`Teléfono Directo: ${agent.phone || '+34 000 000 000'}`, 66, 225);
  doc.text(`Email: ${agent.email || 'tu-nombre@tu-empresa.com'}`, 66, 232);
  doc.text(`Área de Operaciones: Madrid, Barcelona, Sevilla, Valencia, Canarias`, 66, 239);

  // QR Code Placeholder on Right
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(pageWidth - 48, 202, 28, 28, 2, 2, 'F');
  doc.setTextColor(10, 25, 47);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('SCAN QR', pageWidth - 34, 214, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.text('Ficha Web', pageWidth - 34, 220, { align: 'center' });

  // Footer Page 2
  doc.setDrawColor(226, 232, 240);
  doc.line(14, 275, pageWidth - 14, 275);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(`RealEstate Connect · Folleto Open House A4 (Cara 2/2) · Apto para impresión a doble cara`, 14, 282);
  doc.text(`Página 2 de 2`, pageWidth - 14, 282, { align: 'right' });

  // Save the PDF
  const safeFilename = `OpenHouse_${property.title.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 30)}.pdf`;
  doc.save(safeFilename);
}
