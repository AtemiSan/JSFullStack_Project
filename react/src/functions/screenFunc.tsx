import { IButtonMenu } from "../model/screen"


const createData = (
    id: string,
    navigate: string,
    text: string): IButtonMenu => ({ id, navigate, text })

const ButtonsMenu = [
    createData('profile', 'profile', 'Профиль'),
    createData('lk', '/lk', 'Мои заявки'),
    createData('create_order', 'create_order', 'Подать заявку'),
    createData('registration', 'registration', 'Регистрация'),
    createData('agreement', 'agreement', 'Согласование'),
    //createData('references', 'references', 'Справочники')
]


export function getButtonsMenu() {

    return (
        ButtonsMenu
    )
}