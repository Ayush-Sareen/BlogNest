import express from 'express';
import slugify from 'slugify';
import Post from '../models/Post.js';
import verifyAdmin from '../middleware/auth.js';

const router = express.Router();

// Create Post
router.post('/create', verifyAdmin, async (req, res) => {
  try {
    const { title, content, image, category } = req.body;
    const slug = slugify(title, { lower: true, strict: true });

    const newPost = await Post.create({ title, content, image, category, slug });
    res.status(201).json(newPost);
  } catch (err) {
    console.error('Error creating post:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get All Posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Single Post by Slug
router.get('/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Post
router.put('/:slug', verifyAdmin, async (req, res) => {
  try {
    const { title, content, image, category } = req.body;
    const slug = slugify(title, { lower: true, strict: true });

    const updated = await Post.findOneAndUpdate(
      { slug: req.params.slug },
      { title, content, image, category, slug },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Post not found for update' });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Post
router.delete('/:slug', verifyAdmin, async (req, res) => {
  try {
    await Post.findOneAndDelete({ slug: req.params.slug });
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
