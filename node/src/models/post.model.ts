import { Table, Column, AllowNull, PrimaryKey, Model, AutoIncrement, Default, DataType, Unique } from "sequelize-typescript";

@Table
export default class Post extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number

    @AllowNull(false)
    @Column(DataType.STRING)
    content!: string

    @AllowNull(false)
    @Column(DataType.INTEGER)
    id_user!: number

    @Default(0)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    likes!: number
}