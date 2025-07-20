import {useState} from "react";
import { FileText } from 'lucide-react';
import type { Log } from '../types/log';
import { LogRow } from './LogRow';
import { LoadingSpinner } from './LoadingSpinner';
import { ConfirmationModal } from './ConfirmationModal';

interface LogsTableProps {
  logs: Log[];
  loading: boolean;
  onEdit: (log: Log) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const LogsTable: React.FC<LogsTableProps> = ({
  logs,
  loading,
  onEdit,
  onDelete,
}) => {
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; logId: string | null }>({
    isOpen: false,
    logId: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (logId: string) => {
    setDeleteModal({ isOpen: true, logId });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.logId) return;

    try {
      setIsDeleting(true);
      await onDelete(deleteModal.logId);
      setDeleteModal({ isOpen: false, logId: null });
    } catch (error) {
      // Error handling is done in parent component
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, logId: null });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
        <span className="ml-3 text-gray-600">Loading...</span>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200">

      {logs.length === 0 ? (
        <div className="text-center py-16">
          <FileText className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No logs found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating your first log entry.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-2 py-4 text-left text-xs md:text-base font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Owner
                </th>
                <th
                  scope="col"
                  className="px-2 py-4 text-left text-xs md:text-base font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell"
                >
                  Created At
                </th>
                <th
                  scope="col"
                  className="px-2 py-4 text-left text-xs md:text-base font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell"
                >
                  Updated At
                </th>

                <th className="p-2 sm:hidden">
                </th>
                <th
                  scope="col"
                  className="px-2 py-4 text-left text-xs md:text-base font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Log Text
                </th>
                <th
                  scope="col"
                  className="px-2 py-4 text-left text-xs md:text-base font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log) => (
                <LogRow
                  key={log.id}
                  log={log}
                  onEdit={onEdit}
                  onDelete={handleDeleteClick}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Log Entry"
        message="Are you sure you want to delete this log entry? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
      />
    </div>
  );
};
