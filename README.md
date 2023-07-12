# Template

> 🚧 WIP

## 0. Prerequisitos

Para poder ejecutar este proyecto es necesario tener instalado [node.js](https://nodejs.org/en/download/) >= v18, se recomienda instalar la versión **LTS**. Al instalar node.js por defecto se instala el manejador de paquete `npm` se recomienda la versión >= 8.

> Es recomendable utilizar [nvm](https://github.com/nvm-sh/nvm)

Para asegurarse que ambas herramientas estén instaladas deberá ejecutar los siguientes comando y recibir salidas parecidas a las siguientes:

```shell
$ node --version
# v18.12.1
```

```shell
$ npm --version
# v9.2.0
```

Adicionalmente a estas herramientas del ecosistema de javascript es necesario tener instalado el _cli_ de `git` dentro de la computadora para ello puede revisar la [documentación](https://git-scm.com/downloads). Luego puede verificar la instalación usando el siguiente comando:

```shell
$ git --version
# git version 2.37.1 (Apple Git-137.1)
```

Adicionalmente, se recomienda instalar un browser como alguno basado en Chromiu y un editor de código como Visual Studio Code.

## 1. Clonar el repositorio

Una vez configurado el ambiente de trabajo, lo siguiente será clonar el repositorio para ello puede hacerlo utilizando el siguiente comando:

```shell
git clone git@github.com:Avila-Tek/avila-tek.git
```

Después se seguir las instrucciones del _cli_ debería tener una carpeta llamada `los-avila-tek` en la cual encontrará el código fuente del proyecto.

Una vez clonado, el repositorio es necesario crear agregar las variables de entorno del proyecto, para esto puede comunicarse con el líder técnico del proyecto.

## 2. Instalar dependencias

Para instalar las dependencias se utilizará el manejador de paquetes `npm`. Es necesario que se se encuentre dentro de la carpeta del proyecto si se quedo en el paso anterior podrá hacerlo haciendo `cd los-avila-tek`, para instalar las dependencias entonces se ejecuta el siguiente comando:

```shell
npm install
```

## 3. Ejecutar el proyecto

Una vez instaladas las dependencias deberá ejecutar el siguiente comando para montar el servidor de desarrollo.

```shell
npm run dev
```

## 4. Desarrollo

> 🚧 WIP

## 5. Guías de estilo

### 5.1. Convenciones de nomenclatura

- Usa nombres descriptivos para las variables, constantes, funciones y clases.
- Usa camelCase para las variables y las funciones.
- Usa PascalCase para las clases e interfaces.
- Evita abreviaturas innecesarias y nombres demasiado largos.
- Usa nombres de archivo y directorio que reflejen su contenido y utilicen minúsculas.

### 5.2. Formato de código

- Usa indentación de 2 espacios.
- Usa punto y coma al final de cada declaración.
- Usa comillas simples para las cadenas de texto.
- Usa la sintaxis de template literals para construir cadenas de texto concatenadas.
- Usa las sintaxis de ESNext donde sea posible.
- Usa la sintaxis de destructuring para desempaquetar objetos y arrays.
- Respeta las reglas de eslint configuradas.

### 5.3. Tipos y interfaces

- Usa tipos explícitos siempre que sea posible.
- Usa interfaces para definir estructuras de datos complejas.
- Usa tipos de unión para las propiedades que pueden ser de diferentes tipos.
- Usa tipos genéricos para hacer que tus funciones y clases sean más flexibles.

### 5.4. Funciones

Usa funciones de flecha para funciones cortas y simples.
Usa nombres de función que describan claramente lo que hace la función.
Usa parámetros opcionales con valores por defecto para simplificar las funciones.
Usa funciones que devuelvan una sola cosa y no tengan efectos secundarios.

### 5.5 Estilo de React

- Usa componentes funcionales siempre.
- Usa el hook useState() para manejar el estado local de los componentes.
- Usa el hook useReducer() para manejar el estado si se tienen más de 5 useState().
- Usa el hook useEffect() para manejar los efectos secundarios en los componentes.
- Evitar hacer propdrilling, si es necesarios pasar un props en mas de 4 niveles; use un contexto para ello
- Usa la sintaxis de destructuring para acceder a las propiedades de los objetos.

### 5.6. Misceláneo

- Usa comentarios para explicar el código complejo.
- Usa el linter para comprobar que tu código cumple con los estándares de estilo y calidad.
- Usa pruebas unitarias para asegurar la calidad y funcionalidad de tu código.
  Estas son solo algunas pautas generales, pero recuerda que lo importante es ser consistente en tu estilo de código y trabajar en equipo para establecer las convenciones adecuadas para tu proyecto.

## 6. FAQ

<details>
  <summary>Como instalo una dependencia</summary>

Para instalar un paquete de _npm_ es necesario utilizar le siguiente comando:

```shell
npm i --workspace=<path/to/project> <package-name>
```

</details>
