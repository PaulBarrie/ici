let faker = require('faker')
const Product = require('../../models/product')
faker.locale = 'fr'

const genProduct = (queryInterface, sellerID, categoryID) => {
    const prod = queryInterface.bulkInsert('Product',[{
        name: faker.company.companyName(),
        expiration: faker.date.future(),
        q_available: Math.floor(Math.random() * 1000),
        description: faker.lorem.text(15),
        tax_rate: Number(Math.random()).toFixed(2), 
        price_ht: Number(Math.random() * 100).toFixed(2),
        measure_unit: ['g', 'L', 'unit'][Math.floor(Math.random() * 3)],
        sellerId: sellerID,
        categoryId: categoryID,
        createdAt: new Date(),
        updatedAt: new Date()
    }], {returning: true})
    return prod
}

module.exports = genProduct