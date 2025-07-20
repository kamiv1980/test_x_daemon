import { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';
import * as React from "react";

export type ToastType = 'success' | 'error';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type,
  onClose,
  duration = 3000
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColor = type === 'success' ? 'bg-green-50' : 'bg-red-50';
  const borderColor = type === 'success' ? 'border-green-200' : 'border-red-200';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const iconColor = type === 'success' ? 'text-green-400' : 'text-red-400';

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-sm w-full ${bgColor} ${borderColor} border rounded-lg shadow-lg p-4 transition-all duration-300 ease-in-out`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {type === 'success' ? (
            <CheckCircle className={`h-5 w-5 ${iconColor}`} aria-hidden="true" />
          ) : (
            <XCircle className={`h-5 w-5 ${iconColor}`} aria-hidden="true" />
          )}
        </div>
        <div className="ml-3 flex-1">
          <p className={`text-sm font-medium ${textColor}`}>
            {message}
          </p>
        </div>
        <div className="ml-4 flex-shrink-0">
          <button
            type="button"
            className={`inline-flex ${textColor} hover:${textColor.replace('800', '600')} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600 rounded-md`}
            onClick={onClose}
            aria-label="Close notification"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
