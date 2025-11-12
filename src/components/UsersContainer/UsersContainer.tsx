import { useState, useMemo, useTransition  } from 'react';
import type { User } from '../../types/user.types';
import { UsersTable } from '../UsersTable/UsersTable';
import { SearchFilters } from '../SearchFilters/SearchFilters';

interface UsersContainerProps {
  users: User[];
}

export const UsersContainer = ({ users }: UsersContainerProps) => {
  // Render Counter
 
  const [searchTerm, setSearchTerm] = useState('');
  const [isPending, startTransition] = useTransition();

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;

    const lowerSearchTerm = searchTerm.toLowerCase();
    return users.filter((user) => {
      return (
        user.name.toLowerCase().includes(lowerSearchTerm) ||
        user.username.toLowerCase().includes(lowerSearchTerm) ||
        user.email.toLowerCase().includes(lowerSearchTerm) ||
        user.phone.toLowerCase().includes(lowerSearchTerm) ||
        user.website.toLowerCase().includes(lowerSearchTerm) ||
        user.address.city.toLowerCase().includes(lowerSearchTerm) ||
        user.company.name.toLowerCase().includes(lowerSearchTerm)
      );
    });
  }, [users, searchTerm]);

  const handleSearch = (value: string) => {
    startTransition(() => {
      setSearchTerm(value);
    });
  };

  return (
    <>
      <SearchFilters onSearch={handleSearch} />

      <div className="mb-4 text-sm text-gray-600">
        {isPending ? (
          <span className="text-blue-600">Searching...</span>
        ) : (
          <span>
            Showing {filteredUsers.length} of {users.length} users
          </span>
        )}
      </div>

      <div className={isPending ? 'opacity-50 pointer-events-none transition-opacity' : 'transition-opacity'}>
        <UsersTable users={filteredUsers} />
      </div>
    </>
  );
};
