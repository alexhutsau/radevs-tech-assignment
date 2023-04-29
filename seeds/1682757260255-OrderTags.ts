import {MigrationInterface, QueryRunner} from "typeorm";

export class OrderTags1682757260255 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            insert into order_tags values 
                ('39d61afa-c27a-470f-8fe7-87178b783a29', '4ab572dd-8ba2-4772-885d-7773c3af92ea', 'it', '000000'),
                ('6970eab2-78d3-4636-bfe9-bf1277120f36', '4ab572dd-8ba2-4772-885d-7773c3af92ea', 'ra-devs', '00ffff'),
                ('629fcc76-b259-494e-b0bc-a0b82a75e89a', '82dccf64-9f0d-4645-b043-984672c039d2', 'it', '000000'),
                ('a7f15559-fdb9-4c57-828a-53dc54eb0280', '82dccf64-9f0d-4645-b043-984672c039d2', 'omastere', 'ffff00'),
                ('9851c4ef-2c28-4992-a66e-d6cda9dd545d', 'efa56842-3dfb-4ba0-b8f5-44c3ae650324', 'it', 'ffffff'),
                ('ef28de37-937a-4439-b4cc-6f73cfee1cb0', 'efa56842-3dfb-4ba0-b8f5-44c3ae650324', 'crm', '00ff00'),
                ('e13cdbfe-81ca-49c8-a332-9671a7ab357b', 'b3775664-204a-498e-8a94-2ede7fe1a822', 'it', 'ffffff'),
                ('ff8312c5-84a2-46ff-ae0f-817286a58000', 'b3775664-204a-498e-8a94-2ede7fe1a822', 'mobile', 'ff0000');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            delete from orders where id in (
                '39d61afa-c27a-470f-8fe7-87178b783a29',
                '6970eab2-78d3-4636-bfe9-bf1277120f36',
                '629fcc76-b259-494e-b0bc-a0b82a75e89a',
                'a7f15559-fdb9-4c57-828a-53dc54eb0280',
                '9851c4ef-2c28-4992-a66e-d6cda9dd545d',
                'ef28de37-937a-4439-b4cc-6f73cfee1cb0',
                'e13cdbfe-81ca-49c8-a332-9671a7ab357b',
                'ff8312c5-84a2-46ff-ae0f-817286a58000'
            );
        `);
    }

}
