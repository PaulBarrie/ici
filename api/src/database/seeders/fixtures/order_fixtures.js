let faker = require('faker')
const Order = require('../../models/order')
faker.locale = 'fr'

const genOrder = (queryInterface, clientId) => {
    const rec = faker.random.boolean()
    const order = queryInterface.bulkInsert('Order',[{
        time_order: faker.date.past(1),
        sent: true,
        time_sent: faker.date.past(),
        received: rec,
        time_rec: rec ? faker.date.past(): null,
        clientId: clientId,
        createdAt: new Date(),
        updatedAt: new Date()
    }], {returning: true})
    return order
}

module.exports = genOrder