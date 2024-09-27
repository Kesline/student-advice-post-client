import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');

  // Fetch questions from the server
  const fetchQuestions = async () => {
    try {
      const response = await axios.get('https://student-advice-post-server.onrender.com/api/questions', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Include the token for protected routes
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
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Include the token for protected routes
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
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Include the token for protected routes
        }
      });
      setQuestions([...questions, response.data]); // Add the new question to the state
      setNewQuestion(''); // Clear the input field
    } catch (error) {
      console.error('Error adding question:', error);
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
            {q.question}
            <button onClick={() => handleDelete(q._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
