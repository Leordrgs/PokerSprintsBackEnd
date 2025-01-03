import express from 'express'
import mongoose from 'mongoose'
import { configDotenv } from 'dotenv'
import { authRoutes } from './routes/auth-routes'
import cors from 'cors'
import http from 'http'
import { userRoutes } from './routes/user-routes'
import passport from './auth/passport-config'
import { MONGO_URL } from './constants/mongo-url'
import { sessionRoutes } from './routes/session-routes'
import { initSocket } from './config/socket'
import { storyRoutes } from './routes/story-routes'

configDotenv()
const app = express()
const server = http.createServer(app)

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
)
app.use(express.json())
app.use(passport.initialize())
initSocket(server)

app.get('/', (req, res) => {
  res.send('Testing server response!')
})
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/sessions', sessionRoutes)
app.use('/api/stories', storyRoutes)

mongoose.connect(MONGO_URL).then(() => {
  const PORT = Number(process.env.PORT) || 4000
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
  })

  console.log('Connected to MongoDB')
})