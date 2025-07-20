import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';

interface LogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { owner: string; logText: string }) => Promise<void>;
}

export const LogModal: React.FC<LogModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    owner: '',
    logText: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.owner.trim() || !formData.logText.trim()) return;

    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      setFormData({ owner: '', logText: '' });
      onClose();
    } catch (error) {
      // Error handling is done in parent component
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ owner: '', logText: '' });
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        onClick={handleBackdropClick}
      >
        <div
          className="fixed inset-0 bg-gray-500 opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="bg-white rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              onClick={handleClose}
              disabled={isSubmitting}
              aria-label="Close modal"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3
                className='text-lg leading-6 font-medium text-blue-600'
                id="modal-title"
              >
                Add New Log Entry
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Create a new log entry with owner and description details.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="owner"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Owner <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="owner"
                  value={formData.owner}
                  onChange={(e) =>
                    setFormData({ ...formData, owner: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors duration-200"
                  placeholder="Enter owner name"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="logText"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Log Text <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="logText"
                  value={formData.logText}
                  onChange={(e) =>
                    setFormData({ ...formData, logText: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none transition-colors duration-200"
                  rows={4}
                  placeholder="Enter log details and description"
                  disabled={isSubmitting}
                  required
                />
              </div>
            </div>

            <div className="mt-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  !formData.owner.trim() ||
                  !formData.logText.trim()
                }
                className='w-full inline-flex justify-center items-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    {'Creating...'}
                  </>
                ) : (
                  <>
                      <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
                    {'Create Log'}
                  </>
                )}
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
