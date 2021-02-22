let faker = require('faker');
faker.locale = 'fr'

const genSeller =  (queryInterface) => {
    const pcer =  queryInterface.bulkInsert('Seller', [{
                name: faker.company.companyName(),
                email: faker.internet.email(),
                phone: faker.phone.phoneNumber(),
                password: 'test',
                createdAt: new Date(),
                updatedAt: new Date()
    }], {returning: true});
    console.log(pcer);
    return pcer;
}

module.exports = genSeller;