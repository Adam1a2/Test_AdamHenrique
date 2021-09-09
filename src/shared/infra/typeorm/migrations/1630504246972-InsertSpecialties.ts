import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertSpecialties1630504246972 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO specialties (name) VALUES ('Alergologia'),('Angiologia'),('Buco maxilo'),('Cardiologia clínca'),('Cardiologia infantil'),('Cirurgia cabeça e pescoço'),('Cirurgia cardíaca'),('Cirurgia de tórax')",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "DELETE FROM specialties WHERE name = 'Alergologia'",
    );
    await queryRunner.query(
      "DELETE FROM specialties WHERE name = 'Angiologia'",
    );
    await queryRunner.query(
      "DELETE FROM specialties WHERE name = 'Buco maxilo'",
    );
    await queryRunner.query(
      "DELETE FROM specialties WHERE name = 'Cardiologia clínca'",
    );
    await queryRunner.query(
      "DELETE FROM specialties WHERE name = 'Cardiologia infantil'",
    );
    await queryRunner.query(
      "DELETE FROM specialties WHERE name = 'Cirurgia cabeça e pescoço'",
    );
    await queryRunner.query(
      "DELETE FROM specialties WHERE name = 'Cirurgia cardíaca'",
    );
    await queryRunner.query(
      "DELETE FROM specialties WHERE name = 'Cirurgia de tórax'",
    );
  }
}
