import { type GameState, createGame as CreateGameState, makeMove as makeGameMove } from './game.ts'

export interface TicTacToeApi {
    createGame(): Promise<GameState>
    getGame(gameId: string): Promise<GameState>
    makeMove(gameId: string, row: number, col: number): Promise<GameState>
}

export class InMemoryTicTacToeApi implements TicTacToeApi {
    private games: Map<string, GameState> = new Map()

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
        const game = this.games.get(gameId)
        if (!game) {
            throw new Error("Game not found")
        }
        const updatedGame = makeGameMove(game, row, col)
        this.games.set(gameId, updatedGame)
        return updatedGame
    }
}

export class ClientTicTacToeApi implements TicTacToeApi {
    async createGame(): Promise<GameState> {
        const response = await fetch("/api/game", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const game = await response.json()
        return game
    }

    async getGame(gameId: string): Promise<GameState> {
        const response = await fetch(`/api/game/${gameId}`)
        const game = await response.json()
        return game
    }

    async makeMove(gameId: string, row: number, col: number): Promise<GameState> {
        const response = await fetch(`/api/game/${gameId}/move`, {
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