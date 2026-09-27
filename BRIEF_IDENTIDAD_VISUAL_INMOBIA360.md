# Brief de identidad visual y dirección digital — Inmobia360

> Documento de trabajo para diseño, UX/UI y desarrollo. Convierte la presencia actual de Inmobia360 en una guía implementable para web y producto digital.

## 1. Encargo

Diseñar y mantener una experiencia digital coherente para Inmobia360: una agencia digital inmobiliaria de bolsillo, pensada primero para agentes independientes y pequeñas agencias, con un Director Broker y asistentes especializados que preparan tareas y documentos para validación humana desde el móvil.

La identidad debe comunicar **confianza inmobiliaria, claridad financiera y eficiencia tecnológica**. La tecnología debe sentirse útil y profesional, no experimental ni ostentosa. La propiedad y la operación inmobiliaria siguen siendo protagonistas; la IA debe aparecer como una herramienta que facilita el trabajo.

## 2. Objetivos de comunicación

- Explicar rápidamente qué resuelve la plataforma y para quién.
- Convertir funcionalidades técnicas en beneficios de negocio comprensibles.
- Transmitir confianza para manejar información inmobiliaria y comercial.
- Dar visibilidad al flujo actual: los asistentes preparan trabajo en borrador, notifican al agente y este revisa y decide si lo envía, descarga o descarta.
- Mantener continuidad visual entre web pública, demo, panel, fichas de propiedad y materiales exportados.

## 3. Audiencias

1. **Agentes independientes:** necesitan publicar mejor y dedicar menos tiempo a tareas repetitivas.
2. **Agencias y equipos comerciales:** buscan consistencia de marca, rapidez y seguimiento ordenado de leads.
3. **Equipos inmobiliarios en crecimiento:** necesitan coordinación, seguimiento de tareas y consistencia sin perder control humano.

Diseñar primero para una persona profesional ocupada que consulta desde escritorio y móvil. Priorizar la lectura rápida, las acciones claras y la comprensión de datos.

## 4. Posicionamiento y personalidad

**Posicionamiento:** una agencia digital inmobiliaria en el bolsillo que se ocupa del papeleo y prepara el trabajo comercial para que el agente dedique más tiempo a visitas y ventas.

**Personalidad:** experta, resolutiva, moderna, transparente y cercana al trabajo real de una agencia.

**Evitar:** estética de cripto/fintech especulativa, lenguaje grandilocuente, dashboards saturados, imágenes de lujo genéricas sin contexto, promesas absolutas y visuales de IA futurista que resten credibilidad.

## 5. Mensaje y tono verbal

### Mensaje principal

Un Director Broker y asistentes especializados preparan anuncios, documentos y tareas comerciales en segundo plano; el agente recibe el borrador en el móvil, lo revisa y elige qué hacer.

### Jerarquía de mensajes

1. Beneficio: menos horas frente al ordenador y más tiempo en visitas y ventas.
2. Cómo: un Director Broker coordina asistentes de marketing/portales, legal/documentos y comercial/filtro.
3. Control: todo se guarda como borrador y el profesional valida el contenido y canal antes de compartirlo.
4. Acción: probar la experiencia móvil, conocer a los asistentes o entrar al panel.

### Voz

- Escribir en español claro, profesional y directo.
- Preferir verbos concretos: preparar, publicar, calcular, revisar, priorizar.
- Explicar siglas la primera vez que aparezcan (por ejemplo, Cap Rate).
- Diferenciar con claridad datos reales, estimaciones y ejemplos ficticios.
- Presentar el contenido generado por IA como borrador revisable.
- Evitar cifras de rendimiento, testimonios, integraciones o disponibilidad que no estén verificadas.

**Ejemplo de tono:** «Tu asistente prepara el borrador. Tú lo revisas y decides cuándo enviarlo».

## 6. Dirección visual

### Concepto

**Una agencia inmobiliaria de bolsillo:** visual editorial, accesible y profesional, con una interfaz ligera de móvil que hace visible el trabajo delegado, el estado de los borradores y el control final del agente. Las capturas de referencia de este encargo son la fuente principal de dirección visual: conservar su composición, jerarquía y estilo al actualizar el flujo y el contenido.

### Dirección cromática aplicada

Las capturas muestran una identidad distinta a la paleta previa del código. Para la dirección objetivo, priorizar el sistema de las capturas y tratar los azules/violetas heredados como legado a migrar o mapear; no mezclar ambos sistemas sin una decisión explícita.

