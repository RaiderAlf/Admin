const { DataTypes } = require('sequelize')

module.exports = (database) =>{
    database.define( "Empleados", {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        nombre_usuario:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        ci:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        numberTlf:{
            type: DataTypes.STRING,
            allowNull: true
        },
        adminRole:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        token:{
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },
        deleted:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }  
    })
}