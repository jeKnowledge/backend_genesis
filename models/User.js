import { hash } from '../utils'
import fs from 'fs'

export default class User {
  static ADMIN = 1
  static REGULAR = 0

  static all() {
    try {
      return JSON.parse(fs.readFileSync('data/users.json', 'utf-8'))
    } catch {
      return []
    }
  }

  static create(params) {
    let users = User.all()

    let id = users.length ? users[users.length-1].id + 1 : 0

    let new_user = {
      ...params,
      id,
      password: hash(params.password),
      permissions: params.permissions || User.REGULAR
    }

    User.bulk([ ...users, new_user ])

    return new_user
  }

  static update(id, params) {
    let updated_user = null
    if (params.password) params.password = hash(params.password)

    let updated_users = User.all().map(user => {
      if (user.id == id) {
        updated_user = { ...user, ...params }
        user = updated_user
      }

      return user
    })

    User.bulk(updated_users)

    return updated_user
  }

  static get(id) {
    for (let user of User.all()) {
      if (user.id == id) return user
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