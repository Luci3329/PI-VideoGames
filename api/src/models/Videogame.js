const { DataTypes } = require('sequelize');
//const { UUID } = require("uuid");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    
    id: {
      type: DataTypes.UUID,
      defaultValue : DataTypes.UUIDV4,
      allowNull : false,
      primaryKey : true
    },
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    background_image: {
      type : DataTypes.TEXT
    },

    description : {
      type: DataTypes.STRING,
      allowNull: false,
    },

    released : {
      type: DataTypes.DATE
      /* defaultValue: format('YYYY-MM-DD') */
    },

    rating : {
      type: DataTypes.FLOAT  // **
    },

    platforms : {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false
    },

    createdInDB : {
      type : DataTypes.BOOLEAN,
      allowNull : false,
      defaultValue : true
    }

  });
};

