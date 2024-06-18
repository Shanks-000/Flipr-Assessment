import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TopicSelection = ({ setSelectedTopic }) => {
  const [topics, setTopics] = useState([]);
  const [sortedTopics, setSortedTopics] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchTopics = async () => {
      const response = await axios.get('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-eexgfbu/endpoint/v2/list?list=show');
      setTopics(response.data);
      setSortedTopics(response.data);
    };

    fetchTopics();
  }, []);

  const handleFilter = (e) => {
    setFilter(e.target.value);
    setSortedTopics(topics.filter(topic => topic.topic.toLowerCase().includes(e.target.value.toLowerCase())));
  };

  const handleSort = () => {
    const order = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(order);
    const sorted = [...sortedTopics].sort((a, b) => order === 'asc' ? a.topic.localeCompare(b.topic) : b.topic.localeCompare(a.topic));
    setSortedTopics(sorted);
  };

  return (
    <div>
      <input type="text" value={filter} onChange={handleFilter} placeholder="Filter topics" />
      <button onClick={handleSort}>Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}</button>
      <ul>
        {sortedTopics.map((topic, index) => (
          <li key={index} onClick={() => setSelectedTopic(topic)}>
            {topic.topic} (Easy: {topic.easy}, Medium: {topic.medium}, Hard: {topic.hard}, Total: {topic.total})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicSelection;
