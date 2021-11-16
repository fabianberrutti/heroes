
# Proyecto Heroes: Angular 12

## link:

https://drive.google.com/file/d/1OxM-egJVALXVwwSGjZ7d-Wjb2-VQcCfR/view?usp=sharing

## Correr Proyecto Sin Docker:

1 - Instalar dependencias
npm install
2 - Correr el servidor
ng serve
3 - Abrir el navegador en localhost:4200
http://localhost:4200

## Con Docker:

1 - Crear la imagen
docker build -t heroes . (NO OLVIDAR EL .)
2 - Correr la imagen
docker run -d -it -p 8080:80 heroes
3 - Abrir el navegador
http://localhost:8080/
## Correr Estilos

npm run lint

## Corregir Estilos

npm run lint-fix

## Coverage Unit Testing

npm run test

