import express from 'express'
import { render_view } from '../utils'
import routes from '../routes.json'

let router = express.Router()

router.get('/', (_, res) => {
  render_view(res, 'website/logout')
})

export default router
