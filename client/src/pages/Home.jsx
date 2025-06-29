import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Home({ isLoggedIn }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('https://blog-hbjq.onrender.com/api/posts')
      .then(res => setPosts(res.data))
      .catch(err => {
        console.error('Failed to fetch posts:', err);
        setPosts([]);
      });
  }, []);

  const handleDelete = async (slug) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await axios.delete(`https://blog-hbjq.onrender.com/api/posts/${slug}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPosts(posts.filter(post => post.slug !== slug));
    } catch (err) {
      console.error('Failed to delete post:', err);
      alert('Delete failed');
    }
  };

  // Function to remove HTML tags and limit characters
  const getPreviewText = (html, maxLength = 150) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    const text = div.textContent || div.innerText || '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className='bg-[#eddcc1e5] p-4 rounded shadow-2xl mx-auto'>
      <h1 className="text-xl font-bold mb-4">All Posts</h1>
      <ul className="space-y-4">
        {posts.map(post => (
          <li key={post.slug} className="border-2 p-4 rounded-2xl">
            <Link to={`https://blog-hbjq.onrender.com/post/${post.slug}`} className="text-lg font-semibold  hover:underline">
            <div className="flex flex-col md:flex-row gap-4">
              {post.image && (
                <img src={post.image} alt="post" className="w-full md:w-[20vw] h-auto rounded" />
              )}
              <div className="flex-1">
                  {post.title}
                <div className="text-sm text-gray-500 mb-1">{new Date(post.createdAt).toLocaleString()}</div>
                <p className="text-gray-700 text-sm">{getPreviewText(post.content)}</p>
                {isLoggedIn && (
                  <div className="flex gap-4 mt-2">
                    <Link to={`https://blog-hbjq.onrender.com/edit/${post.slug}`} className="text-sm text-green-600">Edit</Link>
                    <button onClick={() => handleDelete(post.slug)} className="text-sm text-red-600">Delete</button>
                  </div>
                )}
              </div>
            </div>
            </Link>
          </li>
        ))}
        {posts.length === 0 && (
          <li className="text-gray-500">No posts available.</li>
        )}
      </ul>
    </div>
  );
}
