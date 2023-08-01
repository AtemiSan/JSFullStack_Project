import { Table, Column, AllowNull, PrimaryKey, Model, AutoIncrement, Default, DataType, Unique } from "sequelize-typescript";

export enum UserRoles {
    GUEST = "GUEST",
    USER = "USER",
    ADMIN = "ADMIN"
}

@Table
export default class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING)
    email!: string

    @AllowNull(false)
    @Column(DataType.STRING)
    password!: string

    @AllowNull(false)
    @Column(DataType.STRING)
    name!: string

    @AllowNull(false)
    @Column(DataType.STRING)
    surname!: string

    @Column(DataType.STRING)
    patronymic!: string

    @Default(UserRoles.USER)
    @AllowNull(false)
    @Column(DataType.ENUM(
        UserRoles.USER,
        UserRoles.ADMIN
    ))
    role!: UserRoles
}