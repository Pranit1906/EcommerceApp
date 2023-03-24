const {defineCart} = require('../Models/cart.model');
const dbConnection = require('./dbConnection');
const {User} = require('../Repository(CRUD Ops)/user.repository');
const {Product}=  require('../Repository(CRUD Ops)/product.repository');

const Cart = defineCart(dbConnection.connection, dbConnection.DataTypes);

exports.cartTableCreation = async()=>{
    // const CartProduct = dbConnection.connection.define('cart_product',{
    //     'quantity' : {
    //       type: dbConnection.DataTypes.INTEGER,
    //       allowNull: false
    //     }
    // })

    Product.belongsToMany(Cart,{
        through: 'cart_product',
        foreignKey: 'productId',
        otherKey: 'cartId'
    })

    Cart.belongsToMany(Product,{
        through: 'cart_product',
        foreignKey: 'cartId',
        otherKey: 'productId'
    })
    User.hasMany(Cart);
    Cart.belongsTo(User);
    await Cart.sync();
    await Product.sync();
    await User.sync();

    dbConnection.connection.sync(); //dbConnection.connection ==> this .connection is Sequelize Object
    // Calling .sync on this Object will Sync Over all Models of all  databases Together.
    //This Automatically creates table name cart_product after using .sync 
}

exports.addCart = async(cart)=>{
    return await Cart.create({
        cost : cart.cost
    })
}

exports.getCart = async(cartId)=>{
    return await Cart.findByPk(cartId);
}

