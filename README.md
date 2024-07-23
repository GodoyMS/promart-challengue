# Challengue PROMART

Proyecto realizado usando Create React App y Nodejs


![image](https://github.com/user-attachments/assets/c9e7acd9-ed28-4516-83f0-326ae059f5cf)




## Scripts para ejecución para servidor

### `cd server`
Ubicarse en el directorio principal e instalar todas las dependecias

### `yarn install`
Instalar todas las dependecias

### Crear un archivo .env
Guiarse del archivo .env.example
Por lo general, puede lucir asi
`DATABASE_URL=mongodb://127.0.0.1:27017/challengue-promart
CLIENT_URL=http://localhost:3000
PORT=5000`

### `yarn run dev`
Correr el proyecto localmente

### (Opcional) Instalar la extension REST CLIENT en Visual Studio Code y correr los scripts de endpoints en el archivo:
`endpoints/clients.http`


## Scripts para ejecución para servidor

### `cd client`
Ubicarse en el directorio principal e instalar todas las dependecias

### `yarn install`
Instalar todas las dependecias

### Crear un archivo .env
Crear una variable REACT_APP_API_URL y colocar el URL del servidor local
Por lo general, puede lucir asi
`REACT_APP_API_URL=http://localhost:5000/api`

### `yarn run dev`
Correr el proyecto localmente




