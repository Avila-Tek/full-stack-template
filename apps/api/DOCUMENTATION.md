# Documentación del código

El código de la API debe estar documentado utilizando JSDoc. Para que JSDoc pueda generar la documentación, es necesario agregar antes de cada item a ser documentado un comentario que debe iniciar con la secuencia de caracteres /**

JSDoc utiliza etiquetas para describir el código. Específicamente esta plantilla exige el uso de las siguientes etiquetas con los siguientes propósitos:

## @async
Indicar que una función es asíncrona.
JSDoc suele detectar que una función es asíncrona sin la etiqueta pero utilizamos como estándar agregarla.

## @default [<some value>]
Documentar el valor por default de una variable o constante.
JSDoc automáticamente asigna la etiqueta a aquellas constantes a las que se les asigna un string, número, boolean o null pero de igual manera tenemos como buena práctica agregar la etiqueta para saber cuando una variable o constante tiene un valor por defecto.

## @deprecated [<some text>]
Marcar código como obsoleto.
Se puede utilizar sola o con un texto que provea mayor información.

## @description <some description>
Agregar una descripción del código.
La descripción puede contar con HTML o Markdown para brindarle el formato deseado a la documentación generada y debe estar en inglés.

## @enum [<type>]
Documentar los enum.
Por lo general se acompaña esta etiqueta con la de @readonly porque los enums no son modificados por el código, es decir, son constantes.

## @example
Proveer un ejemplo sobre cómo utilizar algún item del código.
Un mismo comentario JSDoc puede contar con más de una etiqueta @example.

## @fires
Indicar un evento que es desencadenado cuando un método es llamado.
El código del evento desencadenado debe ser tambien identificado con la etiqueta @event y @listens haciendo referencia al método que lo desencadena para documentar flujos dentro de la API.

## @function [<FunctionName>]
Indicar que un item de código es una función.
Aunque la mayoría de los items de código son funciones y JSDoc es capaz de identificarlas, utilizamos la etiqueta @function para identificar las funciones dentro del código.

## @global
Indicar que una constante es de uso global en el archivo.
Tambien es posible utilizarla para una constante que es global dentro de un item de código o función. En este caso se acompaña de la etiqueta @inner.

## @implements {typeExpression}
Indicar el item de código o interface que implementa una función.
Al agregar la etiqueta @implements a un item de código, JSDoc otorga la etiqueta de @interface al item implementado.

## @interface [<name>]
Identificar un item de código como interfaz.
Aunque se le asigne a la contraparte la etiqueta @implements, utilizamos como estándar identificar las interfaces con la etiqueta @interface.

## @listens <eventName>
Identificar el item de código que es llamado a partir de otro.
Utilizado en funciones que son ejecutadas al ser llamadas por otra.

## @param
Proveer nombre, tipo y descripción al parámetro de una función.
El tipo del parámetro debe ir entre llaves {} antes del nombre y la descripción.

## @readonly
Identificar una constante o función que solo retorna valores y no los modifica de ninguna forma.
Tambien es utilizado para documentar los enums.

## @requires <someModuleName>
Identificar que un item de código requiere de un module específico para funcionar.
Útil para saber que es necesario hacer npm install y contar con una librería en los node modules.

## @returns [{type}] [description]
Identificar el valor que retorna una función.
El tipo del valor retornado debe ser indicado entre llaves {}.

## @see <text>
Permite indicar otro item de código o una referencia que se debe consultar para entender el funcionamiento o flujo.
Utilizar con la etiqueta @link si se trata de un link a consultar. Se utiliza en lugar de @fires y @listens si no se trata de un evento o trigger sino solo funciones o items de código que están relacionados y que en conjunto completan una funcionalidad, flujo o épica.

## @since <versionDescription>
Indicar la versión desde la cual se incluyó la funcionalidad o item de código.
Es importante mantener versionado el código e identificar desde qué versión está disponible una funcionalidad.

## @summary Summary goes here
Describir resumidamente la funcionalidad de un item del código.
A diferencia de la etiqueta de @description que otorga una descripción detallada de la funcionalidad del código, la etiqueta @summary debe servir para buscar rápidamente en qué parte del código está alguna funcionalidad. Debe estar en inglés y contar con un máximo de 5 palabras.

## @throws {<type>} free-form description
Documentar los errores que una función arroja.
Se puede incorporar la etiqueta más de una vez en un comentario JSDoc.

## @todo text describing thing to do
Documentar tareas por hacer.
Se puede utilizar la etiqueta más de una vez en el mismo comentario JSDoc.

## @tutorial
Insertar el link de un tutorial para el uso o implementación de un item de código.
Se puede utilizar mas de una vez en el mismo comentario JSDoc.

## @type {typeName}
Identificar el tipo de un valor.
El tipo de un valor tambien puede ser especificado dentro de otras etiquetas como @param, @throws y @returns.

## @typedef [<type>] <namepath>
Identificar un tipo de dato custom.
Se deben identificar con la etiqueta @typedef aquellas interfaces definidas que serán utilizadas como tipos en otras etiquetas como @param, @throws y @returns.

## @version
Documentar la versión de un item de código.
A diferencia de la etiqueta @since que permite identificar desde que versión de la API está disponible el feature, la etiquera @version permite versionar items de código dentro de la API.

Para generar el html con la documentación, ejecutar npm run generate-docs en el root del proyecto.
El html generado se guarda en la carpeta docs en el root del proyecto.
