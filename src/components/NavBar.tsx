import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between bg-gray-200 p-4 shadow">
      <div className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
        MyAppLogo
      </div>
      <input
        type="text"
        placeholder="Search users..."
        className="px-2 py-1 border rounded"
        disabled // Disable search if not needed
      />
      <div className="space-x-4">
        <Link to='/' className="text-blue-600 hover:underline">Home</Link>
        <Link to="/add-user" className="text-blue-600 hover:underline">Add User</Link>
      </div>
    </nav>
  );
}

export default NavBar;
