export interface PaginatedResource<T> {
	page: number,
	pageSize: number,
    totalPages: number
    totalItems: number,
    data: T[],
}
