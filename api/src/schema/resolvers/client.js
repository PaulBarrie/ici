const db = require('../../database/models/index')
const sha256 = require('crypto-js/sha256')
const Base64 = require('crypto-js/enc-base64')
const {errorName, errorMessage} = require('../../utils/constants')
const {createToken} = require('../../utils/auth')

module.exports = {
    Query: {
      async client(root, args, context){
        return await db.Client.findOne({where: args});
      }
    }, 
    Mutation: {
      loginClient: async (root, args, context) => {
        let {identifier, password, remember} = args;
        const hashPwd = Base64.stringify(sha256(password));
        remember = remember || false;
        try {
          if (identifier.includes("@")) {
            const client = await db.Client.findOne({where: {email: identifier}})
            if(client == null) {
              return new Error(errorName.INVALID_EMAIL)
            } else {
                if (hashPwd == client['dataValues']['password']) {
                  return createToken('CLIENT', client.id, remember);
                } else {
                  return new Error(errorName.INVALID_PASSWORD)
                }
            } 
          } else {
              const client = await db.Client.findOne({where: {phone: identifier}})
              if(client == null) {
                return new Error(errorName.INVALID_PHONE)
              } else {
                if (hashPwd == client['dataValues']['password']) {
                  return createToken('CLIENT', client.id, remember);
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
      createClient: async (root, args, context) => {
        const {first_name, last_name, email, phone, password} = args.client;
        const email_used = await emailUsed(email);
        const phone_used = await phoneUsed(phone);
        if (email_used) {
          return new Error(errorName.EMAIL_ALREADY_USED);
        } else if (phone_used) {
          return new Error(errorName.PHONE_ALREADY_USED);
        } else {
          try {
            const hashPwd = sha256(password)
            const client = await db.Client.create({
              first_name: first_name, last_name: last_name, email: email, phone: phone, password: Base64.stringify(hashPwd), createdAt: Date.now(), updatedAt: Date.now()
            });
            console.log(client)
            return client;
          } catch (err) {
            return new Error(errorName.INTERNAL_ERROR);
          }
        }
      },
      updateClient: async (root, args, context) => {
        const {where, update} = args;
        const client = await db.Client.update(update, {where: where});
        return client;
      },
      deleteClient: async (root, args, context) => {
        const {id} = args;
        await db.Client.destroy({where: {id: id}});
        return {code: 200, msg: "Client deleted"};
      }
    }
};


const emailUsed = async (email) => {
  const res = await db.Client.findOne({where: {email: email}});
  return res !== null;
}

const phoneUsed = async (phone) => {
  const res = await db.Client.findOne({where: {phone: phone}});
  return res !== null;
}