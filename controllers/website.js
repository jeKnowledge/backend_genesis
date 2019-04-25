import express from 'express'
import { render_view } from '../utils'

let router = express.Router()

router.get('/', (_, res) => {
  render_view(res, 'website/index')
})

export default router