| Token | Referencia visual | Uso recomendado |
|---|---|---|
| Naranja de logotipo | `#FF8A00` | Wordmark y énfasis amplios; forma parte del recurso de marca |
| Naranja de acción | `#C2410C` | CTA y enlaces interactivos con texto blanco legible |
| Naranja hover | `#9A3412` | Hover y pulsado de acciones naranjas |
| Navy | `#111A31` | Titulares, navegación, paneles y tema oscuro |
| Texto | `#172033` | Texto principal |
| Azul grisáceo | `#334B6B` | Texto secundario |
| Fondo | `#F7F9FC` | Fondo general claro |
| Superficie | `#FFFFFF` | Tarjetas, paneles y controles |
| Borde | `#DCE4EF` aprox. | Límites sutiles y separadores |
| Verde seguro | `#008C68` | Confirmaciones de estado real |
| Ámbar suave | `#FFF0D8` aprox. | Etiquetas informativas y estados pendientes |

Los valores de marca del isotipo se conservan en el recurso aprobado. Para UI, `#C2410C` es el naranja de acción con texto blanco legible; `#FF8A00` queda para el wordmark, grandes énfasis y detalles que no requieran texto pequeño en blanco. La guía operativa `brand-guidelines.md` es la fuente vigente de tokens y uso.

### Logotipo aprobado por el usuario

- Usar el nombre **Inmobia 360**, con “Inmobia” en navy y “360” en naranja.
- Mantener el isotipo circular con el motivo de casa y los acentos turquesa, azul y naranja de la referencia.
- El lockup principal **no lleva subtítulo**. No añadir “Tecnología Inmobiliaria 360” debajo del logotipo.
- Para espacios pequeños usar el isotipo; no reducir el lockup horizontal hasta perder legibilidad.
- El isotipo original transparente aprobado (1254 × 1254 px) está en `public/brand/inmobia360-isotipo-original.png`; es la fuente maestra para la web y sus iconos.
- El repositorio `inmobia360/ai.broker` contiene además el dibujo concordante en `src/components/brand/BrandLogo.tsx`, útil si un destino requiere trazado vectorial puro.
- `public/brand/inmobia360-logo.svg` es un lockup sin subtítulo que incorpora el PNG aprobado; `public/brand/inmobia360-mark.svg` es un contenedor SVG del mismo isotipo raster.

### Paleta anterior detectada en el código del proyecto

Los siguientes valores están declarados en `src/app/globals.css`, pero no coinciden con la nueva dirección de referencia. Inventariar dónde se usan y migrarlos de forma consistente en lugar de perpetuarlos como identidad nueva.

| Token | Valor actual | Uso recomendado |
|---|---|---|
| Azul marca | `#0066FF` | Acción primaria, enlaces y estados activos |
| Violeta IA | `#7B2CBF` | Acentos de IA y gradientes puntuales |
| Navy | `#0A192F` | Texto principal y superficies de alto contraste |
| Fondo claro | `#FFFFFF` | Superficie base |
| Superficie clara | `#F8FAFC` | Fondos alternos y contenedores |
| Texto secundario | `#334155` | Texto auxiliar en tema claro |
| Borde | `#CBD5E1` | Separadores y contornos discretos |
| Fondo oscuro | `#080B18` | Fondo base del tema oscuro |
| Superficie oscura | `#0C1024` | Tarjetas y áreas elevadas en oscuro |

**Uso del color objetivo:** el naranja identifica acción y marca; navy aporta confianza y contraste; verde se reserva para seguridad/confirmación y no debe usarse para sugerir que una acción externa ya se realizó si solo está preparada. Mantener gradientes en CTA seleccionados, no como fondo general. Usar estados semánticos diferenciados y etiquetas textuales.

### Tipografía

Las referencias usan una sans-serif geométrica de peso alto en titulares, combinada con una sans-serif neutral para párrafos, navegación y datos. Mantener titulares compactos, muy marcados y legibles; definir una escala responsive. El cuerpo debe tener interlineado generoso y contraste alto. El proyecto actualmente utiliza una pila sans-serif del sistema; identificar la fuente exacta de marca antes de incorporar una dependencia externa.

### Composición y forma

- Diseñar con jerarquía clara, alineación consistente y espacio en blanco suficiente.
- Usar contenedores y tarjetas para agrupar información relacionada, no para decorar cada bloque.
- Reservar sombras para elevación y foco; priorizar bordes sutiles y superficies limpias.
- Usar radios moderados y consistentes en botones, tarjetas, campos y diálogos.
- Presentar cifras financieras con alineación y formato local español: `1.250 €`, `7,8 %`, `145 m²`.
- Mantener iconografía lineal coherente; el proyecto ya incluye `lucide-react`.
- Usar tarjetas blancas con borde frío fino, radio generoso y sombra suave para superficies principales.
- Repetir las microetiquetas en mayúsculas/naranja para introducir secciones, sin saturar el contenido.
- Usar badges verde/ámbar para distinguir seguro, completado y pendiente de revisión.
- El hero de escritorio combina mensaje y CTA a la izquierda con una vista de actividad/borrador del producto a la derecha; en móvil, priorizar titular, acción y demostración apilada.

