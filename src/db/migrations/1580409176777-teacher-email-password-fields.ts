import {MigrationInterface, QueryRunner} from "typeorm";

export class teacherEmailPasswordFields1580409176777 implements MigrationInterface {
    name = 'teacherEmailPasswordFields1580409176777'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "teacher" ADD "email" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "teacher" ADD CONSTRAINT "UQ_00634394dce7677d531749ed8e8" UNIQUE ("email")`, undefined);
        await queryRunner.query(`ALTER TABLE "teacher" ADD "password" character varying NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "password"`, undefined);
        await queryRunner.query(`ALTER TABLE "teacher" DROP CONSTRAINT "UQ_00634394dce7677d531749ed8e8"`, undefined);
        await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "email"`, undefined);
    }

}
