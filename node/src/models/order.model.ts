import { Table, Column, AllowNull, PrimaryKey, Model, AutoIncrement, Default, DataType, Unique, ForeignKey, BelongsTo, CreatedAt, UpdatedAt, DeletedAt } from "sequelize-typescript";
import Status from "./status.model";
import User from "./user.model";
import Meeting_Room from "./room.model";

@Table({
  timestamps: true,
  paranoid: true,
  freezeTableName: true,
  underscored: true
})
export default class Order_Meeting_Room extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  idOrder!: number

  @AllowNull(false)
  @Column(DataType.DATE)
  dtBegin!: Date

  @AllowNull(false)
  @Column(DataType.DATE)
  dtEnd!: Date

  @AllowNull(true)
  @Column(DataType.STRING)
  sComment!: string

  @AllowNull(false)
  @Column(DataType.INTEGER)
  iSeatingPlaces!: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  bHasProjector!: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  bHasInternet!: number

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  idUser!: number

  @BelongsTo(() => User)
  user!: User

  @ForeignKey(() => Meeting_Room)
  @Column(DataType.INTEGER)
  idRoom!: number

  @BelongsTo(() => Meeting_Room)
  room!: Meeting_Room

  @ForeignKey(() => Status)
  @Column(DataType.INTEGER)
  idStatus!: number

  @BelongsTo(() => Status)
  status!: Status

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  idUserAgreement!: number

  @BelongsTo(() => User)
  userAgreement!: User

  @CreatedAt
  dtIns!: Date

  @UpdatedAt
  dtUpd!: Date

  @DeletedAt
  dtDel!: Date
}