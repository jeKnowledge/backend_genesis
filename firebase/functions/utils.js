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

function send_failure(res) {
  res.status(400)
  res.send("Unhandled request")
}

function request_wrapper(request_handler) {
  return async (req, res) => {
    try {
      response_payload = await request_handler(req, res)
      if (response_payload == undefined) {
        send_failure(res)
      }
      else {
        res.status(200)
        res.send(response_payload)
      }
    } catch (e) {
      res.status(200)
      res.send(e.message)
    }
  }
}

exports.to_json = to_json
exports.print = print
exports.required_params = required_params
exports.request_wrapper = request_wrapper