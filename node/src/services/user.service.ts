import User from "../models/user.model";
import { RegisterRequest, LoginRequest } from "../dtos/auth.dto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
    async createUser(userDTO: RegisterRequest) {
        const hashPassword = await bcrypt.hash(userDTO.password, 10);
        const user = await User.create(
            {
                email: userDTO.email,
                password: hashPassword,
                name: userDTO.name,
                surname: userDTO.surname,
                patronymic: userDTO.patronymic
            }
        )
    }

    async getAllUsers() {
        const users = await User.findAll();
        return users;
    }

    async loginUser(loginDTO: LoginRequest) {
        const user = await User.findAll({
            where: {
                email: loginDTO.email
            }
        })

        // const hashFrom = await bcrypt.hash(loginDTO.password, 10); // Типичная ошибка, хэш будет другой, для проверки необходимо использовать bcrypt.compare()

        if (user && loginDTO.email === user[0].email && await bcrypt.compare(loginDTO.password, user[0].password)) {
            const token = jwt.sign(
                { userId: user[0].id },
                process.env.JWT_SECRET as string
            )

            return token;
        }
    }
}

export default new UserService();