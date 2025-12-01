import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';

/**
 * UserList component that fetches and displays users from JSONPlaceholder API
 */
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Loading state
  if (loading) {
    return (
      <Card title="Users from API">
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">Loading users...</span>
        </div>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card title="Users from API">
        <div className="text-center py-8">
          <p className="text-red-600 dark:text-red-400 mb-4">❌ Error: {error}</p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Users from API" className="mt-8">
      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        />
      </div>

      {/* Users List */}
      {currentUsers.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-4">
          No users found
        </p>
      ) : (
        <div className="space-y-4">
          {currentUsers.map((user) => (
            <div
              key={user.id}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {user.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                📧 {user.email}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                📱 {user.phone}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                🌐 {user.website}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      {/* Stats */}
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
        Showing {currentUsers.length} of {filteredUsers.length} users
      </div>
    </Card>
  );
};

export default UserList;
