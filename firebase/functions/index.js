const glob = require('glob')
const camelcase = require('camelcase')
const firebase = require("firebase/app")
const firebase_config = require("./config.json")

firebase.initializeApp(firebase_config)

glob.sync('./**/package.js', { cwd: __dirname, ignore: './node_modules/**' }).forEach(file => {
  const package_namespaces = file.split("/").slice(1, -1)
  const function_package = require(file)

  Object.keys(function_package).forEach(function_name => {
    const new_package_namespaces = package_namespaces.slice(0)
    if (function_name != 'app') new_package_namespaces.push(function_name)
    const export_name = camelcase(new_package_namespaces.join("_"))
    if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === export_name)
      exports[export_name] = function_package[function_name]
  })    
})