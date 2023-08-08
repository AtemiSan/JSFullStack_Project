import { Table, Column, AllowNull, PrimaryKey, Model, AutoIncrement, DataType, CreatedAt, UpdatedAt, DeletedAt } from "sequelize-typescript";

@Table({
  timestamps: true,
  paranoid: true,
  freezeTableName: true,
  underscored: true
})
export default class dolgnost extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  idDolg!: number

  @AllowNull(false)
  @Column(DataType.STRING)
  sDolg!: string

  @CreatedAt
  dtIns!: Date

  @UpdatedAt
  dtUpd!: Date

  @DeletedAt
  dtDel!: Date
}