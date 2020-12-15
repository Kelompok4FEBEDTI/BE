const jwt = require('jsonwebtoken')

function signToken(payload){
    const token = jwt.sign(payload, 'jwt-secret')
    return token
}

function verifyToken(token){
    const payload = jwt.verify(token, 'jwt-secret') 
    return payload
}

module.exports = { 
    signToken,
    verifyToken
}