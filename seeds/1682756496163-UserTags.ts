import {MigrationInterface, QueryRunner} from "typeorm";

export class UserTags1682756496163 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            insert into user_tags values 
                ('cd0ee62c-3e80-4ea5-9d1b-65a40eb9adb7', 'b8ed84de-8a9e-4cfb-a21b-9dbdb06446b0', 'it', '000000'),
                ('655ba306-0c3d-416b-aef2-d4ef658b9104', 'b8ed84de-8a9e-4cfb-a21b-9dbdb06446b0', 'developer', 'ff0000'),
                ('5574821d-693a-46fc-95d6-38e607212e2f', '7f61b63b-cd7a-436a-bd9f-3519937823ba', 'it', 'ffffff'),
                ('3cc39317-666e-438f-a165-eab289ab92f6', '7f61b63b-cd7a-436a-bd9f-3519937823ba', 'company', '00ffff');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            delete from user_tags where id in (
                'cd0ee62c-3e80-4ea5-9d1b-65a40eb9adb7',
                '655ba306-0c3d-416b-aef2-d4ef658b9104',
                '5574821d-693a-46fc-95d6-38e607212e2f',
                '3cc39317-666e-438f-a165-eab289ab92f6'
            );
        `);
    }

}
