import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import ViewPost from './pages/ViewPost';
import Login from './pages/Login';
import { useEffect, useState } from 'react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
  const token = localStorage.getItem('token');
  setIsLoggedIn(!!token);
}, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="max-w-5xl mx-auto p-4">
        <nav className="flex justify-between items-center mb-6 bg-gray-400 p-4 rounded shadow-2xl">
          <Link to="/" className="text-2xl font-bold">My Blog</Link>
          <div className="space-x-2">
            {isLoggedIn && <Link to="/create" className="bg-blue-600 text-white px-4 py-2 rounded">New Post</Link>}
            {!isLoggedIn ? (
              <Link to="/login" className="text-blue-600 font-semibold">Login</Link>
            ) : (
              <button onClick={handleLogout} className="text-red-500 font-semibold">Logout</button>
            )}
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:slug" element={<EditPost />} />
          <Route path="/post/:slug" element={<ViewPost />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </div>
    </Router>
  );
}
