import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1726561325280 implements MigrationInterface {
    name = 'Migration1726561325280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sheduled_meets" ADD "creator_user_id" integer`);
        await queryRunner.query(`ALTER TABLE "sheduled_meets" ADD CONSTRAINT "FK_f72fae142ba0ba4f98251d03fd3" FOREIGN KEY ("creator_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sheduled_meets" DROP CONSTRAINT "FK_f72fae142ba0ba4f98251d03fd3"`);
        await queryRunner.query(`ALTER TABLE "sheduled_meets" DROP COLUMN "creator_user_id"`);
    }

}
