import React, { useState } from 'react';
import axios from 'axios';

const PostForm = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://student-advice-post-server.onrender.com/api/posts', { title, content }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Include the token in the request
        }
      });
      setTitle('');
      setContent('');
      alert('Post created successfully!');
      onPostCreated(response.data); // Notify the parent component (App.js) about the new post
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default PostForm;
