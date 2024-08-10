import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ContestDetails.css';
import axios from 'axios';
import baseURL from '../utils/baseURL';
import { useNavigate, Link } from 'react-router-dom';
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

  useEffect(() => {
    const learBoard = async () => {
      try {
        const response = await axios.get(`${baseURL}/contest/${id}/leaderboard`);
        console.log(response);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };
    learBoard();
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
              <li key={question._id}>
                <Link to={`/contests/${id}/${question._id}`}>{question.title}</Link>
              </li>
            ))}
          </ul>
      </div>
      <div className="leaderboard">
        <h3>Leaderboard</h3>
        {/* <ul>
          {contest.leaderboard.map((user, index) => (
            <li key={user.username}>
              {index + 1}. {user.username} - {user.solved} questions solved
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default ContestDetails;


