import {MigrationInterface, QueryRunner} from "typeorm";

export class teacherDefaultFirstNameLastName1580410936122 implements MigrationInterface {
    name = 'teacherDefaultFirstNameLastName1580410936122'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "teacher" ALTER COLUMN "first_name" SET DEFAULT ''`, undefined);
        await queryRunner.query(`ALTER TABLE "teacher" ALTER COLUMN "last_name" SET DEFAULT ''`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "teacher" ALTER COLUMN "last_name" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "teacher" ALTER COLUMN "first_name" DROP DEFAULT`, undefined);
    }

}
