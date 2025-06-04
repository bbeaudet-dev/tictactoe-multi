import express from 'express'
import ViteExpress from "vite-express"
import { v4 as uuidv4 } from 'uuid'
import { createGame, move } from './src/game.ts'

const app = express()
app.use(express.json())
const port = 3000

const games = {}

// just for practice
app.get('/api/test', (request, response) => {
    response.json({ message: 'hello from server' })
})

// just for practice
app.post('/api/echo', (request, response) => {
    response.json(request.body)
})

// POST to create a new game
app.post('/api/games', (request, response) => {
    // generate UUID (move to game?)
    const newId = uuidv4()
    // create new game with initialGameState
    const newGame = { ...createGame(), id: newId }
    // add new game to games object
    games[newId] = newGame
    // send game back to client
    response.json(newGame)
})

// GET to retrive a game by ID
app.get('/api/games/:id', (request, response) => {
    // const id = request.params.id
    // games.find(id => games.id === id)
})

// POST to make a move in a game
app.post('/api/games/:id/moves', (request, response) => {

})

ViteExpress.listen(app, port, () => console.log(`Server is listening on port ${port}`))