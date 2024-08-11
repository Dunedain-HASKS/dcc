import Axios from 'axios';
import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';

import './Compiler.css';
import baseURL from '../utils/baseURL';
import CompilerHeader from './CompilerHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ContestCompiler = () => {

    const questionId = useParams().queId;
    const contestId = useParams().contestId;
    const navigate = useNavigate();

    const cppBoilerPlate = `#include<bits/stdc++.h>
using namespace std;

int main() {
    // your code goes here
    return 0;
}`;
    const [userCode, setUserCode] = useState(cppBoilerPlate);
    const [userLang, setUserLang] = useState("cpp");
    const [userTheme, setUserTheme] = useState("vs-dark");
    const [fontSize, setFontSize] = useState(20);
    const [loading, setLoading] = useState(false);

    const options = {
        fontSize: fontSize
    }

    const runSamppleTestCases = async () => {
        setLoading(true);
        try {

            toast.info('Submitting your code...');

            const response = await Axios.post(`${baseURL}/contest/${contestId}/${questionId}/run`, {
                code: userCode,
                language: userLang
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'username': localStorage.getItem('userName'),
                }
            });
            if (response.data.error)
                toast.error(response.data.error);
                
            else
                toast.success(response.data.message);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const submitCode = async () => {
        setLoading(true);
        try {

            toast.info('Submitting your code...');

            const response = await Axios.post(`${baseURL}/contest/${contestId}/${questionId}`, {
                code: userCode,
                language: userLang
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'username': localStorage.getItem('userName'),
                }
            });

            if (response.data.error)
                toast.error(response.data.error);
                
            else
                toast.success(response.data.message);
                
                setLoading(false);
                navigate(`/contests/${contestId}`);

            } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const username = localStorage.getItem('userName');
    
    useEffect(() => {
        const fetchProblem = async () => {
            try {
                setLoading(true);
                const response = await Axios.get(`${baseURL}/question/${contestId}/${questionId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'username': localStorage.getItem('userName'),
                    },
                });
                
                if (response.data.solutions.length > 0)
                {
                    for (let i = response.data.solutions.length - 1; i >= 0; i--)
                    {
                        if (response.data.solutions[i].language === userLang)
                        {
                            setUserCode(response.data.solutions[i].code);
                            break;
                        }
                    }
                }

                else
                    setUserCode(cppBoilerPlate);

                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error fetching problem:', error);
            }
        };

        fetchProblem();
    }, [questionId, cppBoilerPlate, username, userLang, contestId]);

    return (
        <div className="compiler">
                
            <CompilerHeader
                userTheme={userTheme} setUserTheme={setUserTheme}
                fontSize={fontSize} setFontSize={setFontSize}
                userLang={userLang} setUserLang={setUserLang}
                setUserCode={setUserCode}
            />
            <div className="main">
                <div className="left-container">
                    <Editor
                        options={options}
                        height="calc(100vh - 50px)"
                        width="100%"
                        theme={userTheme}
                        language={userLang}
                        value={userCode}
                        onChange={(value) => { setUserCode(value) }}
                    />
                    <button className="run-btn" onClick={() => runSamppleTestCases()}>
                        Run
                    </button>
                    <button className="submit-btn" onClick={() => submitCode()}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ContestCompiler;