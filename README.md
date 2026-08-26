# 🏢 Property Marketing Hub — Real Estate SaaS

Plataforma SaaS para agentes inmobiliarios y pequeñas agencias diseñada para automatizar la creación de fichas de propiedades, generar contenidos comerciales multicanal con Inteligencia Artificial (sin alucinaciones), publicar landing pages de alta conversión (`/property/[slug]`), capturar y clasificar leads automáticamente mediante scoring predictivo (Hot, Warm, Cold) y exportar dossiers comerciales en PDF y códigos QR.

---

## 🚀 Inicio Rápido (Quickstart)

### 1. Requisitos Previos
- **Node.js**: v18.0 o superior (recomendado Node 20+)
- **npm**: 9.0 o superior

### 2. Instalación de Dependencias
```bash
cd property-marketing-hub
npm install
```

### 3. Ejecución en Modo Desarrollo
```bash
npm run dev
```
Abre en tu navegador [http://localhost:3000](http://localhost:3000).

### 4. Compilación para Producción
```bash
npm run build
npm run start
```

---

## 🧭 Estructura de Rutas y Páginas

| Ruta | Descripción |
|---|---|
| `/` | **Landing Page Pública**: Presentación comercial del producto SaaS, propuesta de valor, beneficios para agentes inmobiliarios y acceso a la demo interactiva. |
| `/app/dashboard` | **Panel de Control Privado**: Métricas en tiempo real, resumen de propiedades publicadas y borradores, leads prioritarios (Hot Leads), impactos y accesos rápidos. |
| `/app/properties` | **Catálogo de Propiedades**: Listado interactivo con filtros por tipo de operación (Venta, Alquiler, Inversión) y estado comercial (Publicado, Borrador, Reservado, Vendido, etc.). |
| `/app/properties/new` | **Registro de Propiedad**: Formulario completo de 19+ campos técnicos, galería de imágenes y características. |
| `/app/properties/[id]/edit` | **Editor de Propiedad**: Modificación y sincronización en tiempo real de los datos del inmueble. |
| `/app/content-generator` | **Estudio de Contenidos con IA**: Generador de 10 formatos comerciales (Título, Descripciones corta/larga, Instagram, Facebook, WhatsApp, Guion de vídeo, Tesis de inversor, Comprador extranjero, Traducciones) con garantía *Zero Hallucination*. |
| `/app/leads` | **Centro de Leads y Scoring IA**: Clasificación automática (Hot, Warm, Cold), puntuación de 0 a 100, diagnóstico de intención y recomendación de próxima acción comercial. |
| `/app/settings` | **Configuración del Agente**: Identidad corporativa, logo, foto de perfil, datos de contacto, moneda, idioma, aviso legal y cláusula de privacidad RGPD. |
| `/property/[slug]` | **Landing Pública del Inmueble**: Ficha interactiva de alta conversión con galería de fotos, datos verificados, formulario de contacto directo, botón de WhatsApp, generación de código QR y exportación de dossier comercial en PDF. |

---

## 🧠 Arquitectura y Módulos Clave

```text
property-marketing-hub/
├── firestore.rules              # Reglas de seguridad para Cloud Firestore (aislamiento multiusuario)
├── .env.example                 # Plantilla de variables de entorno (Gemini API & Firebase)
├── src/
│   ├── app/
│   │   ├── api/ai/              # Capa de abstracción de endpoints IA backend
│   │   ├── app/                 # Rutas del panel privado del SaaS (Dashboard, Properties, Leads, Content, Settings)
│   │   ├── property/[slug]/     # Landing pública de conversión de cada propiedad
│   │   ├── globals.css          # Estilos globales con Tailwind CSS
│   │   ├── layout.tsx           # Root Layout
│   │   └── page.tsx             # Landing de presentación del SaaS
│   ├── components/
│   │   ├── content/             # AIContentModal y pestañas de edición
│   │   ├── lead/                # LeadCard y LeadCaptureForm
│   │   ├── property/            # PropertyCard y PropertyForm
│   │   ├── ui/                  # Toast notifications y ShareModal (QR, PDF, WhatsApp)
│   │   ├── DashboardHeader.tsx  # Barra superior con notificaciones, selector de idioma y reset demo
│   │   └── Sidebar.tsx          # Menú lateral del dashboard
│   ├── context/
│   │   └── AppContext.tsx       # Estado global reactivo con persistencia y sincronización
│   ├── lib/
│   │   ├── ai/engine.ts         # Motor IA Real Estate (Reglas anti-alucinación + Abstracción Gemini)
│   │   ├── firebase.ts          # Conector para Firebase Authentication y Firestore
│   │   ├── mockData.ts          # Datos ficticios realistas para España y LATAM
│   │   ├── pdfExport.ts         # Generador de dossiers comerciales en PDF con jsPDF
│   │   └── qrGenerator.ts       # Generador de códigos QR vectoriales
│   └── types/
│       └── index.ts             # Modelos de datos TypeScript (UserProfile, Property, Lead, GeneratedContent)
```

---

## 🔒 Modelo de Seguridad y Reglas de Firestore

El proyecto incluye el archivo [`firestore.rules`](file:///c:/Users/ernes/Documents/AI%20Project/Fiverr/property-marketing-hub/firestore.rules) con políticas de control de acceso:
1. **Aislamiento Multiusuario**: Cada agente únicamente puede leer, editar y eliminar sus propias propiedades, leads y contenidos generados.
2. **Acceso Público a Landings**: Los visitantes no autenticados solo tienen permiso de lectura sobre propiedades con `published == true`.
3. **Recepción de Leads con Consentimiento**: Se permite el envío de formularios públicos validando obligatoriamente los campos clave (`name`, `email`, `propertyId`) y el consentimiento explícito (`consent == true`).

---

## 📦 Datos de Demostración Incluidos

El SaaS incluye 5 propiedades precargadas listas para demostraciones comerciales:
1. **Apartment in Ourense, Spain** (`/property/apartment-in-ourense-spain`)
2. **Country house in Castrelo de Miño, Spain** (`/property/country-house-castrelo-de-mino`)
3. **Investment property in Madrid** (`/property/investment-property-in-madrid`)
4. **Apartment for international buyers** (`/property/apartment-for-international-buyers`)
5. **Student rental property** (`/property/student-rental-property`)

Y 4 leads ficticios con distintos perfiles y temperaturas (Comprador caliente, Inversora solvente, Propietario captado, Estudiantes).
