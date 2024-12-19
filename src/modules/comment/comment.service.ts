import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository } from "typeorm";

import { Comment } from "./comment.entity";
import { Users } from "../users/users.entity";
import { CreateComment } from "./dto/create-comment.dto";
import { UpdateComment } from "./dto/update-comment.dto";

@Injectable()
export class CommentService {
  constructor(@InjectRepository(Comment) private repo: Repository<Comment>) { }

  async findAll() {
    return this.repo.find({ where: { deleted_at: IsNull() } })
  }

  async findById(id: number) {
    return this.repo.findOne({ where: { id, deleted_at: IsNull() }, relations: ["issues"] })
  }

  async create(payload: CreateComment, user: Users) {
    const { comment, job_id } = payload;

    const entity = this.repo.create({
      comment,
      job_id,
      created_by_id: user.id
    })
    return this.repo.save(entity)
  }

  async update(id: number, payload: UpdateComment) {
    return this.repo.update(id, payload)
  }

  async deleteRow(id: number) {
    return this.repo.update(id, { deleted_at: new Date() })
  }
}