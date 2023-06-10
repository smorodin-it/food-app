import { PaginationQueryModel } from '../models/QueryModel';
import { IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { BackendCoreConstants } from '../constants/constants';

export class PaginationQueryDto implements PaginationQueryModel {
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  page = 1;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  perPage = BackendCoreConstants.DefaultPerPage;
}
