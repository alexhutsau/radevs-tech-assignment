import {MigrationInterface, QueryRunner} from "typeorm";

export class Orders1682757018669 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            insert into orders values 
                ('4ab572dd-8ba2-4772-885d-7773c3af92ea', 'b8ed84de-8a9e-4cfb-a21b-9dbdb06446b0'),
                ('82dccf64-9f0d-4645-b043-984672c039d2', 'b8ed84de-8a9e-4cfb-a21b-9dbdb06446b0'),
                ('efa56842-3dfb-4ba0-b8f5-44c3ae650324', '7f61b63b-cd7a-436a-bd9f-3519937823ba'),
                ('b3775664-204a-498e-8a94-2ede7fe1a822', '7f61b63b-cd7a-436a-bd9f-3519937823ba');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            delete from orders where id in (
                '4ab572dd-8ba2-4772-885d-7773c3af92ea',
                '82dccf64-9f0d-4645-b043-984672c039d2',
                'efa56842-3dfb-4ba0-b8f5-44c3ae650324',
                'b3775664-204a-498e-8a94-2ede7fe1a822'
            );
        `);
    }

}
