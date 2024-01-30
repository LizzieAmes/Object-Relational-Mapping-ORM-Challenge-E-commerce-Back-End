const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

<<<<<<< HEAD
Category.init({
 id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  category_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
=======
Category.init(
  {
    // define columns
  },
>>>>>>> 4417f3c481f9a9828b84b9da613785fd6e2c32c6
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
