import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CommentService } from "./comment.service";
import { CreateComment } from "./dto/create-comment.dto";
import { AuthUser } from "@/decorators/auth-user.decorator";
import { Users } from "../users/users.entity";
import { UpdateComment } from "./dto/update-comment.dto";

@ApiTags("Comment")
@Controller("comment")
export class CommentController {
  constructor(private commentService: CommentService) { }

  @Get()
  async getAll() {
    return this.commentService.findAll()
  }

  @Post()
  async create(@Body() body: CreateComment, @AuthUser() user: Users) {
    return this.commentService.create(body, user)
  }

  @Patch(':id')
  async update(@Param("id") id: number, @Body() body: UpdateComment, @AuthUser() user: Users) {
    const entity = await this.commentService.findById(id);
    if (!entity) throw new BadRequestException("Comment not found.")

    if (user.id !== entity.created_by_id) throw new BadRequestException("Not authorized to update the comment.")

    return this.commentService.update(id, body)
  }

  @Delete(':id')
  async delete(@Param("id") id: number, @AuthUser() user: Users) {
    const entity = await this.commentService.findById(id)
    if (!entity) throw new BadRequestException("Comment not found.")

    if (user.id !== entity.created_by_id) throw new BadRequestException("Not authorized to delete the comment.")

    await this.commentService.deleteRow(id)
  }
}