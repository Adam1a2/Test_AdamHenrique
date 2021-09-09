import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class DoctorSpecialties1629776484363 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'doctors_specialties',
        columns: [
          {
            name: 'doctor_id',
            type: 'uuid',
          },
          {
            name: 'specialty_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    ),
      await queryRunner.createForeignKey(
        'doctors_specialties',
        new TableForeignKey({
          name: 'FKSpecialtiesDoctors',
          referencedTableName: 'specialties',
          referencedColumnNames: ['id'],
          columnNames: ['specialty_id'],
          onDelete: 'RESTRICT',
          onUpdate: 'SET NULL',
        }),
      );

    await queryRunner.createForeignKey(
      'doctors_specialties',
      new TableForeignKey({
        name: 'FKDoctorsSpecialties',
        referencedTableName: 'doctors',
        referencedColumnNames: ['id'],
        columnNames: ['doctor_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'doctors_specialties',
      'FKSpecialtiesDoctors',
    );

    await queryRunner.dropForeignKey(
      'doctors_specialties',
      'FKDoctorsSpecialties',
    );

    await queryRunner.dropTable('doctors_specialties');
  }
}
