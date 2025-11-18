import { useState, useMemo, useTransition } from "react";
import type { User } from "../../types/user.types";
import { UsersTable } from "../UsersTable/UsersTable";
// import { SearchFilters } from "../SearchFilters/SearchFilters";
import { SearchInput } from "../SearchInput";

interface UsersContainerProps {
  users: User[];
}

export const UsersContainer = ({ users }: UsersContainerProps) => {
  // Render Counter

  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

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
  // PAGINATION LOGIC
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  return (
    <>
      <SearchInput
        type="search"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search Users..."
        className="mb-4 border-blue-400 focus:border-blue-600"
      />
      {/* <SearchFilters onSearch={handleSearch} /> */}

      <div className="mb-4 text-sm text-gray-600">
        {isPending ? (
          <span className="text-blue-600">Searching...</span>
        ) : (
          <span>
            Showing {filteredUsers.length} of {users.length} users
          </span>
        )}
      </div>

      <div
        className={
          isPending
            ? "opacity-50 pointer-events-none transition-opacity"
            : "transition-opacity"
        }
      >
        <UsersTable users={paginatedUsers} />
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((p) => p - 1)}
        className="px-3 py-2 bg-gray-200 rounded disabled:opacity-40"
      >
        prov
      </button>

      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={`px-3 py-2 rounded ${
            currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((p) => p + 1)}
        className="px-3 py-2 bg-gray-200 rounded disabled:opacity-40"
      >
        Next
      </button>
    </>
  );
};
