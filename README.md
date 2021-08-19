# Verificación de ADN
Servicio que detecta si una persona tiene diferencias genéticas basándose en su secuencia de ADN.

## Ejecución en modo local
Ejecutar el comando `npm run dev` para ejecutar el servicio en modo de desarrollo. la URL del servicio es `http://localhost:3011`. La aplicación se recarga automáticamente al realizar cualquier cambio en el código fuente.

### Variables de entorno
La aplicación utiliza dos variables de entorno: 
`PORT`: Indica el puerto en el que se ejecuta la aplicación. El valor por defecto es 3011.
`DATABASE`: Cadena de conexión al servidor de BD o cluster de BD de MongoDB.

Deberá verificar que existe el archivo `.env` en la carpeta `src`

## Base de Datos
Para almacenar las verificaciones realizadas, la aplicación utiliza una BD NoSQL MongBD 4.4.8

## Build
Para transpilar el código fuente a Vanilla JS, ejecutar el comando `npm run build`. Se generará la carpeta build con el código fuente.

## Ejecución de pruebas unitarias
Ejecutar el comando `npm test` para las pruebas unitarias del servicio de verificación de ADN

## Ejemplos

### Verificación
Para ejecutar la verificación, enviar una petición `POST` a la ruta `v1/mutation`. Por ejemplo, en modo local sería `http://localhost:3011/v1/mutation`. Deberá enviar un objeto JSON con el siguiente formato:
```js
{
    "dna": [
        "ATGCGA",
        "CAGTGC",
        "TTATTT",
        "AGACGG",
        "GCGTCA",
        "TCACTG"
    ]
}
```

Si existe una mutación recibirá una respuesta `HTTP 200-OK` con el siguiente contenido:
```js
{
    error: false,
    data: {
        result: true
    },
    message: 'Se detectó mutación en el ADN'
}
```

En caso contrario recibirá una respuesta `403-Forbidden` con el siguiente contenido:
```js
{
    error: true,
    data: {
        result: false
    },
    message: 'La cadena recibida no tiene mutaciones'
}
```
### Estadísticas
Para obtener las estadísticas de las verificaciones realizadas, deberá enviar una petición `GET` a la ruta `v1//mutation/stats`. En modo local sería `http://localhost:3011/v1/mutation/stats`. Recibirá una respuesta con el siguiente contenido:
```js
{
    error: false,
    data: {
        count_mutations: 40,
        count_no_mutation: 100,
        ratio: 0.4
    },
    message: 'Las estadísticas se obtuvieron correctamente'
}
```
