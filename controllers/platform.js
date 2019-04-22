import express from 'express'
import { render_view, auth } from '../utils'
import routes from '../routes.json'

let router = express.Router()

router.use(auth)

router.get('/', (_, res) => {
  render_view(res, 'platform/index', { errors: {} })
})

router.get('/logout', (req, res) => {
  res.redirect(routes["website_index"])
})

export default router
