import {MigrationInterface, QueryRunner} from "typeorm";

export class Users1682756253405 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            insert into users values
                ('b8ed84de-8a9e-4cfb-a21b-9dbdb06446b0', 'alex'),
                ('7f61b63b-cd7a-436a-bd9f-3519937823ba', 'ra-devs');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            delete from users where id in (
                'b8ed84de-8a9e-4cfb-a21b-9dbdb06446b0',
                '7f61b63b-cd7a-436a-bd9f-3519937823ba'
            );
        `);
    }

}
