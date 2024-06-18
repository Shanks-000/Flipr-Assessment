import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionDisplay = ({ selectedTopic }) => {
  const [questions, setQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get('https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/v1/list?list=show');
      setQuestions(response.data.filter(q => q.topic === selectedTopic.topic && q.difficulty === difficulty));
    };

    fetchQuestions();
  }, [selectedTopic, difficulty]);

  return (
    <div>
      <label>
        Select Difficulty:
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            {question.question}
            <ul>
              {question.options.map((option, i) => (
                <li key={i}>{option}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionDisplay;
