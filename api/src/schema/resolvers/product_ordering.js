const db = require('../../database/models/index')
const {errorName} = require('../../utils/constants')
const {isAuth} = require('../../utils/auth');


module.exports = {
    Query: {
        async basket(_, __, {req}) {
            const user = JSON.parse(req.headers.user);
            if(!isAuth(user)) {
                return new Error(errorName.UNAUTHORIZED);
            }
            const basket = await db.ProductOrder.findAll({
                include: [{
                    model: db.Order, as: 'order', 
                    where: {clientId: user.uid, validated: false}},
                    {model: db.Product, as: 'product'}
                    
                ]
            })
            const res  = basket.map((prod_order) =>  {
                prod_order =  prod_order.dataValues;
                prod_order.order = prod_order.order.dataValues;
                prod_order.product = prod_order.product.dataValues;
                return prod_order
            });
            return res;
        },
        async validatedOrders(_,__, {req}) {
            const user = JSON.parse(req.headers.user);
            if(!isAuth(user)) {
                return new Error(errorName.UNAUTHORIZED);
            }
            const basket = await db.ProductOrder.findAll({
                include: [{
                    model: db.Order, as: 'order', 
                    where: {clientId: user.uid, validated: true}},
                    {model: db.Product, as: 'product'}
                    
                ]
            })
            const res  = basket.map((prod_order) =>  {
                prod_order =  prod_order.dataValues;
                prod_order.order = prod_order.order.dataValues;
                prod_order.product = prod_order.product.dataValues;
                return prod_order
            });
            return res;
        }
    }, 
    Mutation: {
        async addToBasket(_, args, {req}) {
            const {p_order} = args;
            const user = JSON.parse(req.headers.user);
            if(!isAuth(user)) {
                return new Error(errorName.UNAUTHORIZED);
            }
            const product = await db.Product.findOne({where: {id: p_order.product_id}});
            if (!product) {
                return new Error(errorName.INVALID_PRODUCT_ID);
            }
            // Look if there is an existing basket
            let basket = await db.Order.findOne({where: {clientId: user.uid, validated: false}});
            
            // If not created already basket
            let product_order;
            if (!basket) {
                basket = await db.Order.create({clientId: user.uid});
                product_order = await db.ProductOrder.create({
                    quantity: p_order.quantity, 
                    total_price: p_order.quantity * product.price_ht * (1 + product.tax_rate),
                    orderId: basket.id,
                    productId: p_order.product_id
                })
            } else {
                product_order = await db.ProductOrder.findOne({where: {orderId: basket.id, productId: p_order.product_id}});
                if (!product_order) {
                   product_order = await db.ProductOrder.create({
                    quantity: p_order.quantity, 
                    total_price: p_order.quantity * product.price_ht * (1 + product.tax_rate),
                    orderId: basket.id,
                    productId: p_order.product_id
                })
                } else {
                    //Product already in basket
                    product_order.quantity = p_order.quantity;
                    product_order.save();
                }
            }
            product_order = product_order.dataValues;
            delete product_order["productId"];
            product_order.product = product;
            console.log(product_order);
            
            return {productOrdering: product_order, order: basket.dataValues}
            
        },
        async removeProductFromBasket(_, args, {req}) {
            const {p_order_id} = args;
            const user = JSON.parse(req.headers.user);

            if(!isAuth(user)) {
                return new Error(errorName.UNAUTHORIZED);
            }
            const rm_item = await db.ProductOrder.destroy({ where: {id: p_order_id}})
            if (rm_item == 0) {
                return new Error(errorName.INVALID_PRODUCT_ORDER_ID)
            }
            return {code: 201, message: "Product withdrawn from basket"};
        }
    },
};
