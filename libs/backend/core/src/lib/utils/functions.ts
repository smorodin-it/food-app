import { PaginationQueryModel } from '../core-dto';

interface PrismaPaginationFields {
  take: number;
  skip: number;
}

type CalculatePaginationData = (
  paginationQuery: PaginationQueryModel,
  total: number
) => PrismaPaginationFields;

export const calculatePaginationData: CalculatePaginationData = (
  { page = 1, perPage = 10 },
  total
) => {
  return {
    skip: page === 1 ? 0 : page * perPage,
    take: perPage === 0 ? total : perPage,
  };
};
