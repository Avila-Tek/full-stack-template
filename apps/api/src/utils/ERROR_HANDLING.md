# Manejo de errores

Los errores deben seguir el estándar RFC 7807 de la Internet Engineering Task Force (IETF) el cual considera la siguiente estructura:

## type
El mismo no se refiere a los códigos http estándar sino a un código de error único de la aplicación.
Este código debe contener solo caracteres alfanuméricos y guiones. Por ejemplo: 0001, auth-0001, incorrect-user-pass.
El mismo le confiere una categoría al error.

## title
Es el texto a mostrar en la UI. Este debe por lo tanto ser traducido dependiendo del idioma que venga en el header Accept-Language.

## status
El código HTTP. Dichos códigos tienen 5 categorías:
100-level (Informational) – el servidor reconoce la solicitud
200-level (Success) – el servidor completó la solicitud de manera exitosa
400-level (Client error) – el cliente está haciendo la solicitud de manera errónea
500-level (Server error) – el servidor falló al completar la solicitud

## detail
Este es el mensaje destinado a los desarrolladores integrándose a la API. El mismo debe estar en inglés y debe guiar al desarrollador para descubrir el problema.

## instance
Referencia al error si este es almacenado a manera de log en la base de datos para no tener que reproducir el error en tiempo real. 
