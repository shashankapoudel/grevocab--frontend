
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";

const Home = () => {

    return (

        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 md:gap-5 p-4 md:p-8 lg:p-12 min-h-screen bg-[#F7F7F9] dark:bg-[#6B64A0] text-[#666666] dark:text-[#FFFFFF]'>

            <div className='flex justify-center items-center bg-[#FFFFFF] dark:bg-[#534B87]  p-4 w-full shadow-xl '>
                <Link to="/wordcontainer" className=' font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl flex items-center justify-center hover:translate-x-2'>
                    Word Container
                    <FaArrowRight className='ml-2 mt-1 ' />
                </Link>
            </div>

            <div className='flex justify-center items-center bg-[#FFFFFF]  dark:bg-[#534B87] p-4 w-full shadow-xl'>
                <Link to="/unknown" className=' font-medium text-xl sm:text-2xl md:text-3xl flex items-center justify-center hover:translate-x-2 '>
                    Words You Found Difficult
                    <FaArrowRight className='ml-2 mt-1' />
                </Link>
            </div>

            <div className='flex justify-center items-center  bg-[#FFFFFF]  dark:bg-[#534B87] p-4 w-full shadow-xl'>
                <Link to="/quizstart" className=' font-medium text-xl sm:text-2xl md:text-3xl flex items-center hover:translate-x-2  '>
                    Play quiz to test yourself
                    <FaArrowRight className='ml-2 mt-1' />
                </Link>
            </div>

            <div className='flex justify-center items-center  bg-[#FFFFFF]  dark:bg-[#534B87] p-4 w-full shadow-xl'>
                <Link to="/wordsearch" className=' font-medium text-xl sm:text-2xl md:text-3xl flex items-center hover:translate-x-2'>
                    Search for words
                    <FaArrowRight className='ml-2 mt-1' />
                </Link>
            </div>

            <div className='flex justify-center items-center  bg-[#FFFFFF]  dark:bg-[#534B87]  p-4 w-full shadow-xl'>
                <Link to="/viewpdf" className=' font-medium text-xl sm:text-2xl md:text-3xl flex items-center hover:translate-x-2 '>
                    Study materials
                    <FaArrowRight className='ml-2 mt-1' />
                </Link>
            </div>

            <div className='flex justify-center items-center  bg-[#FFFFFF]  dark:bg-[#534B87]  p-4 w-full shadow-xl dark:text-white'>
                <Link to="/scoretracker" className='  font-medium text-xl sm:text-2xl md:text-3xl flex items-center hover:translate-x-2  '>
                    Score Tracker
                    <FaArrowRight className='ml-2 mt-1' />
                </Link>
            </div>

        </div>


    );
}

export default Home;