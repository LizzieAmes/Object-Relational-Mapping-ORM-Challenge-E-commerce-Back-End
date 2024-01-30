// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

<<<<<<< HEAD
// Products belongsTo Category  
Product.belongsTo(Category, { foreignKey: 'category_id'});

// Categories have many Products
Category.hasMany(Product, { foreignKey: 'category_id'});  
=======
// Products belongsTo Category

// Categories have many Products
>>>>>>> 4417f3c481f9a9828b84b9da613785fd6e2c32c6

// Products belongToMany Tags (through ProductTag)

// Tags belongToMany Products (through ProductTag)

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
