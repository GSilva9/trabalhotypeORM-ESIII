import {MigrationInterface, QueryRunner} from "typeorm";

export default class RelationEstabelishmentProduct1636499617805 implements MigrationInterface {
    name = 'RelationEstabelishmentProduct1636499617805'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" integer NOT NULL, "description" character varying NOT NULL, "buyPrice" integer NOT NULL, "sellPrice" integer NOT NULL, "lovers" integer NOT NULL, CONSTRAINT "UQ_99c39b067cfa73c783f0fc49a61" UNIQUE ("code"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "estabelishment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "doc" integer NOT NULL, "site" character varying NOT NULL, "contributors" integer NOT NULL, "sumOfProducts" integer NOT NULL, "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_41966eee0220d83b7f45b772200" UNIQUE ("doc"), CONSTRAINT "UQ_bf0a5187394863745b8dc5fbf1f" UNIQUE ("site"), CONSTRAINT "PK_798681c38763894cc88c9b4e27b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "estabelishment_products_product" ("estabelishmentId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_b025aabb7e229c5180568ec17a0" PRIMARY KEY ("estabelishmentId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2c483475cccb54720cccf96e3a" ON "estabelishment_products_product" ("estabelishmentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4b718c09572a78a488281c09a9" ON "estabelishment_products_product" ("productId") `);
        await queryRunner.query(`ALTER TABLE "estabelishment_products_product" ADD CONSTRAINT "FK_2c483475cccb54720cccf96e3a3" FOREIGN KEY ("estabelishmentId") REFERENCES "estabelishment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "estabelishment_products_product" ADD CONSTRAINT "FK_4b718c09572a78a488281c09a95" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "estabelishment_products_product" DROP CONSTRAINT "FK_4b718c09572a78a488281c09a95"`);
        await queryRunner.query(`ALTER TABLE "estabelishment_products_product" DROP CONSTRAINT "FK_2c483475cccb54720cccf96e3a3"`);
        await queryRunner.query(`DROP INDEX "IDX_4b718c09572a78a488281c09a9"`);
        await queryRunner.query(`DROP INDEX "IDX_2c483475cccb54720cccf96e3a"`);
        await queryRunner.query(`DROP TABLE "estabelishment_products_product"`);
        await queryRunner.query(`DROP TABLE "estabelishment"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
