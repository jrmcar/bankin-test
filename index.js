require('dotenv').config({ path: './config/.env' })

const express = require('express')
const open = require('open');
const revolut = require("./src/utils/revolut")

const clientId = process.env.CLIENT_ID
const port = process.env.PORT
const app = express()

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

open(`https://sandbox-business.revolut.com/app-confirm?client_id=${clientId}&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000&response_type=code#authorise`)

app.get('', async (req, res) => {
    const authCode = req.query.code

    if(authCode){
        const jwtToken = revolut.getJwtToken(clientId)

        try{

            const tokensData = await revolut.getTokens(clientId, authCode, jwtToken)
            const accountsData = await revolut.getAccounts(tokensData.data.access_token)

            res.send(accountsData.data)
        }catch(e){
            console.error(e)
        }
    }
})

