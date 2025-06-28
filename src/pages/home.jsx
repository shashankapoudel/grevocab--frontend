
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";

const Home = () => {

    return (

        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 md:gap-5 p-4 md:p-8 lg:p-12 min-h-screen bg-[#F7F7F9] '>
            <div className='flex justify-center items-center bg-[#FFFFFF]   p-4 w-full shadow-xl '>
                <Link to="/wordcontainer" className='text-gray-600 font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl flex items-center justify-center hover:translate-x-2 hover:text-gray-800 '>
                    Word Container
                    <FaArrowRight className='ml-2 mt-1 ' />
                </Link>
            </div>

            <div className='flex justify-center items-center bg-[#FFFFFF]  p-4 w-full shadow-xl'>
                <Link to="/unknown" className='text-gray-600 font-medium text-xl sm:text-2xl md:text-3xl flex items-center justify-center hover:translate-x-2 hover:text-gray-800 '>
                    Words You Found Difficult
                    <FaArrowRight className='ml-2 mt-1' />
                </Link>
            </div>

            <div className='flex justify-center items-center  bg-[#FFFFFF]  p-4 w-full shadow-xl'>
                <Link to="/quizstart" className='text-gray-600 font-medium text-xl sm:text-2xl md:text-3xl flex items-center hover:translate-x-2 hover:text-gray-800 '>
                    Play quiz to test yourself
                    <FaArrowRight className='ml-2 mt-1' />
                </Link>
            </div>

            <div className='flex justify-center items-center  bg-[#FFFFFF]  p-4 w-full shadow-xl'>
                <Link to="/wordsearch" className='text-gray-600 font-medium text-xl sm:text-2xl md:text-3xl flex items-center hover:translate-x-2 hover:text-gray-800 '>
                    Search for words
                    <FaArrowRight className='ml-2 mt-1' />
                </Link>
            </div>

            <div className='flex justify-center items-center  bg-[#FFFFFF]   p-4 w-full shadow-xl'>
                <Link to="/viewpdf" className='text-gray-600 font-medium text-xl sm:text-2xl md:text-3xl flex items-center hover:translate-x-2 hover:text-gray-800'>
                    Study materials
                    <FaArrowRight className='ml-2 mt-1' />
                </Link>
            </div>
            <div className='flex justify-center items-center  bg-[#FFFFFF]   p-4 w-full shadow-xl'>
                <Link to="/scoretracker" className='text-gray-600 font-medium text-xl sm:text-2xl md:text-3xl flex items-center hover:translate-x-2 hover:text-gray-800 '>
                    Score Tracker
                    <FaArrowRight className='ml-2 mt-1' />
                </Link>
            </div>

        </div>


    );
}

export default Home;