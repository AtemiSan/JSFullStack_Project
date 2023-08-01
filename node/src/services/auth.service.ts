import { RegisterRequest, LoginRequest } from "../dtos/auth.dto";
import { UserResponse } from "../dtos/user.dto";
import userService from "./user.service";

class AuthService {
    async register(userDTO: RegisterRequest) {
        const user = await userService.createUser(userDTO);
    }

    async login(loginDTO: LoginRequest) {
        const token = await userService.loginUser(loginDTO);
        return token;
    }
}

export default new AuthService();