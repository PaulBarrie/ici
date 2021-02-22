const genProductOrder = (queryInterface, orderId, productId) => {
    const prod_order =  queryInterface.bulkInsert('ProductOrder', [{
        quantity: Math.random()* 100,
        total_price: Number(Math.random() * 10).toFixed(2),
        productId: productId,
        orderId: orderId,
        createdAt: new Date(),
        updatedAt: new Date()
    }], {returning: true})
    return prod_order
}

module.exports = genProductOrder