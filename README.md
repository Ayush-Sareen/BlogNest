# 📰 Blog Website – Admin-Only Post Management System

🚀 Live Demo: [https://blogwwwebsite.netlify.app](https://blogwwwebsite.netlify.app)

## 📺 Demo Video

[![Watch on YouTube](https://img.youtube.com/vi/HelEk3rZkwE/0.jpg)](https://www.youtube.com/watch?v=HelEk3rZkwE)

> Click the thumbnail above or [watch the full demo here](https://www.youtube.com/watch?v=HelEk3rZkwE)


login credentials ->
- username -> admin
- password -> admin123

## 📌 Project Overview

This is a **full-stack Blog Management System** where only the **admin** can create, update, or delete posts, while all other users can view posts publicly. The system is secured using JWT authentication and uses a clean, modern UI with category support, images, and rich text formatting.

---

## ✨ Features

### ✅ Public Users
- View all blog posts on the homepage.
- View individual blog posts via dynamic slugs.
- Posts display image, title, category, and formatted content.

### ✅ Admin Panel
- 🔒 **Secure Login:** Only an authenticated admin can access Create/Edit/Delete.
- 📝 **Create Post:** Add title, content (using React-Quill), category, and image URL.
- ✏️ **Edit Post:** Update blog posts with rich-text content.
- 🗑️ **Delete Post:** Permanently remove blog entries.
- 🧠 **SEO-friendly URLs:** Slugs are automatically generated from the title.
- 🔍 **Category tagging:** Choose from predefined categories like Tech, News, Lifestyle.

---

## 🛠️ Tech Stack

### 🖥️ Frontend (Hosted on Netlify)
- **React.js** (with Vite)
- **React Router DOM** for navigation
- **React-Quill** for rich-text editing
- **Tailwind CSS** for responsive styling
- **Axios** for API requests
- **JWT (via localStorage)** for admin auth handling

### 🧪 Backend (Hosted on Render)
- **Express.js** for RESTful API
- **MongoDB Atlas** for cloud database
- **Mongoose** for schema management
- **JWT** for authentication
- **Slugify** to create SEO-friendly slugs
- **CORS** and `dotenv` for environment handling

---

## 📁 Folder Structure
```
/client # React frontend
└── pages/
├── Home.jsx
├── Post.jsx
├── CreatePost.jsx
├── EditPost.jsx
└── Login.jsx

/server # Express backend
├── routes/
├── posts.js
└── auth.js
├── models/
└── Post.js
└── middleware/
└── auth.js
```
---

## 🔐 Admin Credentials

- Username: admin
- Password: admin123

---

## 🔗 Deployment

### 🌍 Frontend
- Hosted on **Netlify**

### ⚙️ Backend
- Hosted on **Render**
- All API requests are proxied via Vite config (`/api` routes).

---

### 👨‍💻 Developed By
- Ayush Sareen
- Email: ayushsareen13@gmail.com
- LinkedIn: linkedin.com/in/ayush-sareen
- Potfolio: https://ayushsareen.netlify.app/
