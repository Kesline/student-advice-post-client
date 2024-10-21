import React, { useState } from 'react';
import axios from 'axios';

const PostForm = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch the token from localStorage
      const token = localStorage.getItem('token');
      console.log(token, "here")
      // Check if the token exists before making the request
      if (!token) {
        alert('You are not authenticated. Please log in first.');
        return;
      }

      const response = await axios.post('https://student-advice-post-server.onrender.com/api/posts', 
      { title, content }, 
      {
        headers: {
          'authorization': `${token}`, // Add the Bearer token here
          'Content-Type': 'application/json'
        }
      });

      // Clear the form upon success
      setTitle('');
      setContent('');
      alert('Post created successfully!');
      onPostCreated(response.data); // Notify parent component

    } catch (error) {
      console.error('Error creating post:', error.response ? error.response.data : error.message);
      alert('Failed to create post: ' + (error.response ? error.response.data.message : error.message));
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
