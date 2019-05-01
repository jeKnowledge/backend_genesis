import { User } from '../models'
import faker from 'faker'

const N_ADMINS = 1
const N_REGULAR = 2

for (let i = 0; i < N_ADMINS; ++i) {
  User.create({
    name: faker.name.findName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: "secret_admin",
    permissions: User.ADMIN
  })
}

for (let i = 0; i < N_REGULAR; ++i) {
  User.create({
    name: faker.name.findName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: "secret_regular"
  })
}