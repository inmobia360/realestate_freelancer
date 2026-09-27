# Guía operativa de marca — Inmobia 360

## Fuente de referencia

Dirección consolidada desde el brief de identidad del repositorio, las capturas del sitio y el logotipo de referencia compartido por el usuario. El usuario confirmó el logotipo **sin subtítulo** y aportó el PNG transparente del isotipo. Ese PNG, preservado en `public/brand/inmobia360-isotipo-original.png`, es la fuente gráfica aprobada. La implementación `BrandIcon` de GitHub confirma la misma construcción geométrica en SVG.

## Identidad

- **Nombre:** Inmobia 360 (también aparece como Inmobia360 en dominios y código; en lockups de marca conservar el espacio si así figura en el logo maestro).
- **Descriptor:** opcional para usos editoriales; no forma parte del logotipo principal solicitado. No incluir “TECNOLOGÍA INMOBILIARIA 360°” en el lockup maestro.
- **Promesa visual:** agencia digital inmobiliaria de bolsillo: profesional, clara, segura y útil para agentes independientes y pequeñas agencias.
- **Tono:** experto, cercano, directo y transparente. Menos papeleo; más tiempo para visitas y ventas. Evitar absolutismos.

## Logotipo mostrado en las referencias

- Símbolo circular con torre azul, casa navy, cuatro ventanas naranjas, anillo orbital turquesa y nodo naranja.
- Lockup horizontal sin subtítulo: isotipo circular a la izquierda, “Inmobia” en navy y “360” en naranja.
- En fondos blancos el símbolo aparece sobre fondo limpio, no dentro de un bloque oscuro sólido.
- Para favicon/avatar, simplificar a la silueta de casa y aro/color distintivo; eliminar descriptor y texto.

El PNG aprobado mide 1254 × 1254 px y tiene transparencia alfa. Es la fuente maestra para salidas raster. `public/brand/inmobia360-mark.svg` y `public/brand/inmobia360-logo.svg` incrustan una versión reducida de la imagen; son envoltorios SVG con contenido raster, no trazados vectoriales independientes. Si hace falta un vector puro, el componente `BrandIcon` de [inmobia360/ai.broker](https://github.com/inmobia360/ai.broker/blob/main/src/components/brand/BrandLogo.tsx) es la referencia geométrica concordante.

## Paleta objetivo provisional

| Token semántico | Aproximación visual | Función |
|---|---:|---|
| `brand-orange` | `#FF8A00` | Naranja documentado en el isotipo y wordmark |
| `ink-navy` | `#161E2E` | Navy documentado en la casa y wordmark |
| `brand-blue` | `#1D63FF` | Torre del isotipo |
| `brand-blue-deep` | `#0B3CB3` | Degradado de la torre |
| `brand-turquoise` | `#00D2B4` | Anillo orbital |
| `brand-orange-ui` | `#FF7A00` aprox. | CTA de las capturas; muestra visual aproximada |
| `ink-navy-ui` | `#111A31` aprox. | Titulares/UI de las capturas; muestra aproximada |
| `text-primary` | `#172033` | Texto principal |
| `text-secondary` | `#334B6B` | Párrafos y metadatos |
| `canvas` | `#F7F9FC` | Fondo general |
| `surface` | `#FFFFFF` | Tarjetas y controles |
| `border-subtle` | `#DCE4EF` | Bordes y separadores |
| `state-safe` | `#00A878` | Confirmación/seguridad cuando el estado es real |
| `state-pending-bg` | `#FFF0D8` | Fondo de avisos pendientes |

Los primeros cinco valores están documentados en el código del logotipo y deben conservarse en el isotipo. Los dos tokens de UI son aproximaciones visuales. Comprobar contraste WCAG al aplicarlos a la interfaz sin alterar el PNG aprobado.

## Lenguaje de interfaz

- Titulares sans-serif, compactos, de peso alto y navy; naranja enfatiza una parte breve.
- Cuerpo sans-serif legible, con buen interlineado y azul grisáceo.
- Fondos blancos o casi blancos, tarjetas generosas con borde frío fino y sombra suave.
- CTA naranja claramente distinguible; botones secundarios blancos con borde sutil.
- Microetiquetas cortas en naranja para categorizar secciones.
- Badges y estados llevan texto, no solo color.
- Radios consistentes y generosos; iconografía lineal sencilla.
- El tema oscuro puede existir en el producto, pero debe traducir los mismos tokens y mantener la identidad naranja/navy.

## Flujo y estados de producto

1. Asistente prepara un material o tarea.
2. El sistema notifica al agente.
3. El agente abre y revisa el borrador.
4. El agente elige canal/acción: aprobar, editar, enviar, descargar o descartar según lo que realmente permita el producto.
5. La interfaz confirma el resultado únicamente si el sistema lo verificó.

Mantener diferencia explícita entre: **preparando → borrador listo → pendiente de revisión → aprobado → enviado/descargado**. No simular un envío externo mediante una etiqueta de éxito si solo se preparó el enlace o documento.

## Muestras de layout de las capturas

- Cabecera blanca compacta con logo, navegación horizontal, botón de tema y CTA naranja.
- Hero de dos columnas en escritorio: promesa y botones a la izquierda; mockup de actividad, resumen y borrador pendiente a la derecha.
- En móvil, apilar manteniendo primero promesa y acción; no encoger el mockup hasta volverlo ilegible.
- Secciones explicativas con títulos centrados y tarjetas de tres columnas en escritorio, una columna en móvil.
- Módulos de agentes/documentos con pestañas o tarjetas blancas y una zona de producto demostrativa.
- Pie y controles de cookies discretos, accesibles y sin tapar acciones.

## Activos que debe conservar el proyecto

- El PNG transparente original como máster raster y un lockup horizontal sin subtítulo.
- Variante compacta y monocroma solo si existe una necesidad real de uso y se documenta.
- Iconos derivados del PNG para favicon/app y los formatos raster/vectoriales que cada destino requiera.
- Tokens de marca reutilizables en web/app en vez de hexes dispersos.
- Inventario con nombre del archivo, uso, fondo permitido y fecha/fuente de aprobación.

No eliminar ni sobrescribir los recursos actuales hasta comparar usos y guardar cambios bajo control de versiones.
