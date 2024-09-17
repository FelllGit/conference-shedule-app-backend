import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1726559559447 implements MigrationInterface {
    name = 'Migration1726559559447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_in_meets" DROP CONSTRAINT "FK_e97a2ae77a36be04bdb3ac22eff"`);
        await queryRunner.query(`ALTER TABLE "users_in_meets" ADD CONSTRAINT "FK_e97a2ae77a36be04bdb3ac22eff" FOREIGN KEY ("meet_id") REFERENCES "sheduled_meets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_in_meets" DROP CONSTRAINT "FK_e97a2ae77a36be04bdb3ac22eff"`);
        await queryRunner.query(`ALTER TABLE "users_in_meets" ADD CONSTRAINT "FK_e97a2ae77a36be04bdb3ac22eff" FOREIGN KEY ("meet_id") REFERENCES "sheduled_meets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
