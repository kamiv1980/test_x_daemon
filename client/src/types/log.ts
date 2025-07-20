export interface Log {
  id: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  logText: string;
}

export interface CreateLogRequest {
  owner: string;
  logText: string;
}

export interface UpdateLogRequest {
  owner?: string;
  logText?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
