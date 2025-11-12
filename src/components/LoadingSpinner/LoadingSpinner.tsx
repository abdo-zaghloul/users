export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <i className="fas fa-spinner fa-spin text-blue-600 text-6xl"></i>
        <p className="text-lg font-medium text-gray-700">Loading users...</p>
      </div>
    </div>
  );
};
