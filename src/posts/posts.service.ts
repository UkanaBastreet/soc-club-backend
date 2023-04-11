import { Injectable, HttpStatus } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  create(createPostDto: CreatePostDto) {
    // const id = Math.random();
    const id = this.posts.length;
    const post: Post = {
      id,
      ...createPostDto,
      creationAt: new Date(),
    };
    this.posts.push(post);
    return { post };
  }

  findAll() {
    return this.posts;
  }

  findOne(id: number) {
    if (this.posts[id]) return this.posts[id];
    return HttpStatus.NOT_FOUND;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    if (this.posts[id]) {
      this.posts[id] = { ...this.posts[id], ...updatePostDto };
    }
    return HttpStatus.NOT_FOUND;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
