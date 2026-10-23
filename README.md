# Proyecto Integrador M2 - API REST

API REST desarrollada con Node.js, Express y PostgreSQL para la gestión de autores y publicaciones.

El proyecto permite realizar operaciones CRUD sobre las entidades `authors` y `posts`, manteniendo una relación de uno a muchos entre autores y publicaciones.

## Tecnologías utilizadas

- Node.js
- Express
- PostgreSQL
- pg
- dotenv
- Jest
- Supertest
- Swagger / OpenAPI
- Railway

## Estructura del proyecto


database/
├── schema.sql
├── seed.sql
└── migration_001_cascade.sql

middlewares/
├── errorHandler.js
└── validateId.js

routes/
├── authors.route.js
└── post.route.js

services/
├── authors.service.js
└── post.service.js

test/
├── authors.test.js
└── post.test.js

app.js
db.js
server.js
swagger.js
generate-openapi.js
openapi.yaml
.env.example
.gitignore
package.json
README.md


## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/GonzaBarbaglia1/ProyectoM2-GonzaloBarbaglia.git
```

Ingresar al proyecto:

```bash
cd ProyectoM2-GonzaloBarbaglia
```

Instalar las dependencias:

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto tomando como referencia `.env.example`.

Ejemplo:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=proyecto_m2
```

El archivo `.env` contiene información sensible y no debe subirse al repositorio.

## Base de datos

Crear en PostgreSQL una base de datos llamada:

```text
proyecto_m2
```

Luego ejecutar el script de creación de tablas:

```sql
\i database/schema.sql
```

Para cargar los datos iniciales:

```sql
\i database/seed.sql
```

El seed puede ejecutarse nuevamente sin duplicar los datos iniciales.

## Ejecutar la aplicación

Iniciar el servidor:

```bash
npm start
```

La API estará disponible localmente en:

```text
http://localhost:3000
```

## Endpoints

### Authors

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/authors` | Obtener todos los autores |
| GET | `/authors/:id` | Obtener un autor por ID |
| POST | `/authors` | Crear un autor |
| PUT | `/authors/:id` | Actualizar un autor |
| DELETE | `/authors/:id` | Eliminar un autor |

### Posts

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/posts` | Obtener todos los posts |
| GET | `/posts/:id` | Obtener un post por ID |
| GET | `/posts/author/:authorId` | Obtener posts de un autor |
| POST | `/posts` | Crear un post |
| PUT | `/posts/:id` | Actualizar un post |
| DELETE | `/posts/:id` | Eliminar un post |

## Validaciones y manejo de errores

La API implementa validaciones para campos obligatorios y controla casos como:

- Nombre de autor obligatorio.
- Email único.
- Datos obligatorios de los posts.
- Recursos inexistentes.
- Errores internos del servidor.

Los errores inesperados son procesados mediante un middleware global de manejo de errores.

Las consultas SQL utilizan parámetros (`$1`, `$2`, etc.) para evitar concatenaciones directas de datos ingresados por el usuario.

## Tests

Los endpoints están testeados utilizando Jest y Supertest.

Ejecutar:

```bash
npm test
```

Actualmente el proyecto cuenta con **2 suites y 17 tests automatizados**, desarrollados con Jest y Supertest.

Las pruebas verifican las operaciones CRUD de autores y publicaciones, las validaciones de datos obligatorios, el formato de los emails, los IDs inválidos, los emails duplicados, las referencias a autores inexistentes y el manejo de JSON malformado.

## Swagger / OpenAPI

La API cuenta con documentación interactiva mediante Swagger UI y una especificación OpenAPI 3.0.

La documentación puede consultarse localmente en:

http://localhost:3000/api-docs

Desde Swagger se pueden consultar y probar los **11 endpoints** de autores y publicaciones.

Además, el proyecto incluye el archivo `openapi.yaml`, que contiene la especificación de la API en formato YAML.

Para actualizar este archivo después de modificar los comentarios de Swagger en las rutas, ejecutar:

```bash
node generate-openapi.js
```

La documentación también está disponible en Railway:

https://proyectom2-gonzalobarbaglia-production.up.railway.app/api-docs

## Deployment

La API REST y la base de datos PostgreSQL se encuentran desplegadas en **Railway**, dentro del entorno de producción.

**API publicada:**

https://proyectom2-gonzalobarbaglia-production.up.railway.app

**Documentación Swagger:**

https://proyectom2-gonzalobarbaglia-production.up.railway.app/api-docs

### Configuración del despliegue

El proyecto utiliza dos servicios en Railway:

- **Aplicación Node.js:** ejecuta el servidor Express y expone los endpoints de la API.
- **PostgreSQL:** almacena la información de autores y publicaciones.

La configuración de conexión se realiza mediante variables de entorno definidas en Railway, utilizando los valores correspondientes a la base de datos de producción.

Las credenciales no se incluyen en el repositorio de GitHub.

### Base de datos en producción

La base de datos utiliza las tablas `authors` y `posts`, relacionadas mediante una clave foránea.

La relación implementa `ON DELETE CASCADE`, de manera que, cuando se elimina un autor, también se eliminan sus publicaciones asociadas.

Los cambios estructurales de esta relación se documentan en `database/migration_001_cascade.sql`.

### Actualización de la aplicación

El código fuente se administra mediante Git y GitHub. Para publicar nuevas modificaciones, se deben guardar los cambios, crear un commit y subirlos al repositorio.

Si el servicio de Railway tiene habilitado el despliegue automático desde GitHub, los nuevos commits de la rama configurada generan un nuevo despliegue.

Las modificaciones de estructura de PostgreSQL requieren ejecutar las migraciones correspondientes; no se aplican automáticamente por subir código a GitHub.

## Relación entre entidades

La relación implementada es:

Un autor puede tener múltiples posts y cada post pertenece a un autor.

## Uso de Inteligencia Artificial

Durante el desarrollo se utilizaron herramientas de Inteligencia Artificial como apoyo para:

- Comprender conceptos de Node.js, Express y PostgreSQL.
- Analizar errores durante el desarrollo.
- Revisar la modularización del proyecto.
- Comprender y mejorar consultas SQL.
- Incorporar tests automatizados.
- Implementar documentación con Swagger/OpenAPI.
- Analizar el proceso de deployment.
- Revisar buenas prácticas y manejo de errores.

La IA fue utilizada como herramienta de acompañamiento y aprendizaje. Las implementaciones fueron probadas y verificadas durante el desarrollo del proyecto.

## Autor

Gonzalo Barbaglia

Proyecto Integrador M2