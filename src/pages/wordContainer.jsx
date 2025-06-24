
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillAudio } from "react-icons/ai";
import NoteBook from "../components/NoteBook";
import SearchWordonDifficulty from "./searchWordonDifficulty";
import { Navigate, useNavigate } from "react-router-dom";

const WordContainer = () => {

    const [words, setWords] = useState([]);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [active, setActive] = useState(false);
    const user = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
    const [note, setNote] = useState('');
    const [wordDifficulty, setWordDifficulty] = useState({})
    const navigate = useNavigate()

    const getWords = async () => {
        const token = user.data.token;
        try {
            const res = await fetch('http://localhost:5000/api/words/words', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            setWords(data);
        } catch (error) {
            console.log(error, "Error occurred while fetching words");
        }
    };

    useEffect(() => {
        getWords();
    }, []);



    const fetchNoteForWord = async (currentWordIndex) => {
        const wordToAdd = words[currentWordIndex]
        // console.log(wordToAdd);

        const token = user.data.token;
        const wordId = wordToAdd._id;
        // console.log(wordId);

        try {
            const res = await fetch(`http://localhost:5000/api/word/note/${wordId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await res.json();
            if (data.data == null) {
                setNote('')
            } else {
                setNote(data.data.note)
            }
            console.log(data);

        } catch (error) {
            console.log("Error", error)
        }
    }


    // useEffect(() => {
    //     fetchNoteForWord()
    // }, [currentWordIndex])


    const handleNext = () => {
        setCurrentWordIndex((prevIndex) => {
            const newIndex = prevIndex === words.length - 1 ? prevIndex : prevIndex + 1;
            fetchNoteForWord(newIndex)
            return newIndex;
        }
        );
        setActive(false);

    };

    const handlePrevious = () => {
        setCurrentWordIndex((prevIndex) => {

            const newIndex = prevIndex === 0 ? prevIndex : prevIndex - 1;
            fetchNoteForWord(newIndex)
            return newIndex;
        }
        );
        setActive(false);
    };

    const handleStore = async () => {
        const wordToAdd = words[currentWordIndex];
        const wordId = wordToAdd._id;

        const token = user.data.token;
        try {
            const res = await fetch('http://localhost:5000/api/words/unknown', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ wordId }),
            });

            if (!res.ok) {
                console.log('Failed to add word to the server');
                toast.error("Failed to add word to the server");
            } else {
                setWords((prevWords) => {
                    return prevWords.map((word) =>
                        word._id === wordToAdd._id ? { ...word, isUnknown: true } : word
                    );
                });

                toast.success("Word added to the difficult words section!");
            }
        } catch (err) {
            console.log(err, "Error adding unknown words");
            toast.error("Error adding unknown word.");
        }
    };

    const handleToggle = () => {
        setActive(!active);
    };

    if (words.length === 0) {
        return <div>Loading words...</div>;
    }

    const speak = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            speechSynthesis.speak(utterance);
        } else {
            alert("Sorry, your browser does not support text-to-speech!");
        }
    };

    const handleDifficulty = async (difficulty) => {
        const wordToAdd = words[currentWordIndex]
        const wordId = wordToAdd._id;
        console.log(wordToAdd);
        setWordDifficulty((prev) => ({
            ...prev,
            [wordId]: difficulty
        }))
        const token = user.data.token;
        try {
            const res = await fetch('http://localhost:5000/api/word/difficulty', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ wordId, difficulty })
            })
            toast.success(`Word added to the ${difficulty} section`);
        } catch (error) {
            toast.error("Error adding unknown word.");
        }
    }

    const handleClick = () => {
        navigate('/wordcontainer/difficulty', { state: { words: words } })
    }

    const handleGeneralUser = () => {
        navigate('/wordcontainer/users-difficulty', { state: { words: words } })
    }

    return (
        <div className="bg-white text-white p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col items-center justify-center h-screen min-h-[120vh]  relative">
            <div className="absolute flex flex-col sm:flex-row gap-8 top-5 text-blue-400 text-sm sm:text-sm lg:text-xl">
                <button
                    onClick={handleClick}
                    className="underline  hover:text-blue-700 focus:text-blue-700">
                    Click  to check for words based on the difficulty you have chosen
                </button>
                <button
                    onClick={handleGeneralUser}
                    className="underline  hover:text-blue-700 focus:text-blue-700">
                    Click to check for words based on difficulty for general users
                </button>
            </div>

            <div className="text-center max-w-4xl w-full min-h-[500px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[650px] 
             bg-[#FAF8FF] flex items-center flex-col justify-center relative rounded-lg shadow-2xl border-none border p-2 ">
                <div className="flex">
                    <h1 className=" sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-10 text-orange-400 flex justify-center items-center">
                        <span className="lg:text-5xl sm:text-2xl">({currentWordIndex + 1})</span> Word: {words[currentWordIndex].word}
                    </h1>
                    <button
                        className="p-2 mb-7 text-orange-300"
                        onClick={() => speak(words[currentWordIndex].word)}
                    >
                        <AiFillAudio className="text-2xl" />
                    </button>
                </div>
                <p className="cursor-pointer mb-5 text-gray-500" onClick={handleToggle}>
                    {active ? 'Hide meaning and sentence' : 'Show meaning and sentence'}
                </p>
                {active && (
                    <div className="flex flex-col justify-center items-center w-full py-3">
                        <p className="text-lg sm:text-xl md:text-2xl mb-6 w-full sm:w-3/4 md:w-2/3 mx-auto text-gray-500">
                            <span className="text-orange-500">Meaning:</span> {words[currentWordIndex].meaning}
                        </p>
                        <p className="text-lg sm:text-xl md:text-2xl mb-6 w-full sm:w-3/4 md:w-2/3 mx-auto text-gray-500">
                            <span className="text-orange-500">Sentence:</span> {words[currentWordIndex].sentence}
                        </p>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row justify-between w-2/3 sm:w-2/3 gap-2 sm:gap-2 mb-6 sm:m-6">
                    <button
                        onClick={handlePrevious}
                        className="bg-orange-200 text-gray-600 font-semibold py-2 px-4 rounded-lg text-sm sm:text-base md:text-lg hover:bg-yellow-400 transition duration-300"
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        className="bg-orange-200 text-gray-600 font-semibold py-2 px-4 rounded-lg text-sm sm:text-base md:text-lg hover:bg-yellow-400 transition duration-300"
                    >
                        Next
                    </button>
                    <button
                        className="bg-orange-200 text-gray-600 font-semibold py-2 px-4 rounded-lg text-sm sm:text-base md:text-lg hover:bg-yellow-400 transition duration-300 w-full sm:w-auto"
                        onClick={handleStore}
                    >
                        I did not know this word
                    </button>
                </div>


                <div className="absolute bottom-2 lg:bottom-4 sm:bottom-2 right-2 flex gap-8 ">
                    <button
                        onClick={() => handleDifficulty('easy')}
                        className="bg-orange-100 text-gray-600 border-black font-medium py-1 px-4 rounded-lg hover:bg-orange-200 ">
                        Easy
                    </button>
                    <button
                        onClick={() => handleDifficulty('medium')}
                        className="bg-orange-100 text-gray-600 border-black font-medium py-1 px-4 rounded-lg hover:bg-orange-200">
                        Medium
                    </button>
                    <button
                        onClick={() => handleDifficulty('hard')}
                        className="bg-orange-100 text-gray-600 border-black font-medium py-1 px-4 rounded-lg hover:bg-orange-200">
                        Hard
                    </button>
                </div>

            </div>

            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                draggable
                pauseOnHover />

            <div className="absolute bottom-10 right-14 lg:top-10 lg:right-10 bg-white sm: flex sm:items-center">
                <NoteBook
                    note={note}
                    setNote={setNote}
                    words={words}
                    currentWordIndex={currentWordIndex}
                    user={user}
                    toast={toast}
                    ToastContainer={ToastContainer}
                    fetchNoteForWord={fetchNoteForWord}
                />
            </div>
        </div>

    );
};

export default WordContainer;

