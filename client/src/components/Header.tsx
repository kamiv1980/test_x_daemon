import { Plus, Github } from 'lucide-react';

interface HeaderProps {
  onAddLog: () => void;
  totalLogs?: number;
}

const link = 'https://github.com/kamiv1980/test_x_daemon';

export const Header: React.FC<HeaderProps> = ({ onAddLog, totalLogs = 0 }) => {
  return (
    <header className="bg-blue-50 sticky top-0 z-50 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto py-0 sm:py-2 lg:py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div>
                <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  Log Management
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">
                  System monitoring & analytics
                </p>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex flex-col items-center">
              <div className="text-2xl font-bold text-gray-900">{totalLogs}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Total Logs</div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onAddLog}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:shadow-md active:scale-95"
              aria-label="Add new log entry"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span className="ml-2 hidden sm:inline md:hidden">Add</span>
              <span className="ml-2 hidden md:inline">Add Log</span>
            </button>

            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              aria-label="View source code on GitHub"
            >
              <Github className="w-5 h-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
