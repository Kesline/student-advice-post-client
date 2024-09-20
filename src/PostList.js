import React from 'react';

const PostList = ({ posts = [], onDelete }) => {
  // Make sure `posts` is an array before rendering
  if (!Array.isArray(posts) || posts.length === 0) {
    return <p>No posts available.</p>;
  }

  return (
    <div>
      <h2>View Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button onClick={() => onDelete(post._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
