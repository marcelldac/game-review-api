import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Game } from "../entity/Game";

export class GameController {
  private gameRepository = AppDataSource.getRepository(Game);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.gameRepository.find({
      relations: {
        reviews: true,
      },
    });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const game = await this.gameRepository.findOne({
      where: { id },
      relations: {
        reviews: true,
      },
    });

    if (!game) {
      return "unregistered game";
    }

    return game;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { name } = request.body;

    const game = await this.gameRepository.findOneBy({ name });

    if (game) {
      return "game already exists";
    }

    const newGame = Object.assign(new Game(), {
      name,
      likes: 0,
    });

    const createGame = await this.gameRepository.save(newGame);

    return createGame;
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let gameToRemove = await this.gameRepository.findOneBy({ id });

    if (!gameToRemove) {
      return "this game not exist";
    }

    await this.gameRepository.remove(gameToRemove);

    return "game has been removed";
  }

  async like(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let game = await this.gameRepository.findOneBy({ id });

    if (!game) return "game not found";

    game.likes++;

    await this.gameRepository.save(game);

    return `${game.name} liked. total likes: ${game.likes}`;
  }
}
