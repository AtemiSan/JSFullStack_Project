import { Building, Cabinet } from "../model/data"
import { IRoomFilters, IRoomListRequest, IRoomListResponse } from "../model/room"
import { API_ADMIN_ROOM, API_USER_AUTH, API_USER_ROOM } from "../settings"
import { addAuthHeader } from "./headers.func"

// Свободные здания
const createDataB = (
  id: number,
  Building: string): Building => ({ id, Building })

//>> заглушка
const Buildings1 = [
  createDataB(1, 'Здание 1'),
  createDataB(2, 'Здание 2'),
  createDataB(3, 'Здание 3'),
  createDataB(4, 'Здание 4'),
]

export function getFreeBuiding1() {
  return (
    Buildings1
  )
}
//<< заглушка

// для реального запроса
let Buildings: Array<Building>;
let freeRooms: IRoomListRequest;

/* export interface IRoomFilters {
   dtBegin: Date | null    // дата начала аренды (null - если фильтрация не нужна), для получения списка доступных переговорных
   dtEnd: Date | null         // дата окончания аренды (null - если фильтрация не нужна), для получения списка доступных переговорных
   deletedOnly: boolean        // true - вернуть только удалённые (заменить условие по умолчанию bDel == false на bDel == true)
   deletedAdd: boolean     // true - вернуть все (удалённые и не удалённые), отменяет условие по умолчанию bDel == false 
 }*/

 // реальный запрос свободных Зданий
export async function getFreeBuiding(filters: IRoomFilters) {

  freeRooms = { iPage: 0, iCountOnPage: 0 , filters: filters }; 

  let headersSet = new Headers();
  headersSet.append('Content-Type', 'application/json; charset=utf-8');
  addAuthHeader(headersSet);
  let responseBuilding = await fetch(API_USER_ROOM + '/getList', {
    method: 'POST',
    headers: headersSet,
    body: JSON.stringify(freeRooms)
  });

  if (responseBuilding.status == 200) {
     // Добавить удаление повторяющихся
     let resultBuildings = await responseBuilding.json() as IRoomListResponse;
     Buildings = resultBuildings.map(item => createDataB(1, item.sAddress))
  } else {
    console.log('Not_resp');
  }

  return (
    Buildings
  )
}

// Совободные кабинеты
const createDataC = (
  id: number,
  Cabinet: string): Cabinet => ({ id, Cabinet })

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