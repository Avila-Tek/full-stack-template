import { gql } from 'graphql-tag';
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

/**
 * @function paginateModel
 * @description This function recibe a model and execute all the logic for pagination
 * @param {number} page - actual page
 * @param {number} perPage - items per page
 * @param {Model<any>} model - mongoose model
 * @param {FilterQuery<any>} filter - filter query
 * @param {ProjectionType<any>} projection - projection
 * @param {QueryOptions<any>} options - options
 * @returns {Pagination<Document<any>>} - pagination object
 */
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

export function buildPaginationType(_name: string) {
  if (typeof _name !== 'string') {
    throw new TypeError('buildPaginationType: name must be a string');
  }
  const name = `${_name.charAt(0).toUpperCase()}${_name.slice(1)}`;
  return `
    type ${name}Pagination {
      count: Int!
      items: [${name}]!
      pageInfo: ${name}PageInfo!
    }
    type ${name}PageInfo {
      currentPage: Int
      perPage: Int
      itemCount: Int
      pageCount: Int
      hasPreviousPage: Boolean
      hasNextPage: Boolean
    }
  `;
}
