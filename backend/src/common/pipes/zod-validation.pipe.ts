import { PipeTransform } from '@nestjs/common';
import type { ZodSchema } from 'zod';
import { AppError } from '../../shared/errors/AppError';

export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      throw new AppError(400, 'Erro de validação.', result.error.flatten());
    }
    return result.data;
  }
}
