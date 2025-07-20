import { useState } from 'react';
import { useLogs } from '../hooks/useLogs';
import { Header } from './Header';
import { LogsTable } from './LogsTable';
import { Pagination } from './Pagination';
import { Toast } from './Toast';
import type { ToastType } from './Toast';
import { LogModal } from './LogModal';
import type { Log } from '../types/log';

interface ToastState {
  message: string;
  type: ToastType;
  id: number;
}

export const LogsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const [showModal, setShowModal] = useState(false);
  const { logs, loading, totalPages, total, createLog, updateLog, deleteLog } = useLogs(currentPage, 10);

  const showToast = (message: string, type: ToastType) => {
    const id = Date.now();
    setToasts(prev => [...prev, { message, type, id }]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleAddLog = () => {
    setShowModal(true);
  };

  const handleEditLog = async(log: Log) => {
    try {
        await updateLog(log.id, {owner: log.owner, logText: log.logText});
        showToast('Log entry updated successfully', 'success');
    } catch (error) {
      showToast('Failed to update log entry', 'error');
      throw error;
    }
  };

  const handleModalSubmit = async (data: { owner: string; logText: string }) => {
    try {
      await createLog(data);
      showToast('Log entry created successfully', 'success');
      setShowModal(false);
    } catch (error) {
      showToast('Failed to create log entry', 'error');
      throw error;
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleDeleteLog = async (id: string) => {
    try {
      await deleteLog(id);
      showToast('Log entry deleted successfully', 'success');
    } catch (error) {
      showToast('Failed to delete log entry', 'error');
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header onAddLog={handleAddLog} totalLogs={total} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <LogsTable
            logs={logs}
            loading={loading}
            onEdit={handleEditLog}
            onDelete={handleDeleteLog}
          />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </main>

      <LogModal
        isOpen={showModal}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />

      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};
