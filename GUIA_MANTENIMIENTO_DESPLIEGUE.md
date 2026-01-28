# Guía de Mantenimiento y Despliegue - YoungStars Recovery

Esta documentación cubre cómo modificar el sistema, ajustar diseños responsivos y desplegar la aplicación en Hostinger.

## 1. Estructura del Proyecto

El proyecto está construido con **Next.js 14**, **Tailwind CSS** y **Framer Motion**.

*   `src/app/page.tsx`: Página principal que orquesta todas las secciones (Hero, About, Services, etc.).
*   `src/app/globals.css`: Estilos globales y variables de CSS.
*   `src/components/`: Contiene todos los componentes individuales (Hero, Navbar, etc.).
*   `tailwind.config.ts`: Configuración de colores personalizados (neon-cyan, deep-black), fuentes y animaciones.

---

## 2. Cómo Modificar el Sistema

### Cambiar Colores y Estilos Globales
Para cambiar los colores principales (e.g., el cian neón), edita `tailwind.config.ts`.
Busca la sección `theme.extend.colors`:
```typescript
colors: {
  "neon-cyan": "var(--color-neon-cyan)", // Cambiar valor en globals.css o aquí directo
  "deep-black": "#050505",
  ...
}
```

### Ajustar Responsividad (Mobile vs Desktop)
Tailwind usa prefijos para estilos responsivos. El diseño es "Mobile First" (móvil primero).
*   **Clases base**: Aplican a móviles.
*   `md:`: Aplican a tablets y pantallas medianas (min-width: 768px).
*   `lg:`: Aplican a laptops y escritorio (min-width: 1024px).

**Ejemplo:**
```tsx
<div className="text-xl md:text-4xl text-white">
  {/* Texto tamaño XL en móvil, 4XL en escritorio */}
</div>
```
Si algo se ve mal en el celular, busca la clase y ajusta el valor base. Si se ve mal en PC, ajusta el valor con `md:` o `lg:`.

---

## 3. Despliegue en Hostinger

Hostinger ofrece varios tipos de hosting. La mejor opción para Next.js es **VPS** (instalar Node.js) o usar su **soporte para Node.js** en planes Cloud/Shared (si está disponible), o desplegar como **sitio estático** si no usas funciones de servidor (API roots, SSR dinámico).

### Opción A: Despliegue Estático (Recomendado para Shared Hosting)
Si tu plan de Hostinger es básico (Shared Web Hosting), lo mejor es exportar el sitio como estático.

1.  Abre `next.config.mjs` y añade `output: 'export'`:
    ```javascript
    /** @type {import('next').NextConfig} */
    const nextConfig = {
      output: 'export',
      images: { unoptimized: true } // Necesario para exportación estática
    };
    export default nextConfig;
    ```
2.  Ejecuta el comando de construcción:
    ```bash
    npm run build
    ```
3.  Esto creará una carpeta llamada `out`.
4.  Sube el **contenido** de la carpeta `out` a la carpeta `public_html` de tu Hostinger usando el Administrador de Archivos o FTP.

### Opción B: Despliegue con Node.js (VPS o Cloud)
Si tienes un VPS en Hostinger:

1.  Sube tu código al servidor (o clona tu repo de GitHub).
2.  Instala las dependencias: `npm install`.
3.  Construye el proyecto: `npm run build`.
4.  Inicia el servidor: `npm start`.
5.  Usa **PM2** para mantener el sitio activo:
    ```bash
    npm install -g pm2
    pm2 start npm --name "youngstars" -- start
    ```
6.  Configura **Nginx** como proxy inverso para apuntar tu dominio al puerto 3000.

---

## 4. Solución de Problemas Comunes

### "La página carga en la sección incorrecta"
Si al entrar al sitio te manda a "Quiénes Somos" en lugar del inicio:
1.  Verifica la URL en el navegador. Si dice `tusitio.com/#about`, el navegador recordará esa posición.
2.  Limpia la caché y entra solo a `tusitio.com`.
3.  Asegúrate de que la sección Hero tenga el id correcto: `<section id="home">`.

### Iconos rotos o imágenes no cargan
*   Asegúrate de que las imágenes estén en la carpeta `public/`.
*   En Next.js, la ruta `/imagen.png` apunta automáticamente a `public/imagen.png`.

---

**YoungStars Design System v2.0**