### Fotografía e imágenes

- Priorizar interiores, fachadas y escenas de trabajo inmobiliario reales, luminosas y con encuadres sobrios.
- Evitar imágenes de stock con poses artificiales, marcas de agua o apariencia de lujo sin relación con el inmueble.
- Usar imágenes con derechos y optimizadas para web; definir recortes coherentes por componente.
- Añadir textos alternativos útiles cuando la imagen aporte información; usar alt vacío si es puramente decorativa.
- Etiquetar los inmuebles y retratos de ejemplo como demostrativos cuando no sean reales.

## 7. Sistema de componentes

Definir tokens compartidos para color, tipografía, espaciado, radios, elevación y foco, alineados con las capturas. Aplicarlos como mínimo a:

- Navegación pública y navegación del panel.
- Botones primarios, secundarios, terciarios y de peligro.
- Campos, selectores, controles numéricos y formularios.
- Tarjetas de propiedad, lead y métrica.
- Etiquetas de estado, badges y puntuaciones.
- Tablas/listados, filtros, paginación y estados vacíos.
- Diálogos, avisos, tooltips, menús y notificaciones.
- Gráficos y visualizaciones financieras.
- Plantillas de ficha, landing pública, QR y exportación PDF.
- Resumen del Director Broker y tarjetas de asistentes.
- Bandeja de borradores pendientes con vista previa, estado y acciones explícitas de WhatsApp, correo y descarga PDF.
- Notificación móvil, resumen diario y tarjeta de comprador prioritario.

Cada componente debe contemplar estados normal, hover, foco visible, activo, deshabilitado, carga, vacío y error cuando correspondan. No usar gradientes o animaciones como sustitutos de jerarquía o feedback funcional.

## 8. Arquitectura de experiencia

### Flujo de producto que la identidad debe explicar

1. **Preparación:** Director Broker y asistentes elaboran un anuncio, contrato u otra tarea a partir de los datos disponibles.
2. **Aviso:** el agente recibe una notificación y puede abrir el resultado desde el móvil.
3. **Revisión:** el elemento aparece claramente marcado como borrador pendiente de aprobación; la interfaz explica qué documento/canal se está preparando.
4. **Decisión humana:** el agente edita, aprueba, envía mediante el canal elegido, descarga o descarta. La interfaz no debe implicar envío automático.
5. **Seguimiento:** el panel registra el estado real de la acción solo si el producto puede confirmarlo.

La seguridad visual debe representar control y transparencia: borrador no equivale a aprobado, preparado no equivale a enviado y una recomendación no equivale a una acción ejecutada.

### Web pública

Orden recomendado: promesa de agencia de bolsillo y CTA → vista de borrador/actividad → Director Broker y asistentes → modo borrador seguro en tres pasos → documentos y experiencia móvil → tiempo ganado y testimonios verificados → planes (si están confirmados) → preguntas frecuentes → CTA y pie legal.

### Producto

Organizar el panel alrededor de tareas reales del agente y sus asistentes: resumen del Director Broker, borradores por revisar, documentos, compradores/leads y propiedades. Mostrar quién preparó cada elemento, cuándo, qué falta y qué acciones están disponibles. Evitar estados ambiguos y métricas decorativas.

### Demo

Indicar qué puede probarse, usar exclusivamente datos de muestra cuando proceda y explicar si las acciones se guardan, publican o envían. Mantener el aspecto cercano al producto real sin insinuar capacidades que no estén disponibles.

## 9. Requisitos de UX, accesibilidad y adaptación

- Diseñar mobile-first y comprobar al menos móvil, tablet y escritorio.
- Asegurar contraste legible, navegación por teclado, foco visible y etiquetas asociadas a controles.
- No depender solo de color, hover, movimiento o iconos para transmitir información.
- Respetar preferencias de movimiento reducido y el tema claro/oscuro existente.
- Dar feedback inmediato al copiar, guardar, generar, exportar y enviar.
- En cálculos, mostrar supuestos, unidades y carácter estimado de los resultados.
- Mantener objetivos táctiles cómodos y no truncar datos clave en pantallas pequeñas.
- Usar formatos españoles para fecha, número, moneda y unidades; preparar los textos para futura localización.

## 10. Criterios de contenido y confianza

- No publicar como hecho una cifra, integración, testimonio, valoración, certificación o SLA sin fuente verificable y autorización.
- No describir una estimación como resultado garantizado.
- En resultados de IA, indicar que el profesional debe revisar nombres, características, superficies, rentabilidades y afirmaciones antes de publicar.
- Mostrar procedencia o explicación breve de métricas calculadas cuando afecten decisiones comerciales.
- Proteger datos personales en capturas, demos y materiales de marketing.

