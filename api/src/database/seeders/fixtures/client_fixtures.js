let faker = require('faker')
const Client = require('../../models/client')
faker.locale = 'fr'

const genClient = (queryInterface) => {
    const cli = queryInterface.bulkInsert('Client',[{
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        password: 'test',
        createdAt: new Date(),
        updatedAt: new Date()
    }], {returning: true})
    return cli
}

module.exports = genClient