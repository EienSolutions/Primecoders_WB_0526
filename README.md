# PrimeCoders — Data-First Engineering

Landing page corporativa de [PrimeCoders](https://primecoders.dev). Estética neon-logic con soporte bilingüe ES/EN, modo oscuro/claro, y un panel de tweaks de diseño exclusivo para desarrollo.

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Lenguaje | TypeScript (strict) |
| Estilos | Tailwind CSS v4 + CSS custom properties |
| Tipografía | Inter + JetBrains Mono via `next/font` |
| Email | [Resend](https://resend.com) |

## Estructura

```
app/
  layout.tsx          # Root layout, ThemeProvider, fuentes
  page.tsx            # Página principal + TweaksPanel (dev)
  globals.css         # Estética neon-logic + @import tailwindcss
  api/contact/
    route.ts          # POST handler — envío de emails con Resend
components/
  nav.tsx             # Barra de navegación (lang toggle, dark toggle)
  hero.tsx            # Sección hero con terminal typewriter
  pillars.tsx         # Pilares de servicio
  lab.tsx             # Demo lab — CRM, Analytics, AI
  vault.tsx           # Dashboard financiero en tiempo real
  stack.tsx           # Marquee del stack tecnológico
  contact.tsx         # Formulario de contacto + footer
  effects.tsx         # NeonBackground, Typer, CountUp, Sparkline…
  tweaks-panel.tsx    # Panel flotante de diseño (solo dev)
lib/
  i18n.ts             # Strings ES/EN + función t()
  theme-context.tsx   # ThemeProvider — lang, dark, density, colores…
```

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). En modo desarrollo aparece el panel **⚙ Tweaks** en la esquina inferior derecha para ajustar colores, glow, densidad y variante de copy del hero en tiempo real.

## Variables de entorno

Crea `.env.local` en la raíz antes de usar el formulario de contacto:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
# Opcional — dominio verificado en Resend (por defecto: onboarding@resend.dev)
RESEND_FROM_ADDRESS=hola@tudominio.com
```

## Scripts

```bash
npm run dev     # Servidor de desarrollo (Turbopack)
npm run build   # Build de producción
npm run start   # Servidor de producción
npm run lint    # ESLint
```

## Internacionalización

La selección de idioma (ES/EN) vive en `ThemeContext` y se persiste en memoria de sesión. El toggle está integrado en la barra de navegación. Todos los strings se definen en `lib/i18n.ts`.

## Despliegue

El proyecto está listo para desplegarse en [Vercel](https://vercel.com). Añade las variables de entorno en el panel del proyecto antes del primer deploy.
