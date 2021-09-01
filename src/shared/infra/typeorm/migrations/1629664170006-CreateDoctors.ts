import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateDoctors1629664170006 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "doctors",
                columns: [
                    {
                        name:"id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "crm",
                        type: "varchar",
                    },
                    {
                        name: "landline",
                        type: "varchar"
                    },
                    {
                        name: "cellPhone",
                        type: "varchar"
                    },
                    {
                        name: "cepId",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                      },
                      {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                      },
                      {
                        name: "deleted_at",
                        type: "timestamp",
                        isNullable: true,
                      },
                      
                ],
                foreignKeys: [
                    {
                        name: "FK_CEP_USER",
                        referencedTableName: "ceps",
                        referencedColumnNames: ["id"],
                        columnNames: ["cepId"],
                        onDelete: 'RESTRICT',
                    }
                ]
            })
        )
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("doctors");
    }

}
