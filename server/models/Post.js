import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String },
    category: { type: String },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
export default Post;
