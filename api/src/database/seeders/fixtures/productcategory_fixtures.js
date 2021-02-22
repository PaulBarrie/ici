const ProductCategory = require('../../models/productcategory')

const genProductCategory = (queryInterface, name) => {
    const prod = queryInterface.bulkInsert('ProductCategory',[{
        name: name,
        createdAt: new Date(),
        updatedAt: new Date()
    }],{returning: true});
    return prod
}
module.exports = genProductCategory