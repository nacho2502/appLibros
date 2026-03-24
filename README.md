# 📚 YouBook

YouBook es una aplicación de escritorio para gestionar tu biblioteca personal, inspirada en Goodreads pero con tu propio estilo.

## ¿Qué es youBook?

YouBook es una app personal para llevar el control de tus lecturas. Busca cualquier libro del mundo, añádelo a tu biblioteca, valóralo con una nota del 1 al 10 y consulta estadísticas detalladas sobre tus hábitos de lectura.

## Características

- **Búsqueda de libros** conectada a la API de Open Library, con portadas, autor, año, sinopsis y más información de cada libro
- **Biblioteca personal** con tres estados: Quiero leer, Leyendo y Leído
- **Sistema de valoración del 1 al 10** en lugar del clásico sistema de estrellas
- **Dashboard de estadísticas** con gráficas de distribución de notas, libros por mes, top autores y géneros más leídos
- **Recomendaciones personalizadas** basadas en los géneros que más lees
- **App de escritorio** gracias a Electron, disponible para Windows y Mac

## Tecnologías

- [React](https://react.dev/) — interfaz de usuario
- [Electron](https://www.electronjs.org/) — empaquetado como app de escritorio
- [Vite](https://vitejs.dev/) — bundler y servidor de desarrollo
- [Tailwind CSS](https://tailwindcss.com/) — estilos
- [Recharts](https://recharts.org/) — gráficas y estadísticas
- [Open Library API](https://openlibrary.org/developers/api) — datos de libros

## Instalación y uso

### Requisitos
- Node.js 18 o superior

### Pasos
```bash
# Clona el repositorio
git clone https://github.com/nacho2502/appLibros.git
cd appLibros

# Instala las dependencias
npm install

# Arranca en el navegador
npm run dev

# Arranca como app de escritorio
npm run electron:dev
```

## Generar instalador
```bash
npm run electron:build
```

El instalador se generará en la carpeta `release/`.

## Estado del proyecto

El proyecto está en desarrollo activo. Funcionalidades previstas próximamente:

- Reseñas y notas personales por libro
- Exportar estadísticas
- Sincronización en la nube