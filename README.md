# bankin-test

## Install & Exec
* login to Revolut for Business Demo using email & pwd below
  * email: `jrmc.dev@gmail.com`
  * pwd: `JRM_revolut95*`
* `npm install & node index.js`

## How it works ?
* Request an authorisation code
* Revolut redirect to `127.0.0.1:3000` with the `authCode`
* Sign my JSON Web Token using my `privatekey`
* Exchange the `authCode` for a reusable `access & refresh_token`
* Call Revolut API to get accounts data using the `access_token`

## Disclaimer
For the purpose of the test, some data in this repo has been made public.

**account informations, .env variables, publickey & privatekey should not be uploaded to github**
