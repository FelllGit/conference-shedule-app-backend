import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1726558211920 implements MigrationInterface {
    name = 'Migration1726558211920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_in_meets" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "users_in_meets" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_in_meets" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users_in_meets" DROP COLUMN "created_at"`);
    }

}
