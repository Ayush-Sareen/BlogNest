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
    axios.get(`/api/posts/${slug}`)
      .then(res => {
        setTitle(res.data.title);
        setContent(res.data.content);
        setCategory(res.data.category || '');
        setImage(res.data.image || '');
      })
      .catch(err => {
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
    <div>
      <h2 className="text-xl font-bold mb-4">Edit Post</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full"
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
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}
