'use strict'

const { nanoid } = require('../../utils')
const { response } = require('../../helpers/functions')
const { STATUS } = require('../../helpers/constans')
const AWS = require('aws-sdk')
const PeopleProvider = require('../../providers')
const { People, PeopleEsToEn } = require('../../models/people')
const PeopleService = require('../../services/people')

module.exports.get = async (event) => {
  try {
    const id = event.pathParameters.id

    const peopleExists = await PeopleService.findOnePeopleById(id)

    if (peopleExists && peopleExists.id) {
      return response(STATUS.OK, peopleExists)
    } else {
      const peopleResponse = await PeopleProvider.findOnePeopleById(id)

      const people = new People({
        id,
        nombre: peopleResponse[PeopleEsToEn.get('nombre')],
        altura: peopleResponse[PeopleEsToEn.get('altura')],
        peso: peopleResponse[PeopleEsToEn.get('peso')],
        colorCabello: peopleResponse[PeopleEsToEn.get('colorCabello')],
        colorPiel: peopleResponse[PeopleEsToEn.get('colorPiel')],
        colorOjos: peopleResponse[PeopleEsToEn.get('colorOjos')],
        anioNacimiento: peopleResponse[PeopleEsToEn.get('anioNacimiento')],
        genero: peopleResponse[PeopleEsToEn.get('genero')],
        mundoNatal: peopleResponse[PeopleEsToEn.get('mundoNatal')],
        peliculas: peopleResponse[PeopleEsToEn.get('peliculas')],
        especies: peopleResponse[PeopleEsToEn.get('especies')],
        vehiculos: peopleResponse[PeopleEsToEn.get('vehiculos')],
        navesEstelares: peopleResponse[PeopleEsToEn.get('navesEstelares')],
        creacion: peopleResponse[PeopleEsToEn.get('creacion')],
        edicion: peopleResponse[PeopleEsToEn.get('edicion')],
        url: peopleResponse[PeopleEsToEn.get('url')],
      })

      people.generateSku()

      const peopleMarshall = AWS.DynamoDB.Converter.marshall(people)
      await PeopleService.createPeople(peopleMarshall)

      const $people = await PeopleService.findOnePeopleById(people.id)

      return response(STATUS.OK, $people)
    }
  } catch (err) {
    return response(STATUS.INTERNAL_SERVER_ERROR, { message: err.message })
  }
}
