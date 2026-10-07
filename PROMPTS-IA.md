# Uso de Inteligencia Artificial

Durante el desarrollo del Proyecto Integrador M2 utilicé Inteligencia Artificial como herramienta de apoyo para comprender conceptos, analizar errores y mejorar progresivamente la implementación.

La IA no reemplazó las pruebas del proyecto. Cada modificación fue implementada y posteriormente verificada mediante pruebas manuales, Swagger y tests automatizados.

## Prompt 1 - Modularización

**Prompt utilizado:**

> ¿Cómo puedo separar las rutas y los servicios de mi API REST en Node.js y Express sin modificar el funcionamiento del CRUD?

**Influencia en el proyecto:**

Permitió reorganizar el código separando las responsabilidades:

- `routes/` para manejar requests, responses y códigos HTTP.
- `services/` para realizar las consultas a PostgreSQL.
- `db.js` para centralizar la conexión a la base de datos.

---

## Prompt 2 - Consultas SQL seguras

**Prompt utilizado:**

> ¿Cómo puedo realizar consultas SQL parametrizadas con PostgreSQL y Node.js para evitar concatenar directamente los datos recibidos?

**Influencia en el proyecto:**

Se utilizaron placeholders como `$1`, `$2`, etc. en las consultas SQL de los services.

Esto permitió separar la consulta SQL de los valores recibidos por la API.

---

## Prompt 3 - Tests automatizados

**Prompt utilizado:**

> ¿Cómo puedo probar los endpoints de Authors y Posts utilizando Jest y Supertest?

**Influencia en el proyecto:**

Se incorporaron tests automatizados para comprobar operaciones de lectura, creación, actualización, eliminación, validaciones y recursos inexistentes.

El proyecto cuenta con 2 suites y 11 tests.

---

## Prompt 4 - Swagger / OpenAPI

**Prompt utilizado:**

> ¿Cómo puedo documentar los endpoints de mi API REST con Swagger y OpenAPI y poder probarlos desde el navegador?

**Influencia en el proyecto:**

Se incorporaron `swagger-jsdoc` y `swagger-ui-express`.

Los endpoints de Authors y Posts quedaron documentados y pueden probarse desde `/api-docs`.

---

## Prompt 5 - Deployment en Railway

**Prompt utilizado:**

> ¿Cómo puedo desplegar mi API de Node.js con PostgreSQL en Railway manteniendo las variables de entorno seguras?

**Influencia en el proyecto:**

Se configuró la aplicación para utilizar variables de entorno tanto localmente como en Railway.

El archivo `.env` permanece fuera del repositorio mediante `.gitignore`.

---

## Prompt 6 - Variables de entorno local y producción

**Prompt utilizado:**

> En Railway necesito ejecutar `node server.js`, pero localmente necesito cargar `.env`. ¿Cómo puedo utilizar el mismo `npm start` en los dos entornos?

**Influencia en el proyecto:**

Se incorporó `dotenv` y se dejó un único comando:

`npm start`

De esta manera, localmente se cargan las variables desde `.env` y en Railway se utilizan las variables configuradas en la plataforma.

---

## Prompt 7 - Manejo global de errores

**Prompt utilizado:**

> ¿Cómo puedo implementar un middleware global de manejo de errores en Express sin modificar los errores 400 y 404 que ya maneja cada endpoint?

**Influencia en el proyecto:**

Se creó `middlewares/errorHandler.js`.

Los errores esperados continúan siendo tratados por las rutas, mientras que los errores inesperados se envían al middleware mediante `next(error)`.

---

## Prompt 8 - Seed de PostgreSQL

**Prompt utilizado:**

> ¿Cómo puedo crear un seed para Authors y Posts que no dependa de IDs fijos y que pueda ejecutarse nuevamente sin duplicar los datos?

**Influencia en el proyecto:**

Se creó `database/seed.sql`.

Los autores se identifican mediante emails únicos y se incorporaron controles para evitar la duplicación de los datos iniciales.

## Conclusión

La Inteligencia Artificial fue utilizada durante todo el proyecto, para comenzarlo, para avanzar, para el deploy y todas las etapas, no como atajo, si no como maestra, para poder obtener nuevamente todos los conceptos explicados por Camilo Pineda, reafirmarlos, experimentar nuevas ideas, obtener otra explicacion brindada de otras formas particulares (linea a linea de codigo), y sobre todo para la correcion de errores, que si bien tengo algun tipo de conocimiento sobre errores, obtenido de lo que aprendimos, aun para nuestro nivel no somos capaces de debbugear y/o resolver por nuestra cuenta los mismos.  