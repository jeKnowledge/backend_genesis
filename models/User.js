import { hash } from '../utils'
import fs from 'fs'

export default class User {
  static ADMIN = 1
  static REGULAR = 0

  id = null
  name = null
  username = null
  email = null
  password = null
  permissions = null
  errors = {}

  constructor(params) {
    this.name = params.name
    this.username = params.username
    this.email = params.email.toLowerCase()
    this.password = params.password
    this.permissions = params.permissions || User.REGULAR
  }

  validate() {
    let valid = true

    valid = this.unique(["email", "username"]) && valid
    valid = this.minLength(["password"], 8) && valid

    return valid
  }

  unique(props) {
    let users = User.all()

    return users.reduce((is_unique, user) => {
      if (user.id != this.id) {
        return is_unique && !props.reduce((matches, prop) => {
          let res = user[prop] == this[prop]

          if (user[prop] == this[prop]) this.errors[prop] = `${prop} has to be unique`

          return matches || res
        }, false)
      } else {
        return is_unique
      }
    }, true)
  }

  minLength(props, value) {
    return props.reduce((is_valid, prop) => {
      let res = this[prop].length >= value
      if (!res) this.errors[prop] = `${prop} has to be at least ${value} long`

      return is_valid && res
    }, true)
  }

  static all() {
    try {
      return JSON.parse(fs.readFileSync('data/users.json', 'utf-8'))
    } catch {
      return []
    }
  }

  static create(params) {
    let users = User.all()
    let user = new User(params)

    if (user.validate()) {
      user.password = hash(user.password)
      user.id = users.length ? users[users.length-1].id + 1 : 0
      User.bulk([ ...users, user ])
    }

    return user
  }

  static update(id, params) {
    delete params.id

    let _user = User.get(id)
    _user = Object.assign(_user, params)
    _user.email = _user.email.toLowerCase()

    if (_user.validate()) {
      _user.password = hash(_user.password)

      let updated_users = User.all().map(user => {
        return (user.id == id) ? _user : user
      })

      User.bulk(updated_users)
    }

    return _user
  }

  static get(id) {
    for (let user of User.all()) {
      if (user.id == id) {
        user = new User(user)
        user.id = id
        return user
      }
    }

    return null
  }

  static destroy(id) {
    let deleted_user = null

    let updated_users = User.all().filter(user => {
      let is_target = user.id == id
      if (is_target) deleted_user = user

      return !is_target
    })

    User.bulk(updated_users)

    return deleted_user
  }

  static bulk(updated_users) {
    fs.writeFileSync("data/users.json", JSON.stringify(updated_users))
  }
}