export interface ResponsePaginated<T> {
  list: T[];
  total: number;
}

export interface ResponseAdd {
  id: string;
}

export interface ResponseStatus {
  status: boolean;
}
