import { Table, Column, AllowNull, PrimaryKey, Model, AutoIncrement, Default, DataType, Unique, ForeignKey, BelongsTo, CreatedAt, UpdatedAt, DeletedAt } from "sequelize-typescript";
import Status from "./status.model";

@Table({
  timestamps: true,
  paranoid: true,
  freezeTableName: true,
  underscored: true
})
export default class meeting_room extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  idRoom!: number

  @AllowNull(false)
  @Column(DataType.STRING)
  sAddress!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  sCabinet!: string

  @AllowNull(false)
  @Column(DataType.INTEGER)
  iSeatingPlaces!: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  bHasProjector!: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  bHasInternet!: number

  @ForeignKey(() => Status)
  @Column(DataType.INTEGER)
  idStatus!: number

  @BelongsTo(() => Status)
  status!: Status

  @AllowNull(true)
  @Column(DataType.DATE)
  dtInEnable!: Date

  @CreatedAt
  dtIns!: Date

  @UpdatedAt
  dtUpd!: Date

  @DeletedAt
  dtDel!: Date
}