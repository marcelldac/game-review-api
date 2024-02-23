import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateGameTable1708730142780 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "games",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "upvotes",
            type: "integer",
            default: 0,
          },
          {
            name: "downvotes",
            type: "integer",
            default: 0,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("games");
  }
}
