const fs = require('fs')
const jwt = require('jsonwebtoken')
const path = require('path')
const axios = require('axios')
const qs = require('qs')

const revolutUrl = process.env.REVOLUT_URL

function getJwtToken(clientId){
    const privateKeyName = path.join(__dirname, '../../privatekey.pem')
    const issuer = '127.0.0.1'
    const client_id = clientId
    const aud = 'https://revolut.com'
    const payload = {
        "iss": issuer,
        "sub": client_id,
        "aud": aud
    }
    const privateKey = fs.readFileSync(privateKeyName);
    const jwtToken = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: 60 * 60});

    return jwtToken
}

function getTokens(clientId, authCode, jwtToken){

    return axios({
        method: "post",
        url: `${revolutUrl}/auth/token`,
        data: qs.stringify({
          grant_type: "authorization_code",
          code: authCode,
          client_id: clientId,
          client_assertion_type:
            "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
          client_assertion: jwtToken,
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
    })
}

function getAccounts(accesToken){

    return axios({
        url: `${revolutUrl}/accounts`,
        headers: {
            Authorization: `Bearer ${accesToken}`,
        },
    })
}

module.exports = {
    getJwtToken,
    getTokens,
    getAccounts
}