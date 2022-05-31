const { STATUS } = require('../../helpers/constans')
const { response } = require('../../helpers/functions')
const PeopleService = require('../../services/people')

module.exports.get = async (event) => {
  try {
    const listPeople = await PeopleService.findAllPeople()
    return response(STATUS.OK, listPeople)
  } catch (err) {
    console.log(err)
    return response(STATUS.INTERNAL_SERVER_ERROR, { message: err.message })
  }
}
