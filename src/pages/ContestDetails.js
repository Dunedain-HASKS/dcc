import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ContestDetails.css';
import axios from 'axios';
import baseURL from '../utils/baseURL';

const ContestDetails = () => {
  const { id } = useParams();
  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContestDetails = async () => {
      try {
        const response = await axios.get(`${baseURL}/contest/${id}`);
        setContest(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching contest details');
        setLoading(false);
      }
    };

    fetchContestDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="contest-details">
      <div className="contest-info">
        <h2>{contest.name}</h2>
        <p>Start Time: {new Date(contest.startTime).toLocaleString()}</p>
        <p>End Time: {new Date(contest.endTime).toLocaleString()}</p>
        <p>Participants: {contest.participants.length}</p>
      </div>
      <div className="questions-list">
        <h3>Questions</h3>
        <ul>
          {contest.questions.map((question) => (
            <li key={question._id}>{question.title}</li>
          ))}
        </ul>
      </div>
      <div className="leaderboard">
        <h3>Leaderboard</h3>
        <ul>
          {contest.leaderboard && contest.leaderboard.map((entry) => (
            <li key={entry.rank}>
              {entry.rank}. {entry.user.username} - {entry.score} points
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContestDetails;
