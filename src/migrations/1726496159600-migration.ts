import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1726496159600 implements MigrationInterface {
    name = 'Migration1726496159600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sheduled_meets" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "sheduled_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_4c5c8e84677079657168b9ae8e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_in_meets" ("id" SERIAL NOT NULL, "user_id" integer, "meet_id" integer, CONSTRAINT "PK_d8d3dd25479ee5e7d1530d0d945" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users_in_meets" ADD CONSTRAINT "FK_4b36a534daefadea802ddf689b2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_in_meets" ADD CONSTRAINT "FK_e97a2ae77a36be04bdb3ac22eff" FOREIGN KEY ("meet_id") REFERENCES "sheduled_meets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_in_meets" DROP CONSTRAINT "FK_e97a2ae77a36be04bdb3ac22eff"`);
        await queryRunner.query(`ALTER TABLE "users_in_meets" DROP CONSTRAINT "FK_4b36a534daefadea802ddf689b2"`);
        await queryRunner.query(`DROP TABLE "users_in_meets"`);
        await queryRunner.query(`DROP TABLE "sheduled_meets"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
