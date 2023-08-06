import { ILoginRequest } from "../dtos/auth.dto";
import { IUserToken } from "../dtos/data.dto";
import { IChangePasswRequest, IUserResponse } from "../dtos/user.dto";
import userModel from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


class CAuthService {

  //================================================================================================================================================================================
  async login(loginDTO: ILoginRequest) {
    const user = await userModel.findAll({
      where: {
        email: loginDTO.sEmail
      }
    })

    // const hashFrom = await bcrypt.hash(loginDTO.password, 10); // Типичная ошибка, хэш будет другой, для проверки необходимо использовать bcrypt.compare()

    if (user && user.length == 1 
      && loginDTO.sEmail === user[0].sEmail 
      && await bcrypt.compare(loginDTO.sPassw, user[0].sPassw))
    {
      const token = jwt.sign({
          idUser: user[0].id,
          role: user[0].role
        },
        process.env.JWT_SECRET as string
      )

      return token;
    }
  }

  //================================================================================================================================================================================
  async changePassw(reqUser: IUserToken, reqDTO: IChangePasswRequest) {
    const user = await userModel.findAll({
      where: {
        idUser: reqUser.idUser
      }
    })

    if (user && user.length == 1) {
      if (reqDTO.sNewPassw.length > 0 && await bcrypt.compare(reqDTO.sOldPassw, user[0].sPassw)) {
        const hashPassword = await bcrypt.hash(reqDTO.sNewPassw, 10);
        user[0].update({
          sPassw: hashPassword
        });
////      user[0].save();
        return true;
      }
    } else {
      if (!user) 
        console.log('CAuthService.changePassw: Попытка изменить пароль у несуществующего пользователя. idUser = ' + reqUser.idUser);
      else 
        console.log('CAuthService.changePassw: Колизия в БД, найдено больше одного пользователя. idUser = ' + reqUser.idUser);
    }
  }

  //================================================================================================================================================================================
  async getProfile(reqUser: IUserToken) {
    const user = await userModel.findAll({
      where: {
        idUser: reqUser.idUser
      }
    })

    if (user && user.length == 1) {
      return user[0] as IUserResponse;
    } else {
      if (!user) 
        console.log('CAuthService.getProfile: Попытка получения профиля несуществующего пользователя. idUser = ' + reqUser.idUser);
      else 
        console.log('CAuthService.getProfile: Колизия в БД, найдено больше одного пользователя. idUser = ' + reqUser.idUser);
    }
  }
}

export default new CAuthService();