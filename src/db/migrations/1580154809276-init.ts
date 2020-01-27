import {MigrationInterface, QueryRunner} from "typeorm";

export class init1580154809276 implements MigrationInterface {
    name = 'init1580154809276'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "student" ("id" SERIAL NOT NULL, "first_name" character varying(15) NOT NULL, "last_name" character varying(15) NOT NULL, "rating" smallint NOT NULL DEFAULT 0, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "group_id" integer, CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "teacher" ("id" SERIAL NOT NULL, "first_name" character varying(15) NOT NULL, "last_name" character varying(15) NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2f807294148612a9751dacf1026" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "lesson" ("id" SERIAL NOT NULL, "schedule_index" smallint NOT NULL, "classroom" smallint NOT NULL, "topic" character varying(100) NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "teacher_id" integer, "group_id" integer, CONSTRAINT "PK_0ef25918f0237e68696dee455bd" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "group" ("id" SERIAL NOT NULL, "name" character varying(10) NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_1bd5a468c54488b86d50a117f15" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "lesson" ADD CONSTRAINT "FK_cfe1b52c46b3d6f61ad5be1663c" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "lesson" ADD CONSTRAINT "FK_71fe89b455a094273cab8abe2f2" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "lesson" DROP CONSTRAINT "FK_71fe89b455a094273cab8abe2f2"`, undefined);
        await queryRunner.query(`ALTER TABLE "lesson" DROP CONSTRAINT "FK_cfe1b52c46b3d6f61ad5be1663c"`, undefined);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_1bd5a468c54488b86d50a117f15"`, undefined);
        await queryRunner.query(`DROP TABLE "group"`, undefined);
        await queryRunner.query(`DROP TABLE "lesson"`, undefined);
        await queryRunner.query(`DROP TABLE "teacher"`, undefined);
        await queryRunner.query(`DROP TABLE "student"`, undefined);
    }

}
