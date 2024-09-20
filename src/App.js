import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PostForm from './PostForm';
import PostList from './PostList';
import QuestionList from './QuestionList';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Logout from './Logout';
import ProtectedRoute from './ProtectedRoute';
import './App.css';
import axios from 'axios'; // Import axios to fetch data

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if the user is authenticated

  const [posts, setPosts] = useState([]); // State to hold posts

  // Fetch posts from the server
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/posts');
      setPosts(response.data); // Update state with fetched posts
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Delete post handler
  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/posts/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPosts(posts.filter(post => post._id !== id)); // Remove post from state
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  useEffect(() => {
    fetchPosts(); // Fetch posts when component mounts
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="image-container">
          {/* Background image */}
        </div>
        <Routes>
          <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
          
          {/* Protect the home and other routes */}
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/posts" element={<ProtectedRoute element={<PostList posts={posts} onDelete={handleDeletePost} />} />} />
          <Route path="/questions" element={<ProtectedRoute element={<QuestionList />} />} />
          <Route path="/create-post" element={<ProtectedRoute element={<PostForm onPostCreated={fetchPosts} />} />} />

          {/* Logout should always be accessible */}
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
