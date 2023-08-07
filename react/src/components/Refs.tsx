import classes from '../styles/menu.module.scss';
import common from '../styles/common.module.scss';
import { useNavigate } from "react-router-dom"


// удалить это надо скорее всего
export interface IRefsProps {

}

// для списка кнопок
export interface ButtonMenu {
    id: string
    navigate: string
    text: string
}
const createData = (
    id: string,
    navigate: string,
    text: string): ButtonMenu => ({ id, navigate, text })

const ButtonsRef = [
    createData('rooms', 'rooms', 'Комнаты'),
    createData('users', 'users', 'Пользователи')
]

export function Refs({ }: IRefsProps) {

    const navigate = useNavigate();

    //role = 'admin'; 0
    //role = 'manager'; 1
    //role = 'user'; 2

    return (
        <>
            <div>
                <div className={classes.buttons}>
                    {ButtonsRef.map(item =>
                        <div
                            id={item.id}
                            onClick={() => { navigate(item.navigate) }}>{item.text}</div>
                    )}
                </div>

            </div>

        </>
    )
}

//className={classes.btn} 

