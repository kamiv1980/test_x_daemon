import { useState, useEffect, useCallback } from 'react';
import type { Log, UpdateLogRequest, CreateLogRequest } from '../types/log';
import {apiService} from "../services/api";

export const useLogs = (page = 1, limit = 10) => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getLogs(page, limit);
      setLogs(response.data);
      setTotalPages(response.totalPages);
      setTotal(response.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch logs');
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  const createLog = async (data: CreateLogRequest): Promise<Log> => {
    const newLog = await apiService.createLog(data);
    await fetchLogs(); // Refresh the list
    return newLog;
  };

  const updateLog = async (id: string, data: UpdateLogRequest): Promise<Log> => {
    const updatedLog = await apiService.updateLog(id, data);
    setLogs(prev => prev.map(log => log.id === id ? updatedLog : log));
    return updatedLog;
  };

  const deleteLog = async (id: string): Promise<void> => {
    await apiService.deleteLog(id);
    await fetchLogs(); // Refresh the list
  };

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return {
    logs,
    loading,
    error,
    totalPages,
    total,
    createLog,
    updateLog,
    deleteLog,
  };
};