## 11. Guía de implementación para desarrollo

1. Inventariar estilos, componentes, logotipo, páginas y comportamientos actuales antes de cambiar la interfaz.
2. Consolidar los tokens visuales de las capturas en una fuente de verdad; inventariar y migrar los tokens azul/violeta heredados con cuidado.
3. Implementar componentes compartidos para navegación, CTA, tarjetas, formularios, estados y métricas.
4. Mantener la semántica HTML, el teclado y los estados accesibles desde el inicio.
5. Separar contenido de presentación cuando facilite coherencia y mantenimiento.
6. Optimizar imágenes y carga; reservar componentes cliente para interacciones que realmente los necesiten.
7. Comprobar consistencia entre landing, demo, panel, flujo de borradores, móvil y documentos exportados.
8. Antes de cerrar diseño visual, revisar la web desplegada en tamaños de pantalla representativos y contrastarla con este brief y el logotipo oficial.

El repositorio usa Next.js `16.3.2` con App Router. Antes de implementar cambios de estructura o APIs, consultar la documentación instalada en `node_modules/next/dist/docs/` y seguir las convenciones de la versión del proyecto.

## 12. Entregables esperados del equipo

- Inventario de identidad y auditoría de inconsistencias actuales.
- Tokens de diseño documentados para claro y oscuro.
- Componentes y patrones responsive reutilizables.
- Diseños de páginas clave y estados interactivos.
- Inventario de recursos gráficos con licencias y textos alternativos.
- Implementación compatible con teclado y lectores de pantalla.
- Validación visual de las páginas principales en móvil y escritorio.
- Lista de afirmaciones comerciales pendientes de verificación.

## 13. Criterios de aceptación

- Se entiende el producto y su público en los primeros segundos de lectura.
- El naranja, navy, neutros y verde de seguridad siguen la dirección de las capturas sin mezclarse con el tema azul/violeta anterior.
- Landing, demo y panel parecen partes del mismo producto.
- Acciones principales y estados de sistema se distinguen con claridad.
- Los diseños funcionan en móvil y escritorio y conservan legibilidad.
- El tema oscuro mantiene contraste y estados reconocibles dentro de la nueva paleta.
- No se introducen afirmaciones comerciales o cifras sin validar.
- Los datos de ejemplo están identificados y la IA no se presenta como fuente infalible.
- Componentes interactivos se pueden operar con teclado y tienen foco visible.

## 14. Prompt de ejecución para el equipo

> Actualizad la experiencia digital de Inmobia360 siguiendo este brief y las capturas adjuntas como referencia de dirección visual. Conservad el lenguaje de diseño: fondos claros, titulares navy gruesos, acento naranja, tarjetas blancas redondeadas con borde frío y sombra sutil, badges informativos y CTA prominentes. Adaptad el contenido y los componentes al flujo actual: Director Broker y asistentes especializados preparan borradores; el agente recibe aviso, revisa desde el móvil y elige si envía, descarga o descarta. Haced que el control humano sea evidente en cada pantalla y nunca representéis como enviado algo que solo está preparado. Migrad los tokens antiguos azul/violeta con coherencia, sin mezclar identidades. Priorizad uso móvil, accesibilidad y estados claros. No inventéis capacidades, integraciones, testimonios ni resultados; marcad datos de demostración. Consultad la documentación instalada de Next.js antes de tocar implementación. Entregad la interfaz validada en escritorio y móvil, y documentad cualquier dato de marca o producto pendiente de confirmar.

## 15. Pendientes de validación de marca

- Archivo vectorial original del diseñador y reglas oficiales de área de seguridad/tamaño mínimo; mientras tanto se conserva el PNG aprobado como máster raster y se usa el dibujo concordante del repositorio cuando haga falta vectorizar.
- Confirmación oficial de paleta y usos del degradado.
- Tipografía de marca, si existe.
- Biblioteca aprobada de fotografía e ilustración.
- Reglas de voz, claims y terminología comercial.
- Cifras, testimonios, precios, planes e integraciones publicables.
- Tratamiento legal, privacidad, cookies y tratamiento de datos en demo.

**Nota de alcance:** la dirección visual se basa en las capturas y en el isotipo PNG aprobado por el usuario; los colores del isotipo están documentados también en el SVG del repositorio y los tokens de UI siguen siendo aproximados. El lockup principal queda definido sin subtítulo. Los tokens azul/violeta y la pila tipográfica heredados se documentan como legado, no como dirección visual objetivo. Contrastar cada capacidad de producto antes de presentarla como disponible.
