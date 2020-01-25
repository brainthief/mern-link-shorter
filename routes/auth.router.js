const { Router } = require('express')
const router = Router()

// /api/auth/register - /api/auth -> prefix iš app.js
router.post('/register', async (req, res) => {
 try {
  const { email, password } = req.body
 } catch (e) {
  //error 500
  res.status(500).json({ message: 'Something was wrong, try again' })
 }
})

// /api/auth/login
router.post('/login', async (req, res) => {

})

module.exports = router