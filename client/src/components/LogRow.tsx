import { Trash2, Clock, Save } from 'lucide-react';
import type { Log } from '../types/log';
import { useEffect, useRef, useState } from 'react';
import {LoadingSpinner} from "./LoadingSpinner";

interface LogRowProps {
    log: Log;
    onEdit: (log: Log) => Promise<void>;
    onDelete: (id: string) => void;
}

export const LogRow: React.FC<LogRowProps> = ({
                                                  log,
                                                  onEdit,
                                                  onDelete,
                                              }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipRef = useRef<HTMLDivElement | null>(null);

    const [editedOwner, setEditedOwner] = useState(log.owner);
    const [editedLogText, setEditedLogText] = useState(log.logText);

    const [isUpdating, setIsUpdating] = useState(false);

    const isChanged =
        editedOwner.trim() !== log.owner.trim() ||
        editedLogText.trim() !== log.logText.trim();

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                tooltipRef.current &&
                !tooltipRef.current.contains(event.target as Node)
            ) {
                setShowTooltip(false);
            }
        };

        if (showTooltip) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showTooltip]);

    const handleSave = async() => {
        if (!isChanged) return;

        try {
            setIsUpdating(true);
            await onEdit({
                ...log,
                owner: editedOwner,
                logText: editedLogText,
                updatedAt: new Date().toISOString(),
            });
        } catch (error) {
            // Error handling is done in parent component
        } finally {
            setIsUpdating(false);
        }

    };

    return (
        <tr className="hover:bg-gray-50 transition-colors duration-150 relative">
            <td className="p-2">
                <input
                    type="text"
                    value={editedOwner}
                    onChange={(e) => setEditedOwner(e.target.value)}
                    className="text-xs md:text-sm font-medium text-gray-900 w-full bg-transparent outline-none focus:outline-none"
                />
            </td>

            {/* Hidden on small screens */}
            <td className="p-2 hidden sm:table-cell">
                <div className="text-xs md:text-sm text-gray-500">{formatDate(log.createdAt)}</div>
            </td>

            <td className="p-2 hidden sm:table-cell">
                <div className="text-xs md:text-sm text-gray-500">{formatDate(log.updatedAt)}</div>
            </td>

            {/* Visible only on small screens */}
            <td className="p-2 sm:hidden">
                <div className="relative inline-block" ref={tooltipRef}>
                    <button
                        onClick={() => setShowTooltip((prev) => !prev)}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Show timestamps"
                    >
                        <Clock className="w-4 h-4" />
                    </button>

                    {showTooltip && (
                        <div className="absolute z-10 left-0 mt-2 w-52 p-2 rounded bg-white shadow-lg border text-[11px] text-gray-700">
                            <div><strong>Created:</strong> {formatDate(log.createdAt)}</div>
                            <div><strong>Updated:</strong> {formatDate(log.updatedAt)}</div>
                        </div>
                    )}
                </div>
            </td>

            <td className="p-2">
        <textarea
            value={editedLogText}
            onChange={(e) => setEditedLogText(e.target.value)}
            className="text-xs md:text-sm text-gray-900 w-full bg-transparent outline-none resize-none focus:outline-none"
            rows={3}
        />
            </td>

            <td className="p-2">
                <div className="flex flex-col items-center justify-items-center gap-2 sm:flex-row">
                    <button
                        onClick={handleSave}
                        disabled={!isChanged || isUpdating}
                        className={`min-w-10 md:min-w-20 text-center px-2 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            isChanged
                                ? 'bg-green-100 text-green-700 hover:bg-green-200 border border-transparent focus:ring-green-500'
                                : 'bg-gray-100 text-gray-400 border border-gray-300 cursor-not-allowed'
                        }`}
                        aria-label="Save changes"
                    >
                        {isUpdating ? (
                            <LoadingSpinner size="sm" className="justify-self-center" />
                        ) : (
                            <div className="inline-flex items-center justify-items-center">
                                <Save className="block h-3 w-3" aria-hidden="true" />
                                <span className="ml-1 hidden md:inline">Save</span>
                            </div>
                            )}
                    </button>

                    <button
                        onClick={() => onDelete(log.id)}
                        className="min-w-10 md:min-w-20 px-2 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-150"
                        aria-label="Delete log"
                        disabled={isUpdating}
                    >
                        <div className="inline-flex items-center justify-items-center">
                            <Trash2 className="h-3 w-3" aria-hidden="true" />
                            <span className="ml-1 hidden md:inline">Delete</span>
                        </div>
                    </button>
                </div>
            </td>
        </tr>
    );
};
