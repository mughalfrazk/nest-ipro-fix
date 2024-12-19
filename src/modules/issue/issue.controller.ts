import { BadRequestException, Controller, Delete, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IssueService } from "./issue.service";

@ApiTags("Issue")
@Controller("issue")
export class IssueController {
  constructor(private issueService: IssueService) { }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    const entity = await this.issueService.findById(id)
    if (!entity) throw new BadRequestException("Issue not found")

    return this.issueService.deleteRow(id)
  }
}