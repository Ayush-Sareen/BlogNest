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

  const getPreviewText = (html, maxLength = 150) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    const text = div.textContent || div.innerText || '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-center mb-10 text-gray-800 underline decoration-blue-500 underline-offset-8">
        Latest Blog Posts
      </h1>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {posts.map(post => (
          <div
            key={post.slug}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
          >
            <div className="block md:flex">
              <Link to={`https://blog-hbjq.onrender.com/post/${post.slug}`} className="md:w-1/3">
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post Cover"
                    className="w-full h-60 object-cover"
                  />
                )}
              </Link>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <Link to={`https://blogwwwebsite.netlify.app/post/${post.slug}`}>
                  <h2 className="text-2xl font-semibold text-blue-700 mb-2 hover:underline">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-600 text-sm mb-2">
                  {new Date(post.createdAt).toLocaleDateString()} • {post.category}
                </p>
                <p className="text-gray-800 text-sm leading-relaxed">
                  {getPreviewText(post.content)}
                </p>

                {isLoggedIn && (
                  <div className="mt-4 flex gap-4">
                    <Link
                      to={`https://blog-hbjq.onrender.com/edit/${post.slug}`}
                      className="text-sm text-green-600 hover:underline"
                    >
                      ✏️ Edit
                    </Link>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent bubbling to Link
                        handleDelete(post.slug);
                      }}
                      className="text-sm text-red-600 hover:underline"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

        ))}

        {posts.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">No posts available yet.</p>
        )}
      </div>
    </div>
  );
}
