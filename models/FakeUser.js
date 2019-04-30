import users from '../data/users.json'
import fs from 'fs'

class FakeUser {
  static add(new_user) {
    for (let user of users) {
      if (user.email == new_user.email || user.username == new_user.username)
        return { ...new_user, errors: [ "User already exists" ] }
    }

    new_user.id = users[users.length - 1].id + 1
    users.push(new_user)

    fs.writeFileSync("data/users.json", JSON.stringify(users))

    return { ...new_user, errors: [] }
  }

  static find(username) {
    for (let user of users) {
      if (user.email == username || user.username == username)
        return user
    }

    return null
  }
}

export default FakeUser