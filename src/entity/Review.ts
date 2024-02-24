import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Game } from "./Game";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  title: string;

  @Column()
  description: string;

  @Column()
  likes: number;

  @ManyToOne(() => Game, (game) => game.reviews)
  game: Game;
}
