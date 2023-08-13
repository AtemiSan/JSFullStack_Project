import { IRoomFreeListRequest, IRoomListResponse } from "../model/room";
import { API_USER_ROOM } from "../settings";
import { addAuthHeader } from "./headers.func";


export async function getFreeRoomsQuery(req: IRoomFreeListRequest) {

  let headersSet = new Headers();
  headersSet.append('Content-Type', 'application/json; charset=utf-8');
  addAuthHeader(headersSet);
  let res = await fetch(API_USER_ROOM + '/getFreeList', {
    method: 'POST',
    headers: headersSet,
    body: JSON.stringify(req)
  });

  if (res.status == 200) 
    return await res.json() as IRoomListResponse;
  else
    return [] as IRoomListResponse
}
