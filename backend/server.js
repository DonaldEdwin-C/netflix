require('dotenv').config()
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const db = require('./db')

const tmdbRoutes = require('./routes/tmdb');

app.use(cors({ origin: "http://localhost:5173"}))
app.use('/api/tmdb', tmdbRoutes);

app.use(express.json())


const users = []

const movies = [
  {
    name: 'Spiderman',
  },
]



app.get('/users', (req, res) => {
  res.json(users)
})

app.get('/movies', authenticateToken, (req, res) => {
  res.json(movies)
})

app.post('/users', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const [result] = await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [
      req.body.email,
      hashedPassword,
    ])
    res.status(201).json({ message: 'User registered', userId: result.insertId })
  } catch {
    res.status(500).send({ error: 'Error registering User' })
  }
})

app.post('/users/login', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [req.body.email])
    if (rows.length === 0) {
      return res.status(400).send('No user with this email')
    }

    const user = rows[0]

    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' },
      )
      res.json({ accessToken })
    } else {
      res.status(403).send('Wrong password')
    }
  } catch (err) {
    console.error(err)
    res.status(500).send('Login error')
  }
})

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

app.listen(3000)
