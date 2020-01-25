const { Router } = require('express')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const User = require('../modules/User')
const router = Router()

// /api/auth/register - /api/auth -> prefix iš app.js
router.post(
 '/register',
 [
  check('email', 'Wrong password').isEmail(),
  check('password', 'Min length 6').isLength({ min: 6 })
 ],
 async (req, res) => {
  try {
   const errors = validationResult(req)

   if (!errors.isEmpty()) {
    return res.status(400).json({
     errors: errors.array(),
     message: 'Registration data if wrong'
    })
   }

   const { email, password } = req.body

   const candidate = await User.findOne({ email })

   if (candidate) {
    return res.status(400).json({ message: 'Email is already used' })
   }

   const hashedPassword = await bcrypt.hash(password, 1)
   const user = User({ email, password: hashedPassword })

   await user.save()

   res.status(201).json({ message: 'User created successfully' })

  } catch (e) {
   //error 500
   res.status(500).json({ message: 'Something was wrong, try again' })
  }
 })

// /api/auth/login
router.post(
 '/login',
 [
  check('email', 'Please insert valid email address').normalizeEmail().isEmail(),
  check('password', 'Please insert password').exists()
 ],
 async (req, res) => {
  try {
   const errors = validationResult(req)

   if (!errors.isEmpty()) {
    return res.status(400).json({
     errors: errors.array(),
     message: 'Registration data if wrong'
    })
   }

   const { email, password } = req.body

   const user = await User.findOne({ email })

   if (!user) {
    return res.status(400).json({ message: 'Wrong email or password' })
   }

   const isMatch = await bcrypt.compare(password, user.password)

   if (!isMatch) {
    return res.status(400).json({ message: 'Wrong password' })
   }

  } catch (e) {
   res.status(500).json({ message: 'Something was wrong, try again' })
  }
 })

module.exports = router