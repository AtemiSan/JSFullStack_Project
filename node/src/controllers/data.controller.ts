import { Request, Response, NextFunction } from "express";
import postService from "../services/data.service";

class PostController {
    async getAllPosts(req: Request, res: Response, next: NextFunction) {
        const posts = await postService.getAllPosts();
        res.json(posts);
    }

    async getPost(req: Request, res: Response, next: NextFunction) {
        console.log('req.body: ', req.body);
        const post =  await postService.getPost(req.body);
        res.json(post);
    }

    async new(req: Request, res: Response, next: NextFunction) {
        try {
            const posts = await postService.new(req.body);
            return res.status(201).json({ message: "Пост создан" })
        } catch(e) {
            next(e);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const posts = await postService.delete(req.body);
            return res.status(201).json({ message: "Пост удалён" })
        } catch(e) {
            next(e);
        }
    }

    async edit(req: Request, res: Response, next: NextFunction) {
        try {
            const post = await postService.edit(req.body);
            res.json(post)
        } catch(e) {
            next(e);
        }
    }
}

export default new PostController();