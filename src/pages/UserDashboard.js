import React, { useEffect, useState } from 'react';
import './UserDashboard.css';
// Mock user data
const mockUserData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  profileImage: 'https://via.placeholder.com/150',
  questionsCreated: [
    { id: 1, title: 'Two Sum' },
    { id: 2, title: 'Reverse Linked List' },
  ],
  questionsSolved: [
    { id: 3, title: 'Longest Substring Without Repeating Characters' },
    { id: 4, title: 'Valid Parentheses' },
  ]
};

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Using mock data instead of an API call
    setUserData(mockUserData);
  }, []);

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="user-dashboard">
      <div className="profile-section">
        <img src={userData.profileImage} alt="Profile" className="profile-image"/>
        <h2>{userData.name}</h2>
        <p>{userData.email}</p>
      </div>

      <div className="stats-section">
        <div className="stats">
          <h3>Questions Created</h3>
          <p>{userData.questionsCreated.length}</p>
        </div>
        <div className="stats">
          <h3>Questions Solved</h3>
          <p>{userData.questionsSolved.length}</p>
        </div>
      </div>

      <div className="questions-section">
        <h3>Questions Solved</h3>
        <ul>
          {userData.questionsSolved.map(question => (
            <li key={question.id}>
              <a href={`/question/${question.id}`}>{question.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserDashboard;
