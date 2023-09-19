import { Sequelize } from "sequelize";

//lo exportamos para crear el modelo
export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
})

//lo exportamos para usar en app.js
export const startDB = async () => {
    try {
        await sequelize.authenticate();
        //await sequelize.sync( {force: true});
        await sequelize.sync();  
        console.log('La conexión se estableció correctamente');
      } catch (error) {
        console.error('No fue posible conectarse a la base de datos:', error);
      }
}