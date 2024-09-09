import { PipeTransform, UnprocessableEntityException, UsePipes } from "@nestjs/common";
import { ZodError, ZodSchema } from "zod";

export function ValidationPipe(dto: ZodSchema) {
  return UsePipes(new ZodValidationPipe(dto))
}

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) { }

  transform(value: any) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      const e: ZodError = error
      throw new UnprocessableEntityException("Validation failed", { description: e.issues } as any)
    }
  }
}