exports.defineCart = (conn, DataTypes)=>{
    const Cart = conn.define('cart',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cost:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Cart;
}