# Introducción

Arquetipo de microservicio para el aplicativo Fénix, creado con [Nest](https://github.com/nestjs/nest)

# Tecnologías Utilizadas

- Node.js
- TypeScript
- NestJS
- Yarn

# Instalación

```bash
$ yarn install
```

# Script de Configuración de Base de Datos

## Descripción General

Este proyecto incluye un script `bin/dbSetup.js` diseñado para simplificar la configuración del entorno de base de datos. Basado en tu preferencia, puede configurar el proyecto para usar una base de datos NoSQL (MongoDB) o SQL (PostgreSQL). El script automatiza las siguientes tareas:

- Elimina la carpeta de configuración de base de datos que no se requiere para la base de datos seleccionada.
- Actualiza `package.json` para eliminar las dependencias de base de datos innecesarias.
- Modifica `src/app.module.ts` para importar el módulo de base de datos correcto y lo renombra a `DatabaseModule` para uniformidad.
- Ejecuta `yarn install` para actualizar las dependencias basadas en el nuevo `package.json`.

## Ejecución del Script

1. Abre una terminal y navega al directorio raíz del proyecto.
2. Haz el script ejecutable (si aún no lo has hecho) ejecutando:

   ```bash
   chmod +x bin/dbSetup.js
   ```

3. Ejecuta el script con nosql o sql como argumento para seleccionar el tipo de base de datos deseado. Por ejemplo:

   ```bash
    node ./bin/dbSetup.js nosql
   ```

   o

   ```bash
    node ./bin/dbSetup.js sql
   ```

# Correr el proyecto

### Desarrollo

```bash
$ yarn run start
```

### Modo "watch"

```bash
$ yarn run start:dev
```

### Producción

```bash
$ yarn run start:prod
```

# Pruebas

### unit tests

```bash
$ yarn run test
```

### e2e tests

```bash
$ yarn run test:e2e
```

### test coverage

```bash
$ yarn run test:cov
```

# Enlaces a documentación externa

[Confluence](https://confluence.example.com)
[Swagger](https://confluence.example.com)

# Changelog

v1.0.0 - Fecha de Lanzamiento

- Inicialización del proyecto.
