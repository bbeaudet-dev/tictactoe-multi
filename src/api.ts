import { type GameState, createGame as CreateGameState, makeMove as makeGameMove } from './game.ts'

export interface TicTacToeApi {
    createGame(): Promise<GameState>
    getGame(gameId: string): Promise<GameState>
    makeMove(gameId: string, row: number, col: number): Promise<GameState>
}

export class InMemoryTicTacToeApi implements TicTacToeApi {
    private games: Map<string, GameState>

    async createGame(): Promise<GameState> {
        const game = CreateGameState()
        this.games.set(game.id, game)
        return game
    }
    
    async getGame(gameId: string): Promise<GameState> {
        const game = this.games.get(gameId)
        if (!game) {
            throw new Error("Game not found")
        }
        return game
    }

    async makeMove(gameId: string, row: number, col: number): Promise<GameState> {
        // same start as getGame, find it by id
        const game = await this.getGame(gameId)
        // then, how do we make a move on said game?
        // logic lives within game.ts, we have the function makeGameMove()
        // take the row and column we were given and pass into function along with gameid
        // first, make a copy for immutability
        const newGame = makeGameMove(game, row, col)
        // the new game with new move made, we need to save to the matching gameId
        this.games.set(gameId, newGame)
        // finally, return the newGame
        return newGame
    }
}

export class ClientTicTacToeApi implements TicTacToeApi {
    async createGame(): Promise<GameState> {
        const response = await fetch("/api/games", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const game = await response.json()
        return game
    }
    
    async getGame(gameId: string): Promise<GameState> {
        const response = await fetch(`/api/games/${gameId}`)
        const game = await response.json()
        return game
    }

    async makeMove(gameId: string, row: number, col: number): Promise<GameState> {
        const response = await fetch(`/api/games/${gameId}/move`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ row, col })
        })
        const game = await response.json()
        return game
    }
}