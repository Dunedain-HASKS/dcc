import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';
import './AddProblem.css';
import baseURL from '../utils/baseURL';
import Select from 'react-select';


const AddProblem = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [constraints, setConstraints] = useState('');
  const [testCases, setTestCases] = useState([{ input: '', output: '', explanation: '', isSample: false, showExplanation: false }]);
  const tagOptions = [
    { value: 'array', label: 'Array' },
    { value: 'dp', label: 'Dynamic Programming' },
    { value: 'linkedlist', label: 'Linked List' },
    { value: 'string', label: 'String' },
    // Add more tags as needed
  ];
  const [selectedTags, setSelectedTags] = useState([]);
  


const [difficulty, setDifficulty] = useState('easy');




  const handleAddTestCase = () => {
    setTestCases([...testCases, { input: '', output: '', explanation: '', isSample: false, showExplanation: false }]);
  };

  const handleRemoveTestCase = (index) => {
    if (testCases.length > 1) {
      const newTestCases = testCases.filter((_, idx) => idx !== index);
      setTestCases(newTestCases);
    } else {
      alert('At least one test case is required.');
    }
  };

  const handleTestCaseChange = (index, field, value) => {
    const newTestCases = [...testCases];
    newTestCases[index][field] = value;
    setTestCases(newTestCases);
  };

  const toggleExplanation = (index) => {
    const newTestCases = [...testCases];
    newTestCases[index].showExplanation = !newTestCases[index].showExplanation;
    setTestCases(newTestCases);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const questionData = {
      title,
      description,
      constraints,
      testCases,
      tags: selectedTags.map(tag => tag.value), // Extract values from selected tags
      difficulty
    };
  
    console.log(JSON.stringify(questionData, null, 2)); // Add this line to print the object
  
    try {
      
      await axios.post(`${baseURL}/api/question/new-question`, questionData);
      alert('Question added successfully');
      // Reset form
      setTitle('');
      setDescription('');
      setConstraints('');
      setTestCases([{ input: '', output: '', explanation: '', isHidden: false, showExplanation: false }]);
      setSelectedTags([]);
      setDifficulty('easy');
    } catch (error) {
      console.error('Error adding question:', error);
      alert('Failed to add question');
    }
  };
  

  return (
    <div className="container add-question-page">
      <div className="problem-home-banner">
        <h1>Add New Question</h1>
      </div>
      <div className="problem-home-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <MDEditor
              value={description}
              onChange={setDescription}
            />
          </div>
          
         
          <div className="form-group">
            <label>Test Cases:</label>
            {testCases.map((testCase, index) => (
              <div key={index} className="test-case">
                <div className="form-group">
                  <label htmlFor={`input-${index}`}>Input:</label>
                  <textarea
                    id={`input-${index}`}
                    className="form-control"
                    value={testCase.input}
                    onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`output-${index}`}>Output:</label>
                  <textarea
                    id={`output-${index}`}
                    className="form-control"
                    value={testCase.output}
                    onChange={(e) => handleTestCaseChange(index, 'output', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={testCase.isSample}
                      onChange={(e) => handleTestCaseChange(index, 'isSample', e.target.checked)}
                    />
                    Use as Sample Test Case
                  </label>
                </div>
                <div className="form-group">
                  <button type="button" className="btn toggle-explanation-button" onClick={() => toggleExplanation(index)}>
                    {testCase.showExplanation ? 'Hide Explanation' : 'Add Explanation'}
                  </button>
                  {testCase.showExplanation && (
                    <div className="form-group">
                      <label htmlFor={`explanation-${index}`}>Explanation:</label>
                      <MDEditor
                        value={testCase.explanation}
                        onChange={(value) => handleTestCaseChange(index, 'explanation', value)}
                      />
                    </div>
                  )}
                </div>
                <button type="button" className="btn remove-test-case-button" onClick={() => handleRemoveTestCase(index)}>Remove Test Case</button>
              </div>
            ))}
            <button type="button" className="btn cta-button" onClick={handleAddTestCase}>Add Test Case</button>
          </div>
          <div className="form-group">
            <label htmlFor="constraints">Constraints:</label>
            <MDEditor
              value={constraints}
              onChange={setConstraints}
            />
          </div>
          
  <div className="form-group">
  <label htmlFor="tags">Tags:</label>
  <Select
    id="tags"
    options={tagOptions}
    isMulti
    value={selectedTags}
    onChange={setSelectedTags}
    placeholder="Select tags"
  />
</div>

<div className="form-group">
  <label htmlFor="difficulty">Difficulty:</label>
  <select 
    id="difficulty" 
    value={difficulty} 
    onChange={(e) => setDifficulty(e.target.value)}
  >
    <option value="easy">Easy</option>
    <option value="medium">Medium</option>
    <option value="hard">Hard</option>
  </select>
</div>
          <button  type="submit" className="btn cta-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddProblem;
