import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function EditPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    axios
      .get(`https://blog-hbjq.onrender.com/api/posts/${slug}`)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
        setCategory(res.data.category || '');
        setImage(res.data.image || '');
      })
      .catch((err) => {
        console.error('Failed to fetch post:', err);
        alert('Could not load post.');
        navigate('/');
      });
  }, [slug, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://blog-hbjq.onrender.com/api/posts/${slug}`,
        { title, content, category, image },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      navigate('/');
    } catch (err) {
      console.error('Update failed:', err);
      alert('You are not authorized to update this post.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-xl mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Edit Blog Post</h2>
      <form onSubmit={handleUpdate} className="space-y-5">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Title"
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="">Select Category</option>
          <option value="Tech">Tech</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="News">News</option>
        </select>

        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
          <ReactQuill value={content} onChange={setContent} className="h-64" />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition duration-300"
        >
          ✅ Update Post
        </button>
      </form>
    </div>
  );
}
