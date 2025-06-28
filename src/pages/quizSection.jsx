
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // To get the passed state
import BASE_URL from "../config/api";

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const QuizSection = () => {
    const location = useLocation();
    const questionLimit = location.state?.questionLimit || 10; // Default to 10 if not passed

    const [quizQuestions, setQuizQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [shuffledChoices, setShuffledChoices] = useState([]); // For shuffled choices
    const user = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
    console.log(user);
    // const [index, setIndex] = useState(1)


    const fetchQuiz = async () => {
        try {
            const res = await fetch(`${BASE_URL}/quiz/quizq?limit=${questionLimit}`);
            const data = await res.json();
            setQuizQuestions(data.data);
            setShuffledChoices(shuffleArray(data.data[0].choices)); // Shuffle the first question choices
        } catch (err) {
            console.error("Error fetching quiz:", err);
        }
    };

    useEffect(() => {
        fetchQuiz();
    }, [questionLimit]);

    const handleAnswerClick = (answer) => {
        if (!answered) {
            setSelectedAnswer(answer);
            setAnswered(true);

            if (answer === quizQuestions[currentQuestionIndex].correctAnswer) {
                setScore(score + 1);
            }
        }
    };

    const handleNextQuestion = () => {
        setSelectedAnswer(null);
        setAnswered(false);
        if (currentQuestionIndex === quizQuestions.length - 1) {
            setShowResults(true);
        } else {
            const nextQuestionIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextQuestionIndex);
            setShuffledChoices(shuffleArray(quizQuestions[nextQuestionIndex].choices));
        }
    };

    const handleRestartQuiz = () => {
        fetchQuiz();
        setScore(0);
        setShowResults(false);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setAnswered(false);
    };

    const saveUserScores = async (score, userId, fullmark) => {
        console.log(user);

        const token = user.data.token;
        try {
            const res = await fetch(`${BASE_URL}/score/save-score`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    score, userId, fullmark
                })
            })
            const data = await res.json()
            console.log(data);

            console.log('score saved');

        } catch (error) {
            console.log('Error saving quiz score:', error);

        }
    }

    useEffect(() => {
        const userId = user.data.user._id;
        const fullmark = quizQuestions.length;
        if (showResults) {
            saveUserScores(score, userId, fullmark)
        }

    }, [showResults])

    return (
        <div className="flex justify-center items-center w-full min-h-screen bg-[#F7F7F9] p-2">

            <div className={`flex min-h-screen justify-center items-center relative w-full p-2 lg:w-2/3 text-[#FFFFFF] ${!showResults ? 'bg-[#1E1E2F]  shadow-lg' : 'bg-white'}`}>
                {quizQuestions.length > 0 && !showResults && (
                    <div>
                        <div className="absolute  left-2 top-1 text-sm">
                            <span > Question {currentQuestionIndex + 1} of {questionLimit} </span>
                        </div>

                        <div className="flex justify-center items-center">
                            <h2 className="text-center text-red-500 font-semibold text-xl md:text-2xl lg:text-3xl">
                                {quizQuestions[currentQuestionIndex].question}
                            </h2>
                        </div>
                        <div className="flex flex-col gap-5 cursor-pointer mt-5 justify-center text-center">
                            {shuffledChoices.map((choice, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerClick(choice)}
                                    className={`border border-gray-300 px-4 py-3 text-base lg:text-lg hover:border-blue-500
                                    ${answered && choice === quizQuestions[currentQuestionIndex].correctAnswer ? 'bg-green-600 text-white' : ''} 
                                    ${answered && choice === selectedAnswer && choice !== quizQuestions[currentQuestionIndex].correctAnswer ? 'bg-red-500 text-white' : ''}`}
                                    disabled={answered}
                                >
                                    {choice}
                                </button>
                            ))}
                        </div>
                        {answered && (
                            <div className="mt-5 flex justify-center">
                                <button
                                    onClick={handleNextQuestion}
                                    className="px-4 py-2 bg-[#374151] text-[#FFFFFF] hover:bg-[#4B5563]    rounded-md"
                                >
                                    Next Question
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {showResults && (
                    <div className="bg-gray-100 flex flex-col justify-center items-center w-full lg:w-2/3 gap-10 shadow-md p-4 ">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl text-start font-semibold  text-[#111111] mb-4">Quiz Finished!</h2>
                        <p className="text-3xl text-[#111111]">
                            <span className="text-3xl font-semibold text-green-500">Your score</span>: {score} / {quizQuestions.length}
                        </p>
                        <button onClick={handleRestartQuiz} className="text-2xl border border-black p-2 rounded-lg bg-[#374151] text-[#FFFFFF] hover:bg-[#4B5563]    ">
                            Restart Quiz
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizSection;


