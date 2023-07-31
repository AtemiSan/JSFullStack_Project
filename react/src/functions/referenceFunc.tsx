import { IDepartment, IDolgnost, IRole1 } from "../model/reference";

/* достаем значения справчоников */

// Справочник Ролей
const crRole = (
    idRole: number,
    sRole: string
): IRole1 => ({ idRole, sRole })

const Roles = [
    crRole(0, 'Администратор'),
    crRole(1, 'Менеджер'),
    crRole(2, 'Пользователь'),
]

export function getRoles() {
    return (
        Roles
    )
}

// справочник Должностей
const crDolgnost = (
    idDolg: number,
    sDolg: string
): IDolgnost => ({ idDolg, sDolg })

const Dolgnosts = [
    crDolgnost(0, 'Директор'),
    crDolgnost(1, 'Бухгалтер'),
    crDolgnost(2, 'Инженер'),
]

export function getDolgnosts() {
    return (
        Dolgnosts
    )
}

// справочник Подразделений
const crDepartment = (
    idDep: number,
    sDDep: string
): IDepartment => ({ idDep, sDDep })

const Departments = [
    crDepartment(0, 'Директор'),
    crDepartment(1, 'Бухгалтер'),
    crDepartment(2, 'Инженер'),
]

export function getDepartments() {
    return (
        Departments
    )
}
