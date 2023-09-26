const { DataTypes } = require('sequelize')

module.exports = (database) =>{
    database.define( "Puntos", {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        monto:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        fecha: {
            type: DataTypes.DATE,
            get() {
              return new Date(this.getDataValue('fecha'));
            },
            set(fecha) {
              this.setDataValue('fecha', fecha.toISOString().split('T')[0]);
            }
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
