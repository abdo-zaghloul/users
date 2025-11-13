import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { User } from '../types/user.types';
import { LoadingSpinner } from '../components/LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage/ErrorMessage';

export const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<User>(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!user) return <ErrorMessage message="User not found" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <i className="fas fa-arrow-left"></i>
          <span>Back to Users</span>
        </button>

        {/* User Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-600 to-gray-700 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">{user?.name}</h1>
            <p className="text-blue-100 mt-1">@{user?.username}</p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="fas fa-address-card text-blue-600"></i>
                  Contact Information
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <i className="fas fa-envelope text-gray-400 mt-1"></i>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a
                        href={`mailto:${user?.email}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {user?.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="fas fa-phone text-gray-400 mt-1"></i>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-900">{user.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="fas fa-globe text-gray-400 mt-1"></i>
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      <a
                        href={`https://${user?.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {user?.website}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="fas fa-map-marker-alt text-blue-600"></i>
                  Address
                </h2>
                <div className="space-y-2">
                  <p className="text-gray-900">{user?.address?.street}</p>
                  <p className="text-gray-900">{user?.address?.suite}</p>
                  <p className="text-gray-900">{user?.address?.city}</p>
                  <p className="text-gray-600">{user?.address?.zipcode}</p>
                  <p className="text-sm text-gray-500 mt-3">
                    Coordinates: {user?.address?.geo?.lat}, {user?.address?.geo.lng}
                  </p>
                </div>
              </div>

              {/* Company */}
              <div className="md:col-span-2">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="fas fa-building text-blue-600"></i>
                  Company
                </h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {user?.company?.name}
                  </h3>
                  <p className="text-gray-600 italic mt-1">
                    "{user?.company?.catchPhrase}"
                  </p>
                  <p className="text-sm text-gray-500 mt-2">{user?.company?.bs}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
