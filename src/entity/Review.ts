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

  @Column()
  name: string;

  @Column()
  upVotes: number;

  @Column()
  downVotes: number;

  @ManyToOne(() => Game, (game) => game.reviews)
  game: Game;
}
