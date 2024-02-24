import { GameController } from "./controller/GameController";

export const Routes = [
  //Games
  {
    method: "get",
    route: "/games",
    controller: GameController,
    action: "all",
  },
  {
    method: "get",
    route: "/games/:id",
    controller: GameController,
    action: "one",
  },
  {
    method: "post",
    route: "/games",
    controller: GameController,
    action: "save",
  },
  {
    method: "delete",
    route: "/games/:id",
    controller: GameController,
    action: "remove",
  },
  // Upvotes and Downvotes
  {
    method: "post",
    route: "/like/:id",
    controller: GameController,
    action: "like",
  },
  {
    method: "post",
    route: "/dislike/:id",
    controller: GameController,
    action: "dislike",
  },
];
