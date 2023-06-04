import { PaginationQueryModel } from '../models/QueryModel';
import { IsNumberString, IsOptional } from 'class-validator';

export class PaginationQueryDto implements PaginationQueryModel {
  @IsNumberString()
  @IsOptional()
  page = 1;

  @IsNumberString()
  @IsOptional()
  perPage = 10;
}
