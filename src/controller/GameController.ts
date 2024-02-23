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

    const game = this.gameRepository.findOne({
      where: name,
    });

    if (game) {
      return "game already exists";
    }

    const createGame = Object.assign(new Game(), { name });

    return this.gameRepository.save(createGame);
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
}
