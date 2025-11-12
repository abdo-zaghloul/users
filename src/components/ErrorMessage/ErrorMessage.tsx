interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md">
        <div className="flex items-center gap-4">
          <i className="fas fa-exclamation-circle text-red-600 text-3xl"></i>
          <div>
            <h3 className="text-lg font-semibold text-red-900">Error</h3>
            <p className="text-sm text-red-700 mt-1">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
