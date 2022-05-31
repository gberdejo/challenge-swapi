'use strict'

const { response } = require('../../helpers/functions')
const { STATUS } = require('../../helpers/constans')
const PeopleService = require('../../services/people')

module.exports.get = async (event) => {
  try {
    const sku = event.pathParameters.sku

    const people = await PeopleService.findOnePeopleBySku(sku)
    return response(STATUS.OK, people)
  } catch (err) {
    return response(STATUS.INTERNAL_SERVER_ERROR, { message: err.message })
  }
}
