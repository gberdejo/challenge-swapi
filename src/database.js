const AWS = require('aws-sdk')
const database =
  process.env.NODE_ENV === 'dev'
    ? new AWS.DynamoDB({
        region: 'localhost',
        endpoint: 'http://localhost:8000',
      })
    : new AWS.DynamoDB.DocumentClient()
module.exports = { database }
