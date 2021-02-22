const db = require('../../database/models/index')
const {errorName} = require('../../utils/constants')
const {isAuth} = require('../../utils/auth');

module.exports = {
    Query: {
        async productSeller(root, args, context) 
        {
            const {id, page, perpage} = args;
            var from = (page - 1) * Number(perpage) + 1;
            const res = await db.Product.findAndCountAll({ 
                where: { "sellerId" : id }, 
                order: [['q_available', 'DESC']],
                include: [{ model: db.ProductCategory, as: 'category'}],
                offset: from, limit: perpage})  
            const products = res.rows.map((product) => {return product.dataValues})
            console.log(products)
        return  {products: products, nb_products: res.count}
        }
    }, 
    Mutation: {
        async createProduct(root, args, context) {
            const {product} = args;
            const {user} = context;
            if (!isAuth(user, 'SELLER')) {
                return new Error(errorName.UNAUTHORIZED);
            }
            const product = await db.Product.create({product});
            return product;
        },
        async createProduct(root, args, context) {
            const {product} = args;
            const {user} = context;
            if (!isAuth(user, 'SELLER')) {
                return new Error(errorName.UNAUTHORIZED);
            }
            const product_in_db = await db.Product.findOne({where:{id: product.id}});
            for (let key in product) {
                product_in_db[key] = product[key];
            }
            product_in_db.save()
            return product_in_db;
        }
    },
};
