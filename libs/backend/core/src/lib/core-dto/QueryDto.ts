import { BackendCoreConstants } from '../constants/constants';
import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

export const PaginationQuerySchema = z.object({
  page: z.number().positive().default(1),
  pePage: z.number().gte(0).default(BackendCoreConstants.DefaultPerPage),
});

export class PaginationQueryDto extends createZodDto(PaginationQuerySchema) {}

export type PaginationQueryModel = z.infer<typeof PaginationQuerySchema>;
