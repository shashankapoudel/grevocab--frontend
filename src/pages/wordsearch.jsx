
import { useState } from 'react';

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
            const res = await fetch(`http://localhost:5000/api/wordic?word=${word}`);
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
        <div className="flex flex-col  justify-center items-center w-full h-screen bg-[#FAF8FF]">
            <div className='bg-white w-1/2 h-2/3 flex flex-col justify-center items-center p-2'>

                <h1 className="text-2xl font-bold mb-4">Search for a Word</h1>
                <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
                    <input
                        type="text"
                        value={word}
                        onChange={handleWordChange}
                        placeholder="Enter a word"
                        className="border border-gray-400 px-6 py-3 w-full sm:w-96 rounded-lg"
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
                    {wordData ? (
                        <>
                            <h2 className="text-4xl font-semibold text-center">{wordData.word}</h2>
                            <p className='text-xl'><strong>Meaning:</strong> {wordData.meaning}</p>
                            <p className='text-xl'><strong>Example:</strong> {wordData.example}</p>
                            <button
                                className="bg-green-500 text-white p-2 mt-4"
                                onClick={() => speak(wordData.word)}
                            >
                                Hear Pronunciation
                            </button>
                        </>
                    ) : (
                        <p>No word found. Try searching for another word.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Wordsearch;
