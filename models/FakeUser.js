import users from '../data/users.json'
import fs from 'fs'

class FakeUser {
  static add(new_user) {

    if (users.length === 0){
      new_user.id = 1
      users.push(new_user)
      fs.writeFileSync("data/users.json", JSON.stringify(users))
      return { ...new_user, errors: [] }
    }

    for (let user in users) {
      if (user.email == new_user.email || user.username == new_user.username)
        return { ...new_user, errors: [ "User already exists" ] }
    }

    new_user.id = users[users.length - 1].id + 1
    users.push(new_user)
    
    fs.writeFileSync("data/users.json", JSON.stringify(users))

    return { ...new_user, errors: [] }
  }

  static findName(username) {
    for (let i in users) {
      //console.log("inside find =>",users[i]);
      if (users[i].username === username)
        return users[i]
    }

    return null
  }

  static findId(id) {
    for (let i in users) {
      //console.log("inside find =>",users[i]);
      if (users[i].id === id)
        return users[i]
    }

    return null
  }

  static findEmail(email){
    for (let i in users) {
      //console.log("inside find =>",users[i]);
      if (users[i].email === email)
        return users[i]
    }
    return null
  }

  static delete(id){
    for (let i in users){
      if (users[i].id === id){
        users.splice(i,1)
        fs.writeFileSync("data/users.json", JSON.stringify(users))
        return true
      }
    }
    return false
  }
}

export default FakeUser