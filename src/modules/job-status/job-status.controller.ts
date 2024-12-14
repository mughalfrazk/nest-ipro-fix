import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JobStatusService } from "./job-status.service";

@ApiTags("Job Status")
@Controller("job-status")
export class JobStatusController {
  constructor(private jobStatusService: JobStatusService) { }

  @Get()
  async getAll() {
    return this.jobStatusService.findAll()
  }
}