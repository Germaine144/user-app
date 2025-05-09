import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Define the User type
interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
  address: {
    city: string;
  };
}

function HomePage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
        const data = await response.json();
        setUsers(data); // Store fetched data in state
      } catch (error) {
        console.error('Error fetching users', error);
      }
    }
    getUsers();
  }, []);

  return (
    <div>
      <h1>User List</h1>
      {users.map((user) => (
        <div key={user.id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Website:</strong> {user.website}</p>
          <p><strong>City:</strong> {user.address.city}</p>
          <Link to={`/users/${user.id}`}>View Profile</Link>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
