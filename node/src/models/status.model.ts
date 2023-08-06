import { Table, Column, AllowNull, PrimaryKey, Model, AutoIncrement, DataType, CreatedAt, UpdatedAt, DeletedAt } from "sequelize-typescript";

export enum Statuses {
  ENABLED = 0,
  DISABLED = 1,
  NEW = 10,
  AGREED = 11,
  REJECTED = 12,
  CANCELED_BY_USER = 13,
  CANCELED_BY_SYSTEM = 14
}

@Table({
  timestamps: true,
  paranoid: true,
  freezeTableName: true,
  underscored: true
})
export default class Status extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  idStatus!: number

  @AllowNull(false)
  @Column(DataType.STRING)
  sStatus!: string

  @AllowNull(true)
  @Column(DataType.STRING)
  sComment!: string

  @CreatedAt
  dtIns!: Date

  @UpdatedAt
  dtUpd!: Date

  @DeletedAt
  dtDel!: Date
}