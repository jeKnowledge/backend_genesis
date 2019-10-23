const prettyjson = require('prettyjson')

function to_json(object) {
  try {
    return  prettyjson.render(object)
  } catch {
    return JSON.stringify(object)
  }
}

function print(object) {
  console.log('\n' + to_json(object))
}

function required_params(params, required_keys) {
  return required_keys.reduce((acc, key) => {
    return acc && params[key] != null && params[key] != undefined
  }, true)
}

exports.to_json = to_json
exports.print = print
exports.required_params = required_params