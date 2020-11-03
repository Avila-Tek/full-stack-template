# Avila Tek Next.js Template

![Avila Tek Logo](https://avilatek.dev/assets/images/logo_white.png)

Este repositorio es una plantilla para los proyectos Full Stack desarrollados por Avila Tek, esta configurado para clonarlo, instalar las dependencias y empezar a trabajar, en caso de que estes buscando un template para un [landing page](https://github.com/Avila-Tek/next-template) puedes referirte a este [repositorio](https://github.com/Avila-Tek/next-template).

En [Avila Tek](https://avilatek.dev) estamos comprometido con el Open Source, ya que nuestra compañía ha crecido alrededor de esta gran comunidad y a traves de pequeños proyectos, estamos tratado de volver lo que esta comunidad nos ha dado.

## Contenido

Este repositorio se divide en tres carpetas `client`, `dashboard` y `backend`, como sus nombres indican las existen tres aplicaciones diferentes una para clientes, otra para la parte administrativa y un backend. Tanto `client` como `dashboard` son proyectos de [next.js](https://nextjs.org) mientras que el backend es una api de [GraphQL](https://graphql.org)

## Como usarlo

Por primero es clonar este repositorio

```bash
git clone https://github.com/Avila-Tek/full-stack-template.git <folder_name>
```

En donde se debe cambiar `<folder_name>` por el nombre de la carpeta a utilizar. Después git debe eliminarse la carpeta `.git` de este repositorio e iniciar un nuevo proyecto de git al cual le añadirás el correspondiente remoto. Para ello deberás hacer lo siguiente:

```bash
cd <folder_name>
sudo rm -r .git/
git init
```

Una vez configurado git deberás instalar las dependencias

```bash
cd client && npm install && cd ../
cd dashboard && npm install && cd ../
cd backend && npm install && cd ../
```

### Iniciar los servidores

Deberás comunicarte con el Lead Engineer para que te facilite, los accesos a la base de datos, este deberá facilitar las variables de entorno en un (o varios) archivo `.env` **El cual no deberás incluir en git por ningún motivo**, en los repositorios esta disponible un ejemplo de los archivo por aplicación para que te guíes y debes construirlos tu mismo

Luego deberás tener multiples ventanas (o pestañas) de la terminal abierta para ejecutar `npm run dev` en las 3 carpetas y tendrás en ejecución los 3 servicios:

1. El client frontend en [http://localhost:7777](http://localhost:7777)
2. El dashboard frontend en [http://localhost:8888](http://localhost:8888)
3. El backend en [http://localhost:5555/graphql](http://localhost:5555/graphql)

### Configurar Sentry

Para configurar Sentry comunicate con el Lead Engineer para que te facilite los token de sentry y como referencia puedes leer el ejemplo de [Next.js](https://github.com/vercel/next.js/tree/canary/examples/with-sentry) para el caso de las app de frontend, en el backend el Lead deberá incluir en las variables de entorno el DSN de sentry.

## Documentación Adicional

- Si deseas revisar la documentación de backend puedes hacerlo [aquí](/backend/README.md)
- Si tienes alguna duda de [Next.js](https://nextjs.org/docs)
- Cualquier otra duda puedes comunicarte con el Lead Engineer o el CTO.

## Changelog

Puedes revisar el changelog [aquí](/CHANGELOG.md)

## Licencia

Este proyecto se encuentra bajo la licencia de MIT

## Autores

1. [Jose R. Quevedo](https://github.com/zoomelectrico)
2. [Luis E. Bello](https://github.com/luiseduardobello)
