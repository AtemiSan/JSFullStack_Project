import { Request, Response, NextFunction } from "express";
import User, { UserRoles } from "../models/user.model";
import Post from "../models/post.model";

interface IUser {
    userId: number;
}

interface IPost {
    postId: number;
}

export const AuthorOrAdminMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = req.user as IUser;
    const userFromDB = await User.findAll({
        where: {
            id: user.userId
        }
    });

//    const post = req.post as IPost;
    const postFromDB = await Post.findAll({
        where: {
            id: 0 //post.postId
        }
    });

    if (userFromDB[0].role == UserRoles.ADMIN || postFromDB[0].id_user == user.userId) {
        next();
    } else {
        res.status(400).json({ message: "Вы не обладаете достаточными правами!" });
    }
}