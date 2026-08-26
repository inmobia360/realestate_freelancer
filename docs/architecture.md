# Arquitectura del Sistema - Property Marketing Hub (Habita AI)
> Basado en las Directrices y Buenas Prácticas del **Curso Codex** (Architecture-as-Code, Ciberseguridad y Despliegue en Hostinger).

## 1. Visión General
**Property Marketing Hub** es una plataforma SaaS B2B especializada en el sector Real Estate para España (Madrid, Barcelona, Sevilla, Valencia, Canarias). Integra:
- Motor de Inteligencia Artificial para generación de copys comerciales en 10 formatos sin alucinaciones (Zero Hallucination).
- Calculadora Financiera de Inversión Inmobiliaria (Cap Rate, Cash-Flow neto, ROI).
- Lead Scoring Predictivo y cualificación de inversores.
- Mapa Territorial Interactivo con geolocalización de activos y cálculo de rentabilidad.
- Generación de landings públicas optimizadas y exportación de dossiers PDF con QR y foto/marca del asesor.

---

## 2. Pila Tecnológica (Tech Stack)
- **Framework Frontend/Fullstack:** Next.js 16 (App Router + Turbopack + React 19).
- **Estilizado & Tokens:** Tailwind CSS v4 con variables CSS semánticas para Modo Claro (WCAG AAA) y Modo Oscuro futurista.
- **Iconografía:** Lucide React.
- **Mapas:** Google Maps JavaScript API & Canvas Map Fallback interactivo de alta fidelidad territorial.
- **Exportación PDF:** jsPDF + autoTable para folletos OpenHouse y fichas comerciales A4 a doble cara.
- **Gestión de Estado:** React Context (`AppContext`, `ThemeContext`) con persistencia reactiva en `localStorage`.
- **Despliegue & Hosting:** Hostinger Web Hosting con exportación estática (`next build` / `out`) y sincronización automatizada vía FTP SSL (`upload_to_ftp.js`).

---

## 3. Principios de Ciberseguridad (Checklist Codex de 11 Puntos)
1. **Sanitización de Entradas:** Validación y escape estricto de todos los inputs en formularios de propiedades, captación de leads y filtros.
2. **Segregación de Credenciales:** Variables de entorno (`.env.local` / `.env.production`) para llaves API públicas y tokens; nunca se exponen credenciales de servidor en el bundle de cliente.
3. **Control de Fugas de Información:** Mensajes de error controlados en la interfaz de usuario sin exponer trazas de depuración o rutas internas del servidor.
4. **Política de Dependencias Seguras:** Auditoría periódica de paquetes mediante estándares del inspector de skills y revisión de seguridad (Socket / Snyk).
5. **Comunicaciones Seguras:** Despliegue en Hostinger bajo forzado de HTTPS / TLS 1.3.
6. **Zero Hallucination Guardrails:** Los motores de IA generan texto acotado estrictamente a los parámetros numéricos y técnicos suministrados en la ficha del inmueble.
7. **Privacidad de Contactos:** Números y correos de demostración formateados bajo estándares protegidos (`+34 000 000 000`, `tu-nombre@tu-empresa.com`).
