const AWS = require('aws-sdk')
const { database } = require('../database')

const findOnePeopleById = async (id) => {
  try {
    const people = await database
      .scan({
        TableName: 'StarWars',
        FilterExpression: 'id = :id',
        ExpressionAttributeValues: {
          ':id': { S: id },
        },
      })
      .promise()
    return AWS.DynamoDB.Converter.unmarshall(people['Items'][0])
  } catch (error) {
    throw new Error('Error inesperado con la base de datos - findOnePeopleById')
  }
}

const findOnePeopleBySku = async (sku) => {
  try {
    const people = await database
      .scan({
        TableName: 'StarWars',
        FilterExpression: 'sku = :sku',
        ExpressionAttributeValues: {
          ':sku': { S: sku },
        },
      })
      .promise()
    return AWS.DynamoDB.Converter.unmarshall(people['Items'][0])
  } catch (err) {
    throw new Error(
      'Error inesperado con la base de datos - findOnePeopleBySku'
    )
  }
}

const createPeople = async (Item) => {
  try {
    return await database
      .putItem({
        TableName: 'StarWars',
        Item,
      })
      .promise()
  } catch (err) {
    console.log('Error inesperado con la base de datos - createPeople', err)
    throw new Error('Error inesperado con la base de datos - createPeople')
  }
}

const findAllPeople = async () => {
  try {
    const people = await database
      .scan({
        TableName: 'StarWars',
      })
      .promise()
    return people.Items.map((people) =>
      AWS.DynamoDB.Converter.unmarshall(people)
    )
  } catch (err) {
    throw new Error('Error inesperado con la base de datos - findAllPeople')
  }
}

module.exports = {
  createPeople,
  findOnePeopleById,
  findOnePeopleBySku,
  findAllPeople,
}
