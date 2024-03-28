# Manejo de errores

Los errores deben seguir el estándar RFC 7807 de la Internet Engineering Task Force (IETF) el cual considera la siguiente estructura:

## type
El mismo no se refiere a los códigos http estándar sino a un código de error único de la aplicación.
Este código debe ser un string sin espacios en camel case, como una variable. Por ejemplo: incorrectUserPass.
El mismo le confiere una categoría al error.

## title
Es el texto a mostrar en la UI. Este debe por lo tanto ser traducido dependiendo del idioma que venga en el header Accept-Language.

## status
El código HTTP. Se manejarán 2 categorías:
400-level (Client error) – el cliente está haciendo la solicitud de manera errónea
500-level (Server error) – el servidor falló al completar la solicitud

## detail
Este es el mensaje destinado a los desarrolladores integrándose a la API. El mismo debe estar en inglés y debe guiar al desarrollador para descubrir el problema. Puede ser el mensaje de error del catch.

## instance
Referencia al error si este es almacenado a manera de log en la base de datos para no tener que reproducir el error en tiempo real. 

Los mensajes de los Error manejados deben contar con el formato <status-type> para que el error handler pueda generar el error con la estructura deseada.