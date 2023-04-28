import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserTagsTable1682692874980 implements MigrationInterface {
    name = 'CreateUserTagsTable1682692874980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "name" character varying NOT NULL, "color" character varying NOT NULL, CONSTRAINT "UQ_5d76bfedab279c7b61f0cd7c6f5" UNIQUE ("user_id", "name"), CONSTRAINT "PK_deef7519b4b9995a9ecc3f7e611" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_tags" ADD CONSTRAINT "FK_1876d8f8eff4211b216364381ec" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tags" DROP CONSTRAINT "FK_1876d8f8eff4211b216364381ec"`);
        await queryRunner.query(`DROP TABLE "user_tags"`);
    }

}
