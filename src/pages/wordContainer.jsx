
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillAudio } from "react-icons/ai";
import NoteBook from "../components/NoteBook";
import SearchWordonDifficulty from "./searchWordonDifficulty";
import { Navigate, useNavigate } from "react-router-dom";
import BASE_URL from "../config/api";

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
            const res = await fetch(`${BASE_URL}/words/words`, {
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
            const res = await fetch(`${BASE_URL}/note/${wordId}`, {
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
            const res = await fetch(`${BASE_URL}/words/unknown`, {
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
            const res = await fetch(`${BASE_URL}/word/difficulty`, {
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
        <div className="bg-[#F7F7F9]  text-[#1F2937] p-4  md:p-8 flex flex-col items-center justify-between min-h-screen tracking-wide">

            <div className="flex flex-col md:flex-row gap-8 top-5 text-blue-400 text-sm  lg:text-base">
                <button
                    onClick={handleClick}
                    className="underline  hover:text-blue-700 text-[#374151] ">
                    Click  to check for words based on the difficulty you have chosen
                </button>
                <button
                    onClick={handleGeneralUser}
                    className="underline  hover:text-blue-700 text-[#374151] ">
                    Click to check for words based on difficulty for general users
                </button>
            </div>

            <div className="text-center max-w-4xl w-full h-2/3 bg-[#FFFFFF]  flex items-center flex-col justify-center rounded-lg shadow-2xl border-none border p-6 mt-4 ">
                <div className="flex">
                    <h1 className=" text-2xl md:text-3xl lg:text-4xl font-bold mb-10 text-[#374151] flex justify-center items-center">
                        <span className="lg:text-3xl text-2xl">({currentWordIndex + 1})</span> Word: {words[currentWordIndex].word}
                    </h1>
                    <button
                        className="p-2 mb-7 text-[#374151]"
                        onClick={() => speak(words[currentWordIndex].word)}
                    >
                        <AiFillAudio className="text-2xl" />
                    </button>
                </div>
                <p className="cursor-pointer mb-5 text-gray-500" onClick={handleToggle}>
                    {active ? 'Hide meaning and sentence' : 'Show meaning and sentence'}
                </p>
                {active && (
                    <div className="flex flex-col w-full p-3">
                        <p className="text-base md:text-2xl mb-6 w-full text-[#374151] text-center">
                            <span className="text-[#374151] font-semibold">Meaning:</span> {words[currentWordIndex].meaning}
                        </p>
                        <p className="text-base text-center md:text-2xl mb-6 w-full text-[#374151]">
                            <span className="text-[#374151] font-semibold">Sentence:</span> {words[currentWordIndex].sentence}
                        </p>
                    </div>
                )}
                <div className="flex flex-col w-full gap-8">
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-8 w-full">

                        <button
                            onClick={handlePrevious}
                            className="bg-[#374151] text-[#FFFFFF] hover:bg-[#4B5563]  font-semibold py-2 px-4 rounded-lg text-sm sm:text-base md:text-lg transition duration-300 w-full md:w-auto"
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleNext}
                            className="bg-[#374151] text-[#FFFFFF] hover:bg-[#4B5563]  font-semibold py-2 px-4 rounded-lg text-sm sm:text-base md:text-lg  transition duration-300 w-full md:w-auto"
                        >
                            Next
                        </button>
                        <button
                            className="bg-[#374151] text-[#FFFFFF] hover:bg-[#4B5563]  font-semibold py-2 px-4 rounded-lg text-sm sm:text-base md:text-lg transition duration-300 w-full md:w-auto"
                            onClick={handleStore}
                        >
                            I did not know this word
                        </button>
                    </div>

                    <div className=" flex gap-8 justify-end items-end ">
                        <button
                            onClick={() => handleDifficulty('easy')}
                            className="bg-[#374151] text-[#FFFFFF] hover:bg-[#4B5563]  border-black font-medium py-1 px-4 rounded-lg">
                            Easy
                        </button>
                        <button
                            onClick={() => handleDifficulty('medium')}
                            className="bg-[#374151] text-[#FFFFFF] hover:bg-[#4B5563]   border-black font-medium py-1 px-4 rounded-lg">
                            Medium
                        </button>
                        <button
                            onClick={() => handleDifficulty('hard')}
                            className="bg-[#374151] text-[#FFFFFF] hover:bg-[#4B5563]  border-black font-medium py-1 px-4 rounded-lg ">
                            Hard
                        </button>
                    </div>
                </div>

            </div>

            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                draggable
                pauseOnHover />

            <div className=" flex items-center mt-2 md:mt-0 w-full lg:w-1/2">
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
        </div >

    );
};

export default WordContainer;

