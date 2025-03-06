import React from 'react';
import { AlertCircleIcon, XIcon } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg max-w-md animate-slide-up z-50">
      <div className="flex items-start">
        <AlertCircleIcon className="flex-shrink-0 mr-3" size={20} />
        <div className="flex-grow">
          <p className="font-medium">Error</p>
          <p className="text-sm">{message}</p>
          {message.includes('API key') && (
            <div className="text-xs mt-2 italic space-y-1">
              <p>To use this app with your own API key:</p>
              <ol className="list-decimal list-inside pl-2">
                <li>Create a <code>.env</code> file in the project root</li>
                
                <li>Restart the development server</li>
              </ol>
              <p className="mt-1">Note: You can use the service anonymously without an API key, but generation will be slower.</p>
            </div>
          )}
          {message.includes('Kudos') && (
            <div className="text-xs mt-2 italic space-y-1">
              <ul className="list-disc list-inside pl-2">
                <li>New accounts start with limited kudos</li>
                <li>Kudos regenerate over time</li>
                <li>Try generating smaller images (384x384) which cost fewer kudos</li>
              </ul>
            </div>
          )}
        </div>
        <button 
          onClick={onDismiss} 
          className="flex-shrink-0 ml-2 text-red-500 hover:text-red-700"
        >
          <XIcon size={18} />
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;