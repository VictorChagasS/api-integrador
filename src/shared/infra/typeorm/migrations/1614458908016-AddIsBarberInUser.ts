import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AddIsBarberInUser1614458908016 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
            name: 'isBarber',
            type: 'boolean',
            isNullable: true,
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'isBarber')
    }

}
