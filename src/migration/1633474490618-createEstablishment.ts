import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEstablishment1633474490618 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'Estabelishment',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uiid_generate_v4()'
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'doc',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'site',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'contributors',
                        type: 'integer',
                    },
                    {
                        name: 'sumOfProducts',
                        type: 'integer',
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
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('Estabelishment')
    }

}
