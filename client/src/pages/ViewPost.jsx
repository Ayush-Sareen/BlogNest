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

    if (!post) return <div>Loading...</div>;

    return (
        <div>
            <Helmet>
                <title>{post.title} | My Blog</title>
                <meta name="description" content={post.content.replace(/<[^>]+>/g, '').slice(0, 160)} />
            </Helmet>
            <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
            <div className="text-sm text-gray-500 mb-4">{new Date(post.createdAt).toLocaleString()}</div>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
            {post.image && <img src={post.image} alt="cover" className="w-full rounded mb-4" />}
            {post.category && <span className="text-sm text-blue-500">#{post.category}</span>}
        </div>
    );
}
