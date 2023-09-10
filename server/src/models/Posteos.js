import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";


//ponemos Posteo en singular pero se va a guardar en plural en la db. Lo exportamos para que lo usen los controladores
export const PosteoModel = sequelize.define('Posteo',{

    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: true
    },
    url_image: {
        type: DataTypes.STRING,
        allowNull: true
    } 
}, {
    timestamps: true
})