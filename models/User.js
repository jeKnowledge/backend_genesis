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
  valid = true

  constructor(params) {
    this.name = params.name
    this.username = params.username
    if (params.email) this.email = params.email.toLowerCase()
    this.password = params.password
    this.permissions = params.permissions || User.REGULAR
  }

  validate() {
    let valid = true

    valid = this.present(["name", "username", "email", "password", "permissions"])
    valid = this.unique(["email", "username"]) && valid
    valid = this.minLength(["password"], 8) && valid // 8 characters password

    this.valid = valid

    return valid
  }

  present(props) {
    return props.reduce((is_present, prop) =>{
      if (this[prop] == undefined) this.add_error(prop, "must be present")
      return is_present && this[prop] != undefined
    }, true)
  }

  unique(props) {
    let users = User.all()

    return users.reduce((is_unique, user) => {
      if (user.id != this.id) {
        return is_unique && !props.reduce((matches, prop) => {
          let res = user[prop] == this[prop]

          if (user[prop] == this[prop]) this.add_error(prop, "already exists")

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
      if (!res) this.add_error(prop, `has to be at least ${value} characters long`)

      return is_valid && res
    }, true)
  }

  add_error(prop, msg) {
    this.valid = false
    if (!this.errors[prop]) {
      this.errors[prop] = [msg]
    } else {
      this.errors[prop].push(msg)
    }
  }

  static all() {
    try {
      return JSON.parse(fs.readFileSync('data/users.json', 'utf-8'))
    } catch {
      return []
    }
  }

  static where(params) {
    let users = User.all()

    return users.filter(user => {
      for (let k of Object.keys(params)) {
        let v = params[k]
        if (user[k] != v) return false
      }
      return true
    })
  }

  static create(params) {
    let users = User.all()
    let user = new User(params)
    if (user.validate()) {
      user.password = hash(user.password)
      user.id = users.length ? users[users.length-1].id + 1 : 0
      let to_save = { ...user }
      delete to_save.valid
      User.bulk([ ...users, to_save ])
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
      let to_save = { ..._user }
      delete to_save.valid
            
      let updated_users = User.all().map(user => {
        return (user.id == id) ? to_save : user
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