import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from "typeorm";
import { Review } from "./Review";

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 30,
  })
  @Index({ unique: true })
  name: string;

  @Column({
    default: 0,
  })
  upVotes: number;

  @Column({
    default: 0,
  })
  downVotes: number;
  1;
  @OneToMany(() => Review, (review) => review.game)
  reviews: Review[];
}
