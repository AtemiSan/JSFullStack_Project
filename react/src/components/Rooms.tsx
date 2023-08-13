import { useState } from 'react';
import classes from '../styles/profile.module.scss';
import { getFreeBuiding1, getFreeCabinets1 } from '../functions/avialable';

export interface IRoomsProps {

}


export function Rooms({ }: IRoomsProps) {
    const [selectedBuilding, setSelectedBuilding] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('');
    
  // список свободных зданий
  let places = getFreeBuiding1();

  // список свободных кабинетов
  //оно должно выходить только после выбора здания
  const cabinets = getFreeCabinets1();
      
    return (
        <>
            <label>
                Кабинет
                <select className={classes.input} required onChange={(e) => setSelectedRoom(e.target.value)}>
                    <option selected disabled></option>
                    {cabinets.map(item => <option value={item.id}> {item.Cabinet} </option>)}
                </select>
            </label>
        </>
    )
}