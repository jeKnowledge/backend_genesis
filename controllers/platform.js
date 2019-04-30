import express from 'express'
import { render_view } from '../utils'

let router = express.Router()

// TODO: Make auth middleware

router.get("/", (_ ,res) => {
  render_view(res, "platform/index")
})

export default router
