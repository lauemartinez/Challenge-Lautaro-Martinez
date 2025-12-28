# Cocktail Bar App

Aplicación web desarrollada con **Angular 19** que consume la API pública de **TheCocktailDB** para listar, filtrar y visualizar detalles de cocktails.

---

## Estructura del proyecto

La aplicación sigue una estructura **feature-based**, priorizando escalabilidad y separación de responsabilidades:

```
src/app
├── features
│   └── cocktails
│       ├── components
│       ├── pages
│       ├── services
│       ├── models
│       ├── mappers
│       └── resolvers
├── shared
└── app.routes.ts
```

- **features/cocktails**: dominio principal de la app.
- **components**: componentes reutilizables.
- **pages**: vistas principales.
- **services**: acceso a la API.
- **mappers**: adaptación de modelos API → app.
- **shared**: lógica transversal (Material, stores, constantes).

---

## Decisiones técnicas

- **Angular 19 + Standalone Components**  
  Reduce boilerplate y simplifica la arquitectura.

- **Angular Signals**  
  Manejo de estado local claro y predecible, sin sobrecargar RxJS.

- **RxJS**  
  Utilizado exclusivamente para flujos async (HTTP, pipes).

- **Angular Material**  
  UI consistente, accesible y productiva.

- **Resolvers**  
  Precarga de datos antes de renderizar vistas.

- **Mapper Pattern**  
  Desacopla el modelo de la API del modelo de la aplicación.

- **Feature-based architecture**  
  Facilita mantenimiento y escalabilidad.

---

## Ejecución del proyecto

### Instalar dependencias
```bash
npm install
```

### Levantar la aplicación
```bash
ng serve
```

Abrir en el navegador:
```
http://localhost:4200
```

---

## Testing

Se utilizan los tests generados por Angular (Unit Tests).

### Ejecutar tests
```bash
ng test
```

## Funcionalidades principales

- Listado de cocktails
- Filtro por nombre, id e ingredientes
- Vista de detalle
- Gestión de favoritos

---

## Notas finales

El proyecto prioriza **claridad, mantenibilidad y buenas prácticas**, evitando complejidad innecesaria y siguiendo estándares actuales de Angular.
