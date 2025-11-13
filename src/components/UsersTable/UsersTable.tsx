import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../../types/user.types';

interface UsersTableProps {
  users: User[];
}

export const UsersTable = ({ users }: UsersTableProps) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const navigate = useNavigate();

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (users.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center text-gray-500">
        No users found matching your search criteria
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Username</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Phone</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Website</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">City</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Company</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                onClick={() => navigate(`/user/${user.id}`)}
                className={`${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } hover:bg-blue-50 transition-colors duration-100 border-b border-gray-200 cursor-pointer`}
              >
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{user?.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{user?.username}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{user?.email}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{user?.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{user?.website}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{user?.address?.city}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{user?.company?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile  Collapsible Table */}
      <div className="lg:hidden bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {users?.map((user, index) => (
            <div key={user?.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              {/* Collapsed Row */}
              <button
                onClick={() => toggleExpand(user?.id)}
                className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-100 transition-colors duration-150"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <i className={`fas fa-chevron-right text-gray-500 transition-transform duration-200 ${
                    expandedId === user?.id ? 'rotate-90' : ''
                  }`}></i>
                  <div className="text-left min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 truncate">{user?.name}</p>
                    <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                  </div>
                </div>
              </button>

              {/* Expanded Details */}
              {expandedId === user?.id && (
                <div className="px-4 pb-4 bg-white border-t border-gray-100">
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="py-3 font-semibold text-gray-700 w-32">Username</td>
                        <td className="py-3 text-gray-600">{user?.username}</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold text-gray-700">Email</td>
                        <td className="py-3 text-gray-600 break-all">{user?.email}</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold text-gray-700">Phone</td>
                        <td className="py-3 text-gray-600">{user?.phone}</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold text-gray-700">Website</td>
                        <td className="py-3 text-gray-600 break-all">{user?.website}</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold text-gray-700">City</td>
                        <td className="py-3 text-gray-600">{user?.address?.city}</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold text-gray-700">Company</td>
                        <td className="py-3 text-gray-600">{user?.company?.name}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
