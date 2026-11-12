# PLAN DE EJECUCIÓN AUTÓNOMA (MODO LOOP): Invitación Interactiva para Mariangel

## 1. Contexto y Objetivo del Proyecto
Construir una aplicación web interactiva, romántica, divertida y 100% responsiva (Mobile-First) en **Next.js** para que **Juan Andrés** invite a **Mariangel** a comer hamburguesas este viernes. 
La experiencia es 100% visual en el navegador del celular sin depender de backends externos, bases de datos ni variables de entorno.

## 2. Reglas Estrictas de Ejecución (Modo Loop Sin Errores)
- **Cero Intervención Humana:** No hacer preguntas en consola. Si un comando pide confirmación, usar flags no interactivos (`--yes`, `-y`).
- **Prevención de Errores de Hidratación (SSR):** Todo componente que use `Math.random()`, `window` o animaciones dinámicas DEBE llevar `"use client"` en la primera línea y generar valores aleatorios únicamente dentro de un `useEffect` tras montar el componente.
- **Autocorrección:** Si `npm run build` arroja algún error de TypeScript o ESLint, corregirlo inmediatamente antes de dar por terminada la tarea.
- **Rutas Dinámicas:** Verificar primero si el proyecto usa carpeta `src/app` o `app` en la raíz antes de crear o sobrescribir archivos.

---

## 3. Fases de Ejecución Paso a Paso

### Fase 1: Auditoría del Entorno e Instalación de Dependencias
- [x] **Paso 1.1:** Inspeccionar el directorio actual verificando `package.json`, `tsconfig.json` y la estructura de carpetas (`src/app` vs `app`, versión de Next.js y configuración de Tailwind CSS).
- [x] **Paso 1.2:** Instalar las librerías de íconos, animaciones y confeti ejecutando en consola:
  ```bash
  npm install framer-motion lucide-react canvas-confetti
  npm install -D @types/canvas-confetti
  ```

### Fase 2: Sistema de Animación de Fondo (Corazones y Hamburguesas Flotantes)
- [x] **Paso 2.1:** Crear un componente cliente `FloatingHearts.tsx` (en `src/components/` o `components/` según la estructura detectada).
- [x] **Paso 2.2:** Implementar entre 18 y 25 elementos flotantes (alternando íconos de corazones ❤️/💖 y pequeños emojis de hamburguesa 🍔) que suban suavemente desde la parte inferior de la pantalla con distintas velocidades, tamaños y opacidades usando `framer-motion`.
- [x] **Paso 2.3:** Inicializar las coordenadas `x`, retrasos (`delay`) y duraciones únicamente dentro de un `useEffect` para garantizar 0 errores de hidratación en Next.js.

### Fase 3: Construcción del Flujo Interactivo Principal (`page.tsx`)
Reemplazar el contenido de `page.tsx` con un componente `"use client"` que maneje dos estados principales: **Estado de Pregunta** y **Estado de Aceptación**.

#### 3.1. Estado 1: La Pregunta Interactiva
- [x] **Encabezado:** Badge superior tierno que diga *"Para: Mariangel 💕 | De: Juan Andrés"* y un ícono/emoji central animado (🍔 + ❤️) latiendo suavemente.
- [x] **Pregunta Principal:** `¿Quieres salir conmigo este viernes por hamburguesas?` con tipografía grande, legible y estética moderna (tonos rosa suave, coral y blanco con efecto *glassmorphism*).
- [x] **Mecánica del Botón "NO" (Se encoge, cambia de frase y se escapa):**
  - Con cada clic o toque en "No", incrementar el contador `noCount`.
  - **Reducción de tamaño:** Disminuir progresivamente su escala (`Math.max(0.35, 1 - noCount * 0.1)`) y su padding/fuente.
  - **Frases dinámicas cómicas:** Rotar el texto del botón según `noCount` con el siguiente arreglo:
    1. `"No"`
    2. `"¿Segura, Mariangel? 🥺"`
    3. `"Piénsalo bien... ¡son hamburguesas! 🍔"`
    4. `"Me vas a romper el corazón 💔"`
    5. `"¡Prometo que están deliciosas! 🤤"`
    6. `"¿Ni siquiera con papitas extra? 🍟"`
    7. `"Ese botón ya casi ni sirve 👀"`
    8. `"¡Anda, di que sí! ❤️"`
    9. `"Error 404: Opción 'No' deshabilitada 😂"`
  - **Movimiento evasivo:** A partir del 2.º intento (`noCount >= 2`), aplicar un desplazamiento aleatorio seguro (`x` e `y` entre `-60px` y `60px`) usando `framer-motion` para que el botón salte dentro del contenedor sin salirse jamás de la pantalla del celular.
- [x] **Mecánica del Botón "SÍ" (Crece progresivamente):**
  - Aumentar el tamaño del botón "Sí" en cada clic al "No" (`scale: 1 + noCount * 0.22` o incremento directo de `fontSize` y `padding`) con un brillo pulsante, haciendo que sea cada vez más grande e irresistible.

#### 3.2. Estado 2: Pantalla de Éxito (Al presionar "SÍ")
- [x] **Efecto de Celebración:** Disparar inmediatamente una explosión de confeti y corazones con `canvas-confetti` al montar el estado de aceptación, más un botón extra por si quiere lanzar más confeti.
- [x] **Mensaje de Agradecimiento:** Mostrar el título `"¡SÍÍÍ! ¡Muchas gracias, Mariangel! 🥰🍔❤️"` acompañado de un subtítulo romántico y divertido: *"Sabía que no podías resistirte a unas buenas hamburguesas conmigo."*
- [x] **Tarjeta de Detalles de la Cita:**
  - **Invita:** Juan Andrés ✨
  - **Fecha:** Viernes, 13/11/2026 📅
  - **Hora:** 7:00 PM 🕖
  - **Plan:** Noche de Hamburguesas 🍔🍟
- [x] **Botón de Ubicación:**
  - Incluir un botón destacado con ícono de `MapPin` (`lucide-react`) y animación sutil que diga **"📍 Ver ubicación de la cita"**.
  - Debe abrir en una pestaña nueva (`target="_blank" rel="noopener noreferrer"`) la URL exacta:
    `https://maps.app.goo.gl/dKLeJo5c9YR7jWgr5`

### Fase 4: Metadatos y Diseño Mobile-First (`layout.tsx` y `globals.css`)
- [x] **Paso 4.1:** Actualizar los metadatos en `layout.tsx` con:
  - `title`: `"Una pregunta para Mariangel 🍔❤️"`
  - `description`: `"Invitación especial de Juan Andrés"`
- [x] **Paso 4.2:** Asegurar que el contenedor principal use `min-h-[100dvh]`, `overflow-hidden` y diseño centrado para que en cualquier pantalla de teléfono móvil se vea como una app nativa sin barras de desplazamiento molestas.

### Fase 5: Verificación y Compilación Final (Loop Check)
- [x] **Paso 5.1:** Ejecutar `npm run build` para validar que no existan errores de compilación, tipos de TypeScript ni problemas de SSR/hidratación.
- [x] **Paso 5.2:** Si `npm run build` falla, analizar el error en consola, reparar el archivo correspondiente y volver a ejecutar `npm run build` hasta obtener compilación exitosa (`Exit code 0`).
- [x] **Paso 5.3:** Marcar todas las casillas de este `plan.md` como completadas (`[x]`) y mostrar un resumen final confirmando que la aplicación está lista.
