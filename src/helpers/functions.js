const response = (status, data) => ({
  statusCode: status,
  body: JSON.stringify(data),
})
module.exports = { response }
