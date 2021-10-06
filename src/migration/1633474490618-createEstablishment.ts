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
                    },
                    {
                        name: 'site',
                        type: 'varchar',
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
                        name: 'update_At',
                        type: 'timestamp',
                        default: 'now()',
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('Estabelishment')
    }

}
