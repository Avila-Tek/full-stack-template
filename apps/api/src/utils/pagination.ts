import type {
  Model,
  Document,
  FilterQuery,
  ProjectionType,
  QueryOptions,
} from 'mongoose';

export type Pagination<T> = {
  count: number;
  items: T[];
  pageInfo: {
    currentPage: number;
    perPage: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
};

export async function paginateModel<T extends Model<any>, U extends Document>(
  page: number,
  perPage: number,
  model: T,
  filter: FilterQuery<T> = {},
  projection: ProjectionType<T> | null = null,
  options: QueryOptions<T> | null = {}
): Promise<Pagination<U>> {
  const count = await model.countDocuments(filter);
  const pageCount = Math.ceil(count / perPage);
  if (page > pageCount) {
    throw new Error('No hay más páginas disponibles');
  }
  const skip = Math.max(0, (page - 1) * perPage);
  const products = await model.find(filter, projection, {
    ...(options ?? {}),
    skip,
    limit: perPage,
  });
  return {
    count,
    items: products,
    pageInfo: {
      currentPage: page,
      perPage,
      pageCount,
      itemCount: count,
      hasPreviousPage: page > 1,
      hasNextPage: products.length > perPage || page * perPage < count,
    },
  };
}
