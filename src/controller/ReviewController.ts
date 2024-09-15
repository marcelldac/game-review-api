import { AppDataSource } from '../data-source';
import { Request } from 'express';
import { Review } from '../entity/Review';
import { Game } from '../entity/Game';

export class ReviewController {
  private reviewRepository = AppDataSource.getRepository(Review);
  private gameRepository = AppDataSource.getRepository(Game);

  async all() {
    return this.reviewRepository.find();
  }

  async one(request: Request) {
    const id = parseInt(request.params.id);
    const review = await this.reviewRepository.findOneBy({ id });
    if (!review) return 'unregistered review';
    return review;
  }

  async save(request: Request) {
    const { title, description, gameName } = request.body;
    const game = await this.gameRepository.findOneBy({ name: gameName });
    if (!game) return 'game not found';
    const newReview = Object.assign(new Review(), {
      title,
      description,
      likes: 0,
      game: game.id
    });
    const createReview = await this.reviewRepository.save(newReview);
    return createReview;
  }

  async update(request: Request) {
    const id = parseInt(request.params.id);
    const { title, description, gameName } = request.body;
    const review = await this.reviewRepository.findOneBy({ id });
    if (!review) return 'review not found';
    const game = await this.gameRepository.findOneBy({ name: gameName });
    if (!game) return 'game not found';
    review.title = title || review.title;
    review.description = description || review.description;
    review.game = game.id || review.game;
    const updateReview = await this.reviewRepository.save(review);
    return updateReview;
  }

  async remove(request: Request) {
    const id = parseInt(request.params.id);
    let reviewToRemove = await this.reviewRepository.findOneBy({ id });
    if (!reviewToRemove) return 'this review not exist';
    await this.reviewRepository.remove(reviewToRemove);
    return 'review has been removed';
  }

  async likeReview(request: Request) {
    const id = parseInt(request.params.id);
    let review = await this.reviewRepository.findOneBy({ id });
    if (!review) return 'review not found';
    review.likes++;
    await this.reviewRepository.save(review);
    return {
      title: review.title,
      total_likes: review.likes,
      message: `${review.title} liked.`
    };
  }

  async dislikeReview(request: Request) {
    const id = parseInt(request.params.id);
    let review = await this.reviewRepository.findOneBy({ id });
    if (!review) return 'review not found';
    review.likes--;
    await this.reviewRepository.save(review);
    return {
      title: review.title,
      total_likes: review.likes,
      message: `${review.title} liked.`
    };
  }
}
