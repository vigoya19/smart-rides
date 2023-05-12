import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAllTables1634231796594 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "driver" (
        "id" SERIAL PRIMARY KEY,
        "first_name" VARCHAR NOT NULL,
        "last_name" VARCHAR NOT NULL,
        "position_latitude" NUMERIC(10, 4) NULL,
        "position_longitude" NUMERIC(10, 4) NULL
      );

      CREATE TABLE "payment_source" (
        "id" SERIAL PRIMARY KEY,
        "reference" VARCHAR NOT NULL,
        "payment_id" VARCHAR NOT NULL,
        "status" VARCHAR NOT NULL
      );

      CREATE TABLE "rider" (
        "id" SERIAL PRIMARY KEY,
        "email" VARCHAR NOT NULL,
        "payment_source_id" INTEGER NULL
      );

      CREATE TABLE "ride" (
        "id" SERIAL PRIMARY KEY,
        "driver_id" INTEGER NOT NULL,
        "rider_id" INTEGER NOT NULL,
        "payment_source_id" INTEGER NOT NULL,
        "start_date" TIMESTAMP NOT NULL,
        "end_date" TIMESTAMP NULL,
        "start_position_latitude" NUMERIC(10, 4) NULL,
        "start_position_longitude" NUMERIC(10, 4) NULL,
        "end_position_latitude" NUMERIC(10, 4) NULL,
        "end_position_longitude" NUMERIC(10, 4) NULL,
        "value" NUMERIC(10, 2) NULL,
        FOREIGN KEY ("driver_id") REFERENCES "driver" ("id"),
        FOREIGN KEY ("rider_id") REFERENCES "rider" ("id"),
        FOREIGN KEY ("payment_source_id") REFERENCES "payment_source" ("id")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "ride";');
    await queryRunner.query('DROP TABLE "rider";');
    await queryRunner.query('DROP TABLE "payment_source";');
    await queryRunner.query('DROP TABLE "driver";');
  }
}
