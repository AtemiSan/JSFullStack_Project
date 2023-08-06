import { Building, Cabinet } from "../model/reference"

// Свободные здания
  const createDataB = (
    id: number,
    Building: string) : Building => ({ id, Building })
  
  const Buildings = [
    createDataB(1, 'Здание 1'),
    createDataB(2, 'Здание 2'),
    createDataB(3, 'Здание 3'),
    createDataB(4, 'Здание 4'),
  ]

export interface IRoomFilters {
  dtBegin: Date | null    // дата начала аренды (null - если фильтрация не нужна), для получения списка доступных переговорных
  dtEnd: Date | null         // дата окончания аренды (null - если фильтрация не нужна), для получения списка доступных переговорных
  deletedOnly: boolean        // true - вернуть только удалённые (заменить условие по умолчанию bDel == false на bDel == true)
  deletedAdd: boolean     // true - вернуть все (удалённые и не удалённые), отменяет условие по умолчанию bDel == false 
}

export function getFreeBuiding() {

    return (
        Buildings
    )
  }

  // Совободные кабинеты
  const createDataC = (
    id: number,
    Cabinet: string) : Cabinet => ({ id, Cabinet })
  
  const Cabinets = [
    createDataC(1, '№100'),
    createDataC(2, '№200'),
    createDataC(3, '№500'),
    createDataC(4, '№413'),
  ]

export function getFreeCabinets() {

    return (
        Cabinets
    )
  }  