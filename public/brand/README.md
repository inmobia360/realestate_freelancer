# Activos de marca — Inmobia 360

El original `inmobia360-isotipo-original.png` es el máster transparente aprobado por el usuario. No editar ni sobrescribirlo. El lockup mantiene separación explícita entre “Inmobia” y “360”; el descriptor no forma parte del logotipo.

## Logotipos horizontales
- `inmobia360-logo-light.svg`: versión escalable para fondos claros, wordmark navy y naranja.
- `inmobia360-logo-dark.svg`: versión escalable para fondos oscuros, wordmark blanco/naranja e isotipo sobre disco blanco.
- `inmobia360-logo-light-1600x400.png` y `inmobia360-logo-dark-1600x400.png`: exportaciones PNG listas para usos que requieren fondo claro (#F7F9FC) u oscuro (#111827).
- `inmobia360-logo.svg`: alias claro para mantener la ruta anterior.
- Los SVG incrustan el isotipo PNG; no son vectores puros.

## Paquete digital descargable
- `digital/` contiene el logotipo horizontal y el isotipo en PNG y SVG: transparente, transparente para tema oscuro, fondo claro y fondo oscuro. La versión transparente oscura usa wordmark blanco y conserva un disco blanco detrás del isotipo para legibilidad.
- `digital/README.md` documenta nombres, dimensiones, colores y uso de cada variante.
- `digital/inmobia360-identidad-digital.zip` reúne todos los recursos en un paquete descargable.

## Iconos y redes
- `inmobia360-isotipo-{16,32,64,128,256,512}.png`: exportaciones transparentes derivadas del máster.
- `favicon-{16,32,48}.png`, `/public/favicon.png`, `/public/favicon.ico`: favicons de navegador.
- `/src/app/favicon.ico`: favicon reconocido por Next.js.
- `/src/app/icon.png`: icono de aplicación web de 512×512 con fondo claro y margen de seguridad.
- `/src/app/apple-icon.png`: icono Apple de 180×180 con fondo claro y margen de seguridad.
- `pwa-{192,512}.png` y `pwa-{192,512}-maskable.png`: tamaños enlazados desde `/manifest.webmanifest`.
- `social-avatar-1080.png`: avatar cuadrado de perfil social, fondo blanco y símbolo centrado.

## Uso
Usa el lockup horizontal cuando haya espacio y el isotipo para favicon, app y avatar. La variante oscura coloca una superficie blanca tras el isotipo original para conservar el contraste sin recolorearlo. Los iconos de app llevan margen para evitar recortes por máscaras del sistema. No aplicar filtros ni deformar el máster.

