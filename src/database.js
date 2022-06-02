const AWS = require('aws-sdk')

const environment = process.env.NODE_ENV

const database =
  environment === 'dev'
    ? new AWS.DynamoDB({
        region: 'localhost',
        endpoint: 'http://localhost:8000',
      })
    : new AWS.DynamoDB.DocumentClient()

module.exports = { database }
