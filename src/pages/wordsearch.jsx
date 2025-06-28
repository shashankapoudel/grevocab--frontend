
import { useState } from 'react';
import BASE_URL from '../config/api';

const Wordsearch = () => {
    const [word, setWord] = useState('');
    const [wordData, setWordData] = useState(null);
    const [error, setError] = useState(null);


    const handleWordChange = (e) => {
        setWord(e.target.value);
        setWordData(null)
    };


    const fetchWordData = async () => {
        try {
            const res = await fetch(`${BASE_URL}/wordic?word=${word}`);
            const data = await res.json();

            if (res.ok) {
                setWordData(data);
                setError(null);
            } else {
                setWordData(null);
                setError('Word not found or API issue');
            }

        } catch (err) {
            console.error("Error fetching word data:", err);
            setError('An error occurred while fetching the data.');
        }
    };

    const speak = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';  // Set language as English
            speechSynthesis.speak(utterance);
        } else {
            alert("Sorry, your browser does not support text-to-speech!");
        }
    };

    return (
        <div className="flex flex-col  justify-center items-center w-full min-h-screen bg-[#6B7280] p-2 md:p-4">
            <div className='bg-[#1E1E2F] text-[#FFFFFF] w-full lg:w-1/2 min-h-screen md:min-h-96 h-full flex flex-col justify-center items-center p-2 rounded-md'>

                <h1 className="text-2xl md:text-3xl lg:text-2xl lg:tect font-bold mb-4">Search for a Word</h1>
                <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
                    <input
                        type="text"
                        value={word}
                        onChange={handleWordChange}
                        placeholder="Enter a word"
                        className="border border-gray-400 text-[#111111] px-6 py-3 w-full sm:w-96 rounded-lg"
                    />
                    <button
                        onClick={fetchWordData}
                        className="border bg-blue-500 text-white px-7 py-2 rounded-lg hover:bg-white hover:text-black transition-all w-full sm:w-auto hover:border-black"
                    >
                        Search
                    </button>
                </div>

                <div className="mx-4 mt-10 py-2 gap-2">
                    {error && <p className="text-red-500">{error}</p>}
                    {wordData && (
                        <div className='flex flex-col items-center justify-center '>
                            <div className='flex flex-col gap-3'>
                                <h2 className="text-4xl font-semibold text-center capitalize">{wordData.word}</h2>
                                <p className='text-base text-center'><strong>Meaning:</strong> {wordData.meaning}</p>
                                <p className='text-base text-center'><strong>Example:</strong> {wordData.example}</p>
                            </div>
                            <button
                                className="bg-[#374151] text-[#FFFFFF] hover:bg-[#4B5563] p-2 mt-4"
                                onClick={() => speak(wordData.word)}
                            >
                                Hear Pronunciation
                            </button>
                        </div>
                    )}

                    {!wordData &&

                        < p > Try searching for  word.</p>
                    }

                </div>
            </div>
        </div >
    );
};

export default Wordsearch;
