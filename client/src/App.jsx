import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import ViewPost from './pages/ViewPost';
import Login from './pages/Login';
import { useState } from 'react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="max-w-full mx-auto px-4 py-6 bg-gradient-to-b from-yellow-100 via-orange-100 to-pink-100 min-h-screen">
        <nav className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 mb-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-xl shadow-xl">
          <Link to="/" className="text-3xl font-bold drop-shadow-sm hover:scale-105 transition-transform duration-300 text-center md:text-left">BlogNest</Link>
          <div className="space-y-2 md:space-y-0 md:space-x-4 flex flex-col md:flex-row items-center">
            {isLoggedIn && <Link to="/create" className="bg-green-500 hover:bg-green-600 transition text-white px-4 py-2 rounded shadow w-full md:w-auto text-center">New Post</Link>}
            {!isLoggedIn ? (
              <Link to="/login" className="text-white font-semibold hover:underline w-full md:w-auto text-center">Login</Link>
            ) : (
              <button onClick={handleLogout} className="text-red-200 font-semibold hover:text-red-100 w-full md:w-auto text-center">Logout</button>
            )}
          </div>
        </nav>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <Routes>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:slug" element={<EditPost />} />
            <Route path="/post/:slug" element={<ViewPost />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
