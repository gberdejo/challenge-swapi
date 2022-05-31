const { nanoid } = require('../utils')
const Joi = require('joi')

const schema = Joi.object().keys({
  nombre: Joi.string().required(),
  altura: Joi.number().required(),
  peso: Joi.number().required(),
  colorCabello: Joi.string().required(),
  colorPiel: Joi.string().required(),
  colorOjos: Joi.string().required(),
  anioNacimiento: Joi.number().required(),
  genero: Joi.string().required(),
  mundoNatal: Joi.string().required(),
  peliculas: Joi.array().required(),
  especies: Joi.array().required(),
  vehiculos: Joi.array().required(),
  navesEstelares: Joi.array().required(),
  creacion: Joi.string().required(),
  edicion: Joi.string().required(),
  url: Joi.string().required(),
})

const PeopleMap = [
  ['name', 'nombre'],
  ['height', 'altura'],
  ['mass', 'peso'],
  ['hair_color', 'colorCabello'],
  ['skin_color', 'colorPiel'],
  ['eye_color', 'colorOjos'],
  ['birth_year', 'anioNacimiento'],
  ['gender', 'genero'],
  ['homeworld', 'mundoNatal'],
  ['films', 'peliculas'],
  ['species', 'especies'],
  ['vehicles', 'vehiculos'],
  ['starships', 'navesEstelares'],
  ['created', 'creacion'],
  ['edited', 'edicion'],
  ['url', 'url'],
]
class People {
  sku
  constructor(people) {
    this.id = people.id || ''
    this.nombre = people.nombre
    this.altura = people.altura
    this.peso = people.peso
    this.colorCabello = people.colorCabello
    this.colorPiel = people.colorPiel
    this.colorOjos = people.colorOjos
    this.anioNacimiento = people.anioNacimiento
    this.genero = people.genero
    this.mundoNatal = people.mundoNatal
    this.peliculas = people.peliculas
    this.especies = people.especies
    this.vehiculos = people.vehiculos
    this.navesEstelares = people.navesEstelares
    this.creacion = people.creacion
    this.edicion = people.edicion
    this.url = people.url
  }
  generateSku() {
    this.sku = nanoid()
  }
}
const PeopleEnToEs = new Map(PeopleMap)
const PeopleEsToEn = new Map(PeopleMap.map(([key, value]) => [value, key]))

module.exports = {
  People,
  PeopleEnToEs,
  PeopleEsToEn,
  schema,
}
