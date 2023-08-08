import { Table, Column, AllowNull, PrimaryKey, Model, AutoIncrement, Default, DataType, Unique, ForeignKey, BelongsTo, CreatedAt, UpdatedAt, DeletedAt } from "sequelize-typescript";
import Department from "./department.model";
import Dolgnost from "./dolgnost.model";
import Role from "./role.model";

export enum UserRoles {
  ADMIN = 0,
  MANAGER = 1,
  USER = 2,
}

@Table({
  timestamps: true,
  paranoid: true,
  freezeTableName: true,
  underscored: true
})
export default class users extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  idUser!: number

  @AllowNull(false)
  @Column(DataType.STRING)
  sFam!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  sName!: string

  @AllowNull(true)
  @Column(DataType.STRING)
  sOtch!: string

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  sEmail!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  sPassw!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  sPhone!: string

  @ForeignKey(() => Dolgnost)
  @Column(DataType.INTEGER)
  idDolg!: number

  @BelongsTo(() => Dolgnost)
  dolg!: Dolgnost

  @ForeignKey(() => Department)
  @Column(DataType.INTEGER)
  idDep!: number

  @BelongsTo(() => Department)
  dep!: Department

  @ForeignKey(() => Role)
  @Column(DataType.INTEGER)
  idRole!: number

  @BelongsTo(() => Role)
  role!: Role

  @CreatedAt
  dtIns!: Date

  @UpdatedAt
  dtUpd!: Date

  @DeletedAt
  dtDel!: Date
}