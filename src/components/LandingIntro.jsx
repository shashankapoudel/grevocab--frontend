import React from 'react'

const LandingIntro = () => {
    return (
        <div className='flex flex-col items-center  justify-center min-h-screen bg-[#F7F6FB] gap-12 '>

            <div className='bg-[#D6D3EB] text-[#4B5563] text-lg font-medium p-2 rounded-xl'>
                🎉 Now Live: Advanced GRE Vocabulary Mastery
            </div>

            <div className='flex flex-col gap-8'>
                <p className='text-gray-800 text-7xl font-bold text-center tracking-normal'>Your Gateway to <span className='text-[#534B87]'>Higher</span>  <br /><span className='text-[#534B87]'>GRE scores</span></p>
                <p className='text-[#4B5563] font-medium text-2xl tracking-normal font-serif text-center'>The go-to platform for GRE vocabulary mastery, combining interactive <br />learning, performance tracking, and targeted study plans.</p>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={() => navigate("/login")}
                    className="bg-[#534B87] rounded-lg py-2 px-5 text-[#FFFFFF]  text-lg"
                >
                    Login
                </button>

                <button
                    onClick={() => navigate("/register")}
                    className="border border-gray-800 py-1 px-4 rounded-lg text-[#ffffff] hover:border-pink-200 text-lg bg-[#534B87]"
                >
                    Signup
                </button>
            </div>

        </div>
    )
}

export default LandingIntro
