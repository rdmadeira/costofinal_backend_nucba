﻿# Proyecto Backend - Nucba Full Stack Developer - Bootcamp

 ## Objetivo
 ### Este proyecto consiste en desarollar una API para backend del proyecto Costofinal - página real de ventas de componentes, para el curso de bootcamp de Nucba. 

 ## Herramientas utilizadas
 Al desarollo del proyecto se utilizaron las siguientes herramientas y frameworks:

 ### Node JS;
 ### Express;
 ### Typescript;
 ### MongoDB y Mongoose;
 ### BcryptJS;
 ### Json Web Token;
 ### Nodemailer;
 ### Dotenv;
 ### Cors;
 ### Nodemon;

 ## Base de datos:
 Se eligió una base de datos no relacional, pero con referencia por ID en MongoDB. Se utilizó Mongoose para adoptar los models como entidades. 

 ## Nodemailer:
 Hay interacción con el usuario atraves de emails, por los pedidos generados y por opción de cambio de contraseña.

 ## JsonWebToken:
 Se utilizó token para authenticación de algunas rutas de la api, para generar links de email y resetar contraseñas del usuario. 

 ## Express:
 Creacción de Middlewares de rutas, y manejo de errorres, atraves de classes de Error customizados, controladores y validadores de autenticación, middlewares de uso del app, etc. Y creacción del servidor.

 ## Scripts utilizados:

 ### build - para construcción de la app en Javascript, se utilizó tsc --build tsconfog.json para generar en la carpeta 'dist' toda la construcción del codigo en typescript a javascript es6.

 ### dev - correr localmente el servidor con ts-node esm-loader y nodemon

 ### seed - correr la función de alimentación de la base de datos por medio del archivo seed.ts

 
