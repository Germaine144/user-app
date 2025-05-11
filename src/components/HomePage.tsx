import { useEffect, useState } from "react";
import { User } from "../types/user";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext"; // ✅ import your added users

function HomePage() {
  const [fetchedUsers, setFetchedUsers] = useState<User[]>([]);
  const { users: addedUsers } = useUserContext(); // ✅ added users from form

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
        const data = await response.json();
        setFetchedUsers(data);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    }
    getUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">User List</h1>

      {/* API Users */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fetchedUsers.map((user) => (
          <UserCard user={user} key={`api-${user.id}`} />
        ))}
      </div>

      {/* Added Users */}
      {addedUsers.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mt-10 mb-4">Added Users</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addedUsers.map((user) => (
              <UserCard user={user} key={`added-${user.id}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function UserCard({ user }: { user: User }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Website:</strong> {user.website}</p>
      <p><strong>City:</strong> {user.address.city}</p>
      <Link to={`/users/${user.id}`}>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          View Profile
        </button>
      </Link>
    </div>
  );
}

export default HomePage;
