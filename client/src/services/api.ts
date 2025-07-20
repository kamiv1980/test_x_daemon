import type {Log, PaginatedResponse, UpdateLogRequest} from "../types/log";

const API_BASE = 'http://localhost:3001';

export interface CreateLogRequest {
  owner: string;
  logText: string;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  async getLogs(page = 1, limit = 10): Promise<PaginatedResponse<Log>> {
    return this.request<PaginatedResponse<Log>>(
      `/logs?page=${page}&limit=${limit}`
    );
  }

  async createLog(data: CreateLogRequest): Promise<Log> {
    return this.request<Log>('/logs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateLog(id: string, data: UpdateLogRequest): Promise<Log> {
    return this.request<Log>(`/logs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteLog(id: string): Promise<void> {
    return this.request<void>(`/logs/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
