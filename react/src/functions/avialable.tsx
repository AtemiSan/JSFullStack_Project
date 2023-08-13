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
  createDataB(1, 'Здание 2'),
  createDataB(1, 'Здание 3'),
  createDataB(1, 'Здание 1'),
  createDataB(1, 'Здание 4'),
]

let Buildings2: Array<Building>;

export function getFreeBuiding1() {
  Buildings2 = [Buildings1[0]]
  let find: boolean;
  Buildings1.forEach((element) => {
    Buildings2.forEach((elementUniq) => {
      if (elementUniq.Building === element.Building) {
        find = true;
      }
    }
    )
    if (find === false) {
      Buildings2.push(element)
    }
    find = false;
  }
  );  
  return (
    Buildings2
  )
}
//<< заглушка

// для реального запроса
let allBuildings: Array<Building>;
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

  freeRooms = { iPage: 0, iCountOnPage: 0, filters: filters };

  let headersSet = new Headers();
  headersSet.append('Content-Type', 'application/json; charset=utf-8');
  addAuthHeader(headersSet);
  let responseBuilding = await fetch(API_USER_ROOM + '/getList', {
    method: 'POST',
    headers: headersSet,
    body: JSON.stringify(freeRooms)
  });

  if (responseBuilding.status == 200) {
    let resultBuildings = await responseBuilding.json() as IRoomListResponse;
    allBuildings = resultBuildings.map(item => createDataB(1, item.sAddress))
    // удаляем повторяющиеся
    Buildings = [allBuildings[0]]
    let find: boolean;
    allBuildings.forEach((element) => {
      Buildings.forEach((elementUniq) => {
        if (elementUniq.id === element.id) {
          find = true;
        }
      }
      )
      if (find === false) {
        Buildings.push(element)
      }
      find = false;
    }
    );

  } else {
    console.log('Not_resp_avialable');
  }

  return (
    Buildings
  )
}

// Совободные кабинеты
const createDataC = (
  id: number,
  Cabinet: number): Cabinet => ({ id, Cabinet })

const Cabinets = [
  createDataC(1, 100),
  createDataC(2, 200),
  createDataC(3, 500),
  createDataC(4, 400),
]
let allCabinets: Array<Cabinet>;

// заглушка
export function getFreeCabinets1() {
  console.log(allBuildings)
// тут нам еще доступны значения allBuildings
//Cabinets = resultBuildings.map(item => createDataB(1, item.sAddress))
  return (
    Cabinets
  )
}  

// реальный запрос свободных Кабинетов
export function getFreeCabinets() {
  return (
    Cabinets
  )
}  