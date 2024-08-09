import axios from "axios";
import baseURL from "../utils/baseURL";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Problems.css';

const Problems = () => {

    const [questions, setQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`${baseURL}/question/all`);
                setQuestions(response.data);
                setFilteredQuestions(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching questions:', error);
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setFilteredQuestions(
            questions.filter(question =>
                question.title.toLowerCase().includes(e.target.value.toLowerCase())
            )
        );
    };

    return (
        <div className="problems-page">
            <h1>Explore Problems</h1>
            <input 
                type="text"
                value={search}
                onChange={handleSearch}
                className="search-bar"
                placeholder="Search problems by name..."
            />
            {loading ? (
                <h2>Loading...</h2>
            ) : (
                <div className="problems-list">
                    {filteredQuestions.length ? (
                        filteredQuestions.map((question, index) => (
                            <Link to={`/problems/${question._id}`} key={index} className="problem-card">
                                <h3>{question.title}</h3>
                            </Link>
                        ))
                    ) : (
                        <h2>No problems found</h2>
                    )}
                </div>
            )}
        </div>
    );
};

export default Problems;
