import { IDepListResponse, IDepartment, IDolgListResponse, IDolgnost, IRole, IRoleListResponse } from "../model/data";
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
        localStorage.setItem('dolgnost', JSON.stringify(resultDolgListResponse));
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

let Department: IDepListResponse;
export async function getDepartments1() {
    //IDepListResponse
    let DepListResponse = await fetch(API_PUBLIC_DATA + '/getDepartList', {
        method: 'POST'
    });

    console.log(DepListResponse)

    if (DepListResponse.status == 200) {
        let resultDepListResponse = await DepListResponse.json() as IDepListResponse;
        Department = resultDepListResponse;
        localStorage.setItem('depart', JSON.stringify(resultDepListResponse));
        console.log('dolg_ok')
    } else {
        console.log('dolg_NO_ok')
    }
    return (
        Department
    )
}

let rolesResp: IRoleListResponse;
export async function getRoles1() {
    let RoleListResponse = await fetch(API_PUBLIC_DATA + '/getRoleList', {
        method: 'POST'
    });

    console.log(RoleListResponse)

    if (RoleListResponse.status == 200) {
        let resultRoleListResponse = await RoleListResponse.json() as IRoleListResponse;
        rolesResp = resultRoleListResponse;
        localStorage.setItem('role', JSON.stringify(resultRoleListResponse));
        console.log('roles_ok')
    } else {
        console.log('roles_NO_ok')
    }
    return (
        rolesResp
    )
}