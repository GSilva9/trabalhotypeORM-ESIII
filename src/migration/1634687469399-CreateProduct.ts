import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProduct1634687469399 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'Product',
                columns:[
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'code',
                        type: 'integer',
                        isUnique: true,
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                    },
                    {
                        name: 'buyPrice',
                        type: 'float',
                    },
                    {
                        name: 'sellPrice',
                        type: 'float',
                    },
                    {
                        name: 'lovers',
                        type: 'integer'
                    },
                    {
                        name: 'created_At',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_At',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ]
            }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Product')
    }

}
