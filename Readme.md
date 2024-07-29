pasos para iniciar el proyecto con docker.
    1- ir a la ruta /proyectos/Gastify-Cloud/backend/src/db/index.js
    2- cambiar la variable urlLocal por urlDocker en const {database = new Sequelize(`${urlLocal}`,}
    3- ejeutar el comando {docker-compose up} en la raiz del proyecto {/Gastify-Cloud} donde se       encuentra el archivo {docker-compose.yml}

 docker ejecuta automaticamente todo, frontend,backend y la base de datos.    