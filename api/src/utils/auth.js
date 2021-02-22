const db = require('../database/models/index')
const sha256 = require('crypto-js/sha256')
const Base64 = require('crypto-js/enc-base64')


const createToken = async (role, uid, remember) => {
    await db.Session.destroy({where: {role: role, uid: uid}});;
    const token = genToken();
    await db.Session.create({
        role: role, uid: uid, token: Base64.stringify(sha256(token)),  remember: remember, 
        createdAt: Date.now(), updatedAt: Date.now()
    }); 
    return {
        uid: uid, role: role, token: token, remember: remember
    }
}

const genToken = () => {
    return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
}


const isAuth = async (user) => {
    const count = await db.Session.findOne({where: {uid: user.uid, role: user.role, token: user.token}});
    if (count != 1) {
        return false;
    } else {
        return true;
    }
}
module.exports = {createToken, isAuth}