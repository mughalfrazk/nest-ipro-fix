import { Controller, Delete, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IssueService } from "./issue.service";

@ApiTags("Issue")
@Controller("issue")
export class IssueController {
  constructor(private issueService: IssueService) { }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.issueService.deleteRow(id)
  }
}