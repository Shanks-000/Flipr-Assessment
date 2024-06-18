import React, { useState } from 'react';
import UserDetails from './UserDetails';
import TopicSelection from './TopicSelection';
import QuestionDisplay from './QuestionDisplay';
import './styles.css';

const App = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [difficulty, setDifficulty] = useState('');

  return (
    <div className="App">
      {!userDetails ? (
        <UserDetails setUserDetails={setUserDetails} />
      ) : !selectedTopic ? (
        <TopicSelection setSelectedTopic={setSelectedTopic} />
      ) : !difficulty ? (
        <div>
          <label>
            Select Difficulty:
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="">Select</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <button onClick={() => setDifficulty(difficulty)}>Start Quiz</button>
        </div>
      ) : (
        <QuestionDisplay selectedTopic={selectedTopic} difficulty={difficulty} />
      )}
    </div>
  );
};

export default App;
