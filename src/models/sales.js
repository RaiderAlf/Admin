const { DataTypes } = require('sequelize')

module.exports = (database) =>{
    database.define( "Ventas", {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        titulo:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        completada:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        deleted:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }  
    })
}
