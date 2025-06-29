import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        '/api/posts/create',
        { title, content, category, image },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      navigate('/');
    } catch (err) {
      console.error('Create post failed:', err);
      alert('Failed to create post. Please make sure you are logged in as admin.');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full"
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
          className="border p-2 rounded w-full"
        />

        <ReactQuill value={content} onChange={setContent} className="bg-white" />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Publish
        </button>
      </form>
    </div>
  );
}
