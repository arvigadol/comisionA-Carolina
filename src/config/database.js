import { Sequelize } from "sequelize";

//lo exportamos para crear el modelo
export const sequelize = new Sequelize('db_posteo', 'root', '', {
    host: 'localhost',
    dialect: 'mysql' 
})

//lo exportamos para usar en app.js
export const startDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}