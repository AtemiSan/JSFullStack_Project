import { IPost } from "../dtos/post.dto";
import Post from "../models/post.model";

class PostService {
    async getAllPosts() {
        const posts = await Post.findAll();
        return posts;
    }

    async getPost(postDTO: IPost) {
        console.log('postDTO: ', postDTO);
        const post = await Post.findAll({
            where: {
                id: postDTO.id
            }
        })
        return post;
    }

    async like(postDTO: IPost) {
        const post = await Post.findAll({
            where: {
                id: postDTO.id
            }
        })

        if (post && post.length == 1) {
            post[0].update({
                like: postDTO.likes+1
            });
            post[0].save();
        }
    }

    async new(postDTO: IPost) {
        const post = await Post.create(
            {
                content: postDTO.content,
                id_user: postDTO.id_user
            }
        )
    }

    async delete(postDTO: IPost) {
        const post = await Post.findAll({
            where: {
                id: postDTO.id
            }
        })

        if (post && post.length == 1) {
            post[0].destroy();
            post[0].save();
        }
    }

    async edit(postDTO: IPost) {
        const post = await Post.findAll({
            where: {
                id: postDTO.id
            }
        })

        if (post && post.length == 1) {
            post[0].update({
                content: postDTO.content
            });
            post[0].save();
        }
    }

}

export default new PostService();