import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Student Advice Platform</h1>
      <nav>
        <ul>
          <li><Link to="/create-post">Create a Post</Link></li>
          <li><Link to="/posts">View Posts</Link></li>
          <li><Link to="/questions">View Questions</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
