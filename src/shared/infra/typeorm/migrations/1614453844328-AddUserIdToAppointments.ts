import {MigrationInterface, QueryRunner, TableColumn,TableForeignKey} from "typeorm";

export default class AddUserIdToAppointments1614453844328 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('appointments', new TableColumn({
            name: 'user_id',
            type: 'uuid',
            isNullable: true,
        }),
        )
        await queryRunner.createForeignKey('appointments', new TableForeignKey({
            columnNames: ['user_id'],
            name:'AppointmentUser',
            referencedColumnNames:['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments','AppointmentUser')
        await queryRunner.dropColumn('appointments', 'user_id')
       
    }

}
