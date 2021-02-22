const db = require('../../database/models/index')
const sha256 = require('crypto-js/sha256')
const Base64 = require('crypto-js/enc-base64')
const {errorName, errorMessage} = require('../../utils/constants')
const {createToken} = require('../../utils/auth')

module.exports = {
    Query: {
      async seller(root, args, context){
        return await db.Seller.findOne({where: args});
      },
      async sellersAround(root, args, context){
        const {dist, from} = args;
        const attributes = Object.keys(db.Address.rawAttributes);
        const location = db.sequelize.literal(`ST_GeomFromText('POINT(${from[0]} ${from[1]})')`);
        var distance = db.sequelize.fn('ST_Distance_Sphere', db.sequelize.literal('location'), location);
        attributes.push([distance,'distance']);

        const sellers = await db.Address.findAll({
          where: db.sequelize.and(
            from[0] && from[1] && dist ? db.sequelize.where(
              db.sequelize.literal(
              `6371 * acos(cos(radians(${from[0]})) * cos(radians(ST_X(location))) * cos(radians(${from[1]}) - radians(ST_Y(location))) + sin(radians(${from[0]})) * sin(radians(ST_X(location))))`),
              '<=',
              dist,
              ) : null ,
            { 
              clientId: null
            }
        ), include: [{ model: db.Seller, as: 'Seller' }]});
        // Format results
        const res = sellers.map((seller) => {
          const addr = seller["dataValues"]
          const seller_bin = addr.Seller["dataValues"]
          addr.location = addr.location.coordinates
          delete addr.Seller
          return {...seller_bin, address: addr}
        })
        return res
        
      }
    }, 
    Mutation: {
      loginSeller: async (root, args, context) => {
        let {identifier, password, remember} = args;
        const hashPwd = Base64.stringify(sha256(password));
        remember = remember || false;
        try {
          if (identifier.includes("@")) {
            const seller = await db.Seller.findOne({where: {email: identifier}})
            if(seller == null) {
              return new Error(errorName.INVALID_EMAIL)
            } else {
                if (hashPwd == seller['dataValues']['password']) {
                  return createToken('SELLER', seller.id, remember);
                } else {
                  return new Error(errorName.INVALID_PASSWORD)
                }
                
            } 
          } else {
              const seller = await db.Seller.findOne({where: {phone: identifier}})
              if(seller == null) {
                return new Error(errorName.INVALID_PHONE)
              } else {
                if (hashPwd == seller['dataValues']['password']) {
                  return createToken('SELLER', seller.id, remember);
                } else {
                  return new Error(errorName.INVALID_PASSWORD)
                }
              }
          }
          
        } catch (err) {
            console.log(err);
            return new Error(errorName.INTERNAL_ERROR); 
        }
      },
      // isLoggedIn: async (root, args, context) => {
      //   const {name, email, phone, password} = args.seller;
        
      // },
      createSeller: async (root, args, context) => {
        const {name, email, phone, password} = args.seller;
        const email_used = await emailUsed(email);
        const phone_used = await phoneUsed(phone);
        if (email_used) {
          return new Error(errorName.EMAIL_ALREADY_USED);
        } else if (phone_used) {
          return new Error(errorName.PHONE_ALREADY_USED);
        } else {
          try {
            const hashPwd = sha256(password)
            const seller = await db.Seller.create({
              name: name, email: email, phone: phone, password: Base64.stringify(hashPwd), createdAt: Date.now(), updatedAt: Date.now()
            });
            return seller;
          } catch (err) {
            console.log(err)
            return new Error(errorName.INTERNAL_ERROR);
          }
        }
      },
      updateSeller: async (root, args, context) => {
        const {where, update} = args;
        const seller = await db.Seller.update(update, {where: where});
        return seller;
      },
      deleteSeller: async (root, args, context) => {
        const {id} = args;
        await db.Seller.destroy({where: {id: id}});
        return {code: 200, msg: "User deleted"};
      }
    }
};


const emailUsed =  async (email) => {
  const res = await db.Seller.findOne({where: {email: email}});
  return res !== null;

}

const phoneUsed = async (phone) => {
    const res = await db.Seller.findOne({where: {phone: phone}});
    console.log(res);
    return res !== null;
}