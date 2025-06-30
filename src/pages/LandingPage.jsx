import React from 'react'

const LandingPage = () => {
    return (
        <div className='w-full p-4 lg:p-24 min-h-screen text-[#111111] bg-[#F7F7F9] dark:bg-gray-900 dark:text-white '>


            <div className='flex flex-col lg:flex-row w-full items-center justify-center '>

                <div className='w-full lg:w-1/2 flex flex-col p-2 lg:p-10 gap-2'>
                    <h1 className='text-xl lg:text-2xl text-start text-[#111111] dark:text-white font-medium'>Prepare with top quality materials</h1>
                    <p
                        className='text-gray-600 leading-relaxed tracking-wide text-base'
                    >
                        We’re here to help you master GRE vocabulary faster and smarter. With our app, you’ll always study with high-impact, handpicked words based on real student learning patterns. We don’t overwhelm you — we make every word and quiz count.
                        <br />
                        <br />
                        You can take <strong>notes, bookmark words, view usage examples, and track your progress through charts and leaderboards.</strong> Want deeper learning? Read <strong>suggested materials and explore meanings with our built-in dictionary.</strong>  Everything you need — in one place.
                    </p>
                </div>

                <div className='w-full lg:w-1/2 p-2 lg:p-6 '>
                    <img
                        className='object-cover rounded-lg'
                        src='/Images/LandingPage/1.png'
                    />
                </div>

            </div>


            <div className=' w-full  justify-center items-center mt-8'>

                <h1 className='w-full text-center border-b text-2xl lg:text-4xl font-bold p-5 dark:text-white'>What you will love most about our app: </h1>


                <div className='w-full flex flex-col lg:flex-row mt-8 gap-12 border-b'>

                    <div className='w-full lg:w-1/2 p-2 lg:p-10 flex flex-col gap-2'>
                        <h1 className='text-xl text-start text-[#111111] font-medium dark:text-white'>📖 Learn Words One at a Time — with Context & Control</h1>
                        <p className='text-gray-600 leading-relaxed tracking-wide'>
                            Our word learning interface is designed to help you focus on one GRE word at a time. You’ll see the word along with an option to:
                            <br />
                            🔊 Listen to<strong> pronunciation</strong>
                            <br />
                            📘 Reveal its <strong>meaning and usage sentence</strong>
                            <br />
                            ❓ Mark <strong>“I did not know this word” </strong>to track unknown(difficult) words
                            <br />
                            ✅ Tag the word as<strong> Easy, Medium, or Hard </strong>based on your understanding
                            <br />
                            You can navigate through words at your own pace with Previous and Next buttons.
                            <br />
                            ✍️ Want to remember something specific?
                            <br />
                            Add<strong> personal notes </strong>for each word to build your own custom study guide.
                        </p>
                    </div>

                    <div className='w-full lg:w-1/2 flex items-center '>
                        <img
                            src='/Images/LandingPage/3.png'
                            className='object-cover rounded-lg'
                        />
                    </div>
                </div>


                <div className='w-full flex flex-col lg:flex-row mt-8 gap-12 border-b'>

                    <div className='w-full lg:w-1/2 p-2 lg:p-10 flex flex-col gap-2'>
                        <h1 className='text-xl text-start text-[#111111] font-medium dark:text-white'>Difficulty Levels That Reflect You — and Everyone Else</h1>
                        <p className='text-gray-600 leading-relaxed tracking-wide'>
                            👥 Tag words your way — and see how others do too.
                            <br />

                            Categorize each word as <strong>Easy, Medium,</strong> or <strong>Hard</strong> based on your understanding, and explore how other users have rated the same word to gain new perspective and compare difficulty levels.
                        </p>
                    </div>

                    <div className='w-full lg:w-1/2 p-10'>
                        <img
                            src='/Images/LandingPage/4.png'

                        />
                    </div>
                </div>

                <div className='w-full flex flex-col lg:flex-row mt-8 gap-4 lg:gap-12 border-b'>

                    <div className='w-full lg:w-1/2 p-2 lg:p-10 flex flex-col gap-2'>
                        <h1 className='text-xl text-start text-[#111111] font-medium dark:text-white'> 🧠 Test Yourself — On Your Terms</h1>
                        <p className='text-gray-600 leading-relaxed tracking-wide'>

                            Ready to challenge your vocab knowledge?<br />
                            With our customizable quiz feature, <strong>you choose how many questions you want to attempt </strong>— from 10 to 50. Whether you’re up for a quick revision or a full practice session, the choice is yours.
                            <br />
                            <br />
                            Once you start, you'll face randomly selected questions based on real GRE-level words. It’s a fun, flexible way to reinforce learning and track your progress over time.
                        </p>
                    </div>

                    <div className="w-full lg:w-1/2 relative">
                        <img
                            className="object-cover w-80 h-56 "
                            src="/Images/LandingPage/5.png"
                            alt="Image 2"
                        />
                        <img
                            className="object-cover w-80 h-48 absolute top-3/4 lg:top-1/4 right-0 lg:right-8"
                            src="/Images/LandingPage/6.png"
                            alt="Image 1"
                        />
                    </div>
                </div>


                <div className='w-full flex flex-col lg:flex-row mt-44 lg:mt-8 gap-12 items-center justify-center border-b'>

                    <div className='w-full lg:w-1/2 p-2 lg:p-10 flex flex-col gap-2'>
                        <h1 className='text-xl text-start text-[#111111] font-medium dark:text-white'>
                            📊 Track Your Progress Visually
                        </h1>
                        <p className='text-gray-600 leading-relaxed tracking-wide'>
                            After each quiz, your performance is instantly analyzed and displayed through interactive charts and graphs:<br />

                            📈 <strong>Line graph</strong> shows how your scores evolve over time .<br />

                            🥧 <strong>Pie chart</strong> highlights how many questions you got right vs wrong.<br />

                            📋 A <strong>summary panel</strong> gives you your total score, full marks, and average score. <br />
                            <br />
                            This makes it easy to understand your strengths, spot areas to improve, and stay motivated with a clear picture of your learning journey. <br />

                            Plus, with just a click, you can explore <strong>recommended study materials</strong>  tailored to your current score level.
                            <br />
                        </p>
                    </div>

                    <div className='w-full lg:w-1/2 '>
                        <img
                            src='/Images/LandingPage/2.png'

                        />
                    </div>
                </div>



                <div className='w-full flex flex-col lg:flex-row mt-4 gap-12 items-center justify-center border-b'>
                    <div className='w-full lg:w-1/2 p-2 lg:p-4 flex flex-col gap-2'>
                        <h1 className='text-xl text-start text-[#111111] font-medium dark:text-white'>
                            📚 Built-in Dictionary — Look Up, Learn, and Listen
                        </h1>
                        <p className='text-gray-600 leading-relaxed tracking-wide'>

                            Want to go beyond the word list?
                            <br />
                            <br />
                            Our <strong>built-in dictionary</strong> lets you search any word, view its definition, see example usage, and even listen to its pronunciation with just one click.
                            <br />
                            <br />
                            It’s the perfect tool for expanding your vocabulary and mastering correct pronunciation — all without leaving the app.
                        </p>
                    </div>

                    <div className='w-full lg:w-1/2 p-2 lg:p-16 '>
                        <img
                            src='/Images/LandingPage/7.png'

                        />
                    </div>
                </div>

            </div>

            <div className='flex flex-col items-center justify-center text-gray-600 mt-8 gap-3'>
                <h1 className='text-3xl font-bold'>🛠️ In Active Development</h1>
                <p className='text-lg'>
                    We’re continuously improving the platform — stay tuned for new features, enhancements, and more!
                </p>
            </div>
        </div>
    )
}

export default LandingPage
