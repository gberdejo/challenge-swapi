## **Swapi Serverless**

### **Install and Run**
##### Primero correr _libretranslate_, es el servicio que use la api para hacer la traducción de idioma

`docker run -ti --rm -p 5000:5000 libretranslate/libretranslate`

##### Configurar las variables de entorno
- ###### No modificar si se usara de forma local
  `API_LIBRETRANSLATE: http://localhost:5000/translate`
- ###### SWAPI The Star Wars API
  `API_SWAPI: https://swapi.dev/api`
- ###### Modificar la ruta dependiente el entorno
  `API_URI: http://localhost:3000`

##### Instalar dependencias con _npm_

`npm install`
##### Hacer el deploy con un comando de _serverless_

`sls deploy --verbose`
##### Correr de forma local con un comando de _serverless_

`sls offline`
