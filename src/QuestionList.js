import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [comment, setComment] = useState({}); // Store comment inputs for each question

  // Fetch questions from the server
  const fetchQuestions = async () => {
    try {
      const response = await axios.get('https://student-advice-post-server.onrender.com/api/questions', {
        headers: {
          'authorization': `${localStorage.getItem('token')}` // Include the token for protected routes
        }
      });
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  // Handle deleting a question
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://student-advice-post-server.onrender.com/api/questions/${id}`, {
        headers: {
          'authorization': `${localStorage.getItem('token')}` // Include the token for protected routes
        }
      });
      setQuestions(questions.filter(question => question._id !== id)); // Remove the deleted question from the state
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  // Handle submitting a new question
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://student-advice-post-server.onrender.com/api/questions', { question: newQuestion }, {
        headers: {
          'authorization': `${localStorage.getItem('token')}` // Include the token for protected routes
        }
      });
      setQuestions([...questions, response.data]); // Add the new question to the state
      setNewQuestion(''); // Clear the input field
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  // Handle submitting a new comment
  const handleCommentSubmit = async (e, questionId) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://student-advice-post-server.onrender.com/api/questions/${questionId}/comments`, {
        comment: comment[questionId], // Pass the comment for the specific question
      }, {
        headers: {
          'authorization': `${localStorage.getItem('token')}` // Include the token for protected routes
        }
      });
      // Update the comments for the question
      setQuestions(questions.map(question => 
        question._id === questionId ? { ...question, comments: [...question.comments, response.data] } : question
      ));
      setComment({ ...comment, [questionId]: '' }); // Clear the comment input
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  useEffect(() => {
    fetchQuestions(); // Fetch questions when the component is mounted
  }, []);

  return (
    <div>
      <h2>Questions</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Ask a new question"
          required
        />
        <button type="submit">Ask Question</button>
      </form>
      <ul>
        {questions.map((q) => (
          <li key={q._id}>
            <p>{q.question}</p>
            <button onClick={() => handleDelete(q._id)}>Delete</button>

            {/* Render comments */}
            <ul>
              {q.comments && q.comments.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
            </ul>

            {/* Comment form */}
            <form onSubmit={(e) => handleCommentSubmit(e, q._id)}>
              <input
                type="text"
                value={comment[q._id] || ''}
                onChange={(e) => setComment({ ...comment, [q._id]: e.target.value })}
                placeholder="Add a comment"
                required
              />
              <button type="submit">Submit Comment</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
