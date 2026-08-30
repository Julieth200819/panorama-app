# Panorama

Aplicación web construida con React + Vite + React Router, que consume la API pública
JSONPlaceholder (https://jsonplaceholder.typicode.com/) para los módulos Users y Photos.

## Cómo ejecutar el proyecto

```bash
npm install
npm run dev
```

Luego abre `http://localhost:5173` en el navegador.

Para generar la versión de producción:

```bash
npm run build
npm run preview
```

## Estructura del proyecto

```
panorama-app/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── services/
    │   └── api.js
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Pagination.jsx
    │   ├── State.jsx
    │   ├── UserCard.jsx
    │   └── PhotoCard.jsx
    └── pages/
        ├── Home.jsx
        ├── Users.jsx
        ├── UserDetail.jsx
        ├── Photos.jsx
        ├── PhotoDetail.jsx
        └── NotFound.jsx
```

## Criterios cubiertos

- Enrutaje estático y dinámico: rutas fijas (`/`, `/usuarios`, `/fotos`) y rutas
  dinámicas con parámetro (`/usuarios/:id`, `/fotos/:id`), más una ruta comodín `*`
  para el 404, todas definidas en `App.jsx` con react-router-dom.
- Diseño: paleta fría con acento índigo, tipografía Space Grotesk / Inter / IBM Plex
  Mono, y un inicio simple y directo distinto del resto de las vistas.
- Adaptación responsiva: grids con auto-fill/minmax, navbar y layouts de detalle que
  se reacomodan por debajo de 720px.
- Paginación:
  - Users: paginación en el cliente (la API entrega los 10 usuarios completos).
  - Photos: paginación real contra el servidor usando los parámetros `_page` y
    `_limit`, leyendo el total desde el header `x-total-count`.
- Estructura del proyecto: separación en `services` (acceso a datos), `components`
  (UI reutilizable) y `pages` (vistas por ruta).

## API utilizada

| Módulo | Endpoint                     | Uso                             |
|--------|-------------------------------|----------------------------------|
| Users  | GET /users                   | Listado paginado en el cliente  |
| Users  | GET /users/:id                | Ficha de detalle (ruta dinámica)|
| Photos | GET /photos?_page=&_limit=    | Listado paginado en el servidor |
| Photos | GET /photos/:id               | Ficha de detalle (ruta dinámica)|

Nota: las imágenes de Photos que entrega la API apuntan a via.placeholder.com, un
servicio que en ocasiones no responde. Por eso las tarjetas y la ficha de detalle
tienen un `onError` que cambia automáticamente a una imagen de picsum.photos si la
original falla.
