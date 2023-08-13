import { IUserResponse } from "../model/user";


export function checkUserLoggedIn() {
  let user: IUserResponse;
  if (localStorage.getItem('user') !== null) {
    user = JSON.parse(localStorage.getItem('user') as string);
    return user;
  }
}
