import React, { useEffect } from 'react'
import BASE_URL from '../config/api';

const NoteBook = ({ note, setNote, words, currentWordIndex, user, toast, }) => {
    const handleSaveNote = async () => {
        const wordToAdd = words[currentWordIndex]
        const wordId = wordToAdd._id;
        const token = user.data.token;
        try {
            const res = await fetch(`${BASE_URL}/note`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ note, wordId, wordToAdd })
            })
            if (res.ok) {

                toast.success("Note saved successfully!");
            } else {
                console.log('Failed to save note');
                toast.error("Failed to save note");
            }
        } catch (error) {
            console.log("Error", error)
        }
    }
    return (
        <div className="flex flex-col w-full border items-center justify-center p-2 bg-white">
            <div className='flex flex-col w-full items-center justify-center'>

                <textarea
                    placeholder="Add your personal note for this word"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full p-1 rounded text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    rows="3"
                    cols="30"
                />
                <button
                    className=" text-black py-2 px-2 rounded hover:bg-blue-200 transition duration-300 text-center border w-1/3"
                    onClick={handleSaveNote}
                >
                    Save Note
                </button>
            </div>
        </div>

    )
}

export default NoteBook
