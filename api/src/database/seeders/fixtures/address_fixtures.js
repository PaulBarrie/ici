let faker = require('faker')
const Address = require('../../models/address')
faker.locale = 'fr'

const genAddress = (queryInterface, Sequelize, id, persona) => {
    const loc = faker.address.nearbyGPSCoordinate([43.545333, 1.4679206]) //set your own location
    if (persona === 'client') {
        const res = queryInterface.bulkInsert('Address',[{
            location: Sequelize.fn('ST_GeomFromText', `POINT(${loc[0]} ${loc[1]})`, '4326'),
            street_nb: Math.floor(Math.random() * 100),
            street_name: faker.address.streetName(),
            post_code: faker.address.zipCode(),
            city: faker.address.city(),
            country: 'France',
            clientId: id,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {returning: true})
    } else if (persona === 'seller') {
        const res = queryInterface.bulkInsert('Address',[{
            location: Sequelize.fn('ST_GeomFromText', `POINT(${loc[0]} ${loc[1]})`, '4326'),
            street_nb: Math.floor(Math.random() * 100),
            street_name: faker.address.streetName(),
            post_code: faker.address.zipCode(),
            city: faker.address.city(),
            country: 'France',
            sellerId: id,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {returning: false})
    } else {
        throw new Error('Invalid persona type')
    }
}

module.exports = genAddress