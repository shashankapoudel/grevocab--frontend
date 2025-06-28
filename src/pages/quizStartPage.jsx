

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const QuizStartPage = () => {
    const [questionLimit, setQuestionLimit] = useState(10); // Default to 10 questions
    const navigate = useNavigate();

    const handleLimitChange = (e) => {
        setQuestionLimit(e.target.value);
    };

    const startQuiz = () => {
        // Pass questionLimit when navigating to QuizSection
        navigate('/quiz', { state: { questionLimit } });
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen w-full bg-[#F7F7F9] p-2  ">

            <div className="grid grid-cols-1 justify-center text-center items-center w-full lg:w-2/3  bg-[#FFFFFF] shadow-lg rounded-lg p-8 gap-6">
                <div>
                    <h1 data-testid="cypress-title" className="font-semibold lg:text-5xl text-3xl lg:mt-9 sm:-mt-5">Are you ready to start?</h1>
                </div>
                <div className="flex flex-col lg:flex-row justify-center items-center">
                    <label htmlFor="questionLimit" className="lg:text-2xl text-base ">Select the number of questions you want to face</label>
                    <select
                        id="questionLimit"
                        value={questionLimit}
                        onChange={handleLimitChange}
                        className="border px-3 py-2 hover:cursor-pointer hover:border-blue-500"
                    >

                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                        <option>25</option>
                        <option>35</option>
                        <option>45</option>
                        <option>50</option>
                    </select>
                </div>
                <div>
                    <button onClick={startQuiz} className="border text-2xl py-2 px-6 bottom-3 border-gray-300 mb-5 hover:border-pink-300 hover:translate-y-1 hover:text-pink-400">Start Now</button>
                </div>
            </div>
        </div>
    );
};

export default QuizStartPage;
