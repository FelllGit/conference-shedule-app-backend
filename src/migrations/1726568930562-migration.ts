import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1726568930562 implements MigrationInterface {
    name = 'Migration1726568930562'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_5a759e7ec89630b9fd2d5fe47f" ON "sheduled_meets" ("sheduled_date") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_5a759e7ec89630b9fd2d5fe47f"`);
    }

}
