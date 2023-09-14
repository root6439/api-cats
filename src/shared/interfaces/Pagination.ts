export interface Pagination<T> {
  offset: number;
  currentPage: number;
  totalElements: number;
  totalPages: number;
  data: T[];
  dataLength: number;
  nextPage: number;
  prevPage: number;
}

export class PaginationProperties {
  offset: number;
  page: number;
  orderBy: string;
  direction: "ASC" | "DESC";

  constructor(queryParams: any) {
    this.offset = Number(queryParams.offset);
    this.page = Number(queryParams.page);
    this.orderBy = queryParams.orderBy;
    this.direction = queryParams.direction as "ASC" | "DESC";
  }

  getData<T>(data: T[], total: number): Pagination<T> {
    const lastPage = Math.ceil(total / this.offset);
    const nextPage = this.page + 1 > lastPage ? null : this.page + 1;
    const prevPage = this.page - 1 < 1 ? null : this.page - 1;
    
    return {
      data,
      dataLength: data.length,
      totalElements: total,
      currentPage: this.page,
      nextPage: nextPage,
      prevPage: prevPage,
      totalPages: lastPage,
      offset: this.offset,
    };
  }
}
