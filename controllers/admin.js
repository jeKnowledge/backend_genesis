import express from 'express'
import { auth, admin_auth } from '../utils'

let router = express.Router()

router.use(auth)
router.use(admin_auth)

export default router