import { useNavigate } from 'react-router-dom';
import classes from '../styles/references.module.scss';
export interface IReferencesPageProps {

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

export function ReferencesPage({ }: IReferencesPageProps) {

    const navigate = useNavigate();

    return (
        <>
            <div>
                <div className={classes.buttons}>
                    {ButtonsRef.map(item =>
                        <div
                            id={item.id}
                            className={classes.button}
                            onClick={() => { navigate(item.navigate) }}>{item.text}</div>
                    )}
                </div>
            </div>
            <div id="owners">
                    <table>
                        <tbody>
                            <tr>
                                <td >Owner</td>
                                <td ></td>
                                <td >End date</td>
                                <td >Profits</td>
                                <td >Losses</td>
                                <td >Phone</td>
                            </tr>
                            <tr>
                                <td ><img src="img/sav.png" width="30" height="30"/></td>
                                <td><a >Savannah Nguyen</a> </td>
                                <td><a >1/15/12</a> </td>
                                <td><a >$328.85</a></td>
                                <td><a >$779.58</a> </td>
                                <td><a >(603) 555-1234</a></td>
                            </tr>
                            </tbody>
                            </table>
                            </div>            
        </>
    )
}