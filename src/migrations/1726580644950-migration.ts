import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1726580644950 implements MigrationInterface {
    name = 'Migration1726580644950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_5a759e7ec89630b9fd2d5fe47f"`);
        await queryRunner.query(`ALTER TABLE "sheduled_meets" DROP CONSTRAINT "UQ_5a759e7ec89630b9fd2d5fe47f7"`);
        await queryRunner.query(`ALTER TABLE "sheduled_meets" DROP COLUMN "sheduled_date"`);
        await queryRunner.query(`ALTER TABLE "sheduled_meets" ADD "sheduled_date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sheduled_meets" ADD CONSTRAINT "UQ_5a759e7ec89630b9fd2d5fe47f7" UNIQUE ("sheduled_date")`);
        await queryRunner.query(`CREATE INDEX "IDX_5a759e7ec89630b9fd2d5fe47f" ON "sheduled_meets" ("sheduled_date") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_5a759e7ec89630b9fd2d5fe47f"`);
        await queryRunner.query(`ALTER TABLE "sheduled_meets" DROP CONSTRAINT "UQ_5a759e7ec89630b9fd2d5fe47f7"`);
        await queryRunner.query(`ALTER TABLE "sheduled_meets" DROP COLUMN "sheduled_date"`);
        await queryRunner.query(`ALTER TABLE "sheduled_meets" ADD "sheduled_date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sheduled_meets" ADD CONSTRAINT "UQ_5a759e7ec89630b9fd2d5fe47f7" UNIQUE ("sheduled_date")`);
        await queryRunner.query(`CREATE INDEX "IDX_5a759e7ec89630b9fd2d5fe47f" ON "sheduled_meets" ("sheduled_date") `);
    }

}
