import { Query, FilterQuery } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this.query?.search || '';
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })),
      } as FilterQuery<T>);
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludingImportant = [
      'search',
      'sortOrder',
      'sortBy',
      'fields',
      'page',
      'limit',
    ];
    excludingImportant.forEach((key) => delete queryObj[key]);
    if (queryObj.filter) {
      this.modelQuery = this.modelQuery.find({
        author: queryObj.filter,
      } as FilterQuery<T>);
      delete queryObj.filter;
    }
    return this;
  }

  sort() {
    const { sortBy = 'createdAt', sortOrder = 'desc' } = this.query;
    const sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
    this.modelQuery = this.modelQuery.sort(sortStr);
    return this;
  }

  select() {
    let fields = '-__v';
    if (this.query?.fields) {
      fields = (this.query.fields as string).split(',').join(' ');
    }
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
