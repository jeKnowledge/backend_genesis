import express from 'express'
import { render_view } from '../utils'

let router = express.Router()

router.get('/', async (_, res) => {
  let submissions = [
	  { name: 'Sub A' },
	  { name: 'Sub B' },
	  { name: 'Sub C' }
  ]
  render_view(res, 'website/index', { submissions })
})

export default router
