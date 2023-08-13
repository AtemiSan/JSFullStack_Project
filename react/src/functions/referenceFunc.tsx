import { IDepartment, IDolgListResponse, IDolgnost, IRole } from "../model/data";
import { API_PUBLIC_DATA } from "../settings";
import { addAuthHeader } from "./headers.func";

/* достаем значения справчоников */

// Справочник Ролей
const crRole = (
    idRole: number,
    sRole: string
): IRole => ({ idRole, sRole })

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

let Dolgnosts = [
    crDolgnost(0, 'Директор'),
    crDolgnost(1, 'Бухгалтер'),
    crDolgnost(2, 'Инженер'),
]

//let Dolgnosts: Array<IDolgnost>

export async function getDolgnosts1() {

    let DolgListResponse = await fetch(API_PUBLIC_DATA + '/getDolgList', {
        method: 'POST'
    });

    if (DolgListResponse.status == 200) {
        let resultDolgListResponse = await DolgListResponse.json() as IDolgListResponse;
        Dolgnosts = resultDolgListResponse;
        console.log('dolg_ok')
    } else {
        console.log('dolg_NO_ok')
    }

    return (
        Dolgnosts
    )
}

export function getDolgnosts() {
    getDolgnosts1().then(function (result) {
        console.log('результат запроса Должностей');
        console.log(result);
        Dolgnosts = result;
        
    })
    return Dolgnosts
}

// справочник Подразделений
const crDepartment = (
    idDep: number,
    sDep: string
): IDepartment => ({ idDep, sDep })

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
