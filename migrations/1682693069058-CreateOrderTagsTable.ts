import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateOrderTagsTable1682693069058 implements MigrationInterface {
    name = 'CreateOrderTagsTable1682693069058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order_tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "order_id" uuid NOT NULL, "name" character varying NOT NULL, "color" character varying NOT NULL, CONSTRAINT "UQ_b4ca2a80577288c8056d1ceafeb" UNIQUE ("order_id", "name"), CONSTRAINT "PK_abd565c47f98dac9c2dc9d846e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order_tags" ADD CONSTRAINT "FK_787ebb4ed542caa09e0f658925c" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_tags" DROP CONSTRAINT "FK_787ebb4ed542caa09e0f658925c"`);
        await queryRunner.query(`DROP TABLE "order_tags"`);
    }

}
