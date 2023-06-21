const jwt = require('jsonwebtoken')

const createLoginToken = (id) => {
    return jwt.sign(id, process.env.SECRET_TOKEN, {expiresIn : '1d'})
}
module.exports = {createLoginToken} //typed or const or named exports
//expressed in seconds or a string describing a time span zeit/ms, Eg: 60,"2 days","10h","7d"