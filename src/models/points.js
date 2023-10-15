const { DataTypes } = require('sequelize')

module.exports = (database) =>{
    database.define( "Puntos", {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        monto:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fecha: {
            type: DataTypes.STRING,
            allowNull : false
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
