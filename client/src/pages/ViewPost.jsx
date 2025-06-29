import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default function ViewPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`https://blog-hbjq.onrender.com/api/posts/${slug}`).then(res => setPost(res.data));
  }, [slug]);

  if (!post) {
    return (
      <div className="text-center text-gray-500 py-20 text-xl font-semibold">
        Loading post...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-10 bg-white shadow-xl rounded-2xl mt-4">
      <Helmet>
        <title>{post.title} | BlogNest</title>
        <meta
          name="description"
          content={post.content.replace(/<[^>]+>/g, '').slice(0, 160)}
        />
      </Helmet>

      {/* Post Header */}
      <h1 className="text-4xl font-extrabold text-blue-800 mb-4 text-center">{post.title}</h1>
      <div className="text-center text-sm text-gray-500 mb-6">
        {new Date(post.createdAt).toLocaleString()}
        {post.category && (
          <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
            #{post.category}
          </span>
        )}
      </div>

      {/* Post Image */}
      {post.image && (
        <img
          src={post.image}
          alt="cover"
          className="w-full max-h-[500px] object-cover rounded-xl mb-6 mx-auto"
        />
      )}

      {/* Post Content */}
      <div
        className="prose prose-lg prose-indigo max-w-none text-justify leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
