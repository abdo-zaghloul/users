import { useUsers } from './hooks/useUsers';
import { UsersContainer } from './components/UsersContainer/UsersContainer';
import { LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';

function App() {
  const { users, loading, error } = useUsers();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Users Management
          </h1>
        
        </div>
        <UsersContainer users={users} />
      </div>
    </div>
  );
}

export default App;
