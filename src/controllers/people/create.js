const { STATUS } = require('../../helpers/constans')
const { People, schema } = require('../../models/people')
const PeopleService = require('../../services/people')
const { response } = require('../../helpers/functions')
const AWS = require('aws-sdk')

const createPeople = async (data) => {
  const people = new People(data)
  people.generateSku()

  await PeopleService.createPeople(AWS.DynamoDB.Converter.marshall(people))

  return await PeopleService.findOnePeopleBySku(people.sku)
}
module.exports.post = async (event) => {
  try {
    const data = JSON.parse(event.body)
    const value = await schema.validateAsync(data)
    const $people = await createPeople(value)
    return response(STATUS.OK, $people)
  } catch (err) {
    if (err.details) {
      return response(STATUS.BAD_REQUEST, err.details)
    }
    return response(STATUS.INTERNAL_SERVER_ERROR, err.details)
  }
}
