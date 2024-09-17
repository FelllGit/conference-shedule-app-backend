import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1726562452550 implements MigrationInterface {
    name = 'Migration1726562452550'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sheduled_meets" ADD CONSTRAINT "UQ_5a759e7ec89630b9fd2d5fe47f7" UNIQUE ("sheduled_date")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sheduled_meets" DROP CONSTRAINT "UQ_5a759e7ec89630b9fd2d5fe47f7"`);
    }

}
