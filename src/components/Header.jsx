// import { useNavigate } from "react-router-dom";
// import { IoIosLogOut } from "react-icons/io";


// const Header = ({ setUser, user }) => {
//   const navigate = useNavigate()

//   const handleLogout = () => {
//     console.log(localStorage.getItem('userInfo'));
//     localStorage.removeItem('userInfo')
//     setUser(null)
//     navigate('/')
//   }
//   return (
//     <div className="bg-gray-800 py-3 px-5 w-full flex justify-between items-start">
//       <div>

//       </div>

//       <div>

//         {
//           !user && (
//             <div className="flex gap-8">
//               <button
//                 onClick={() => navigate('/login')}
//                 className="border border-gray-800 rounded-lg py-2 px-3  text-white hover:border-pink-200 text-lg"
//               >
//                 Login
//               </button>
//               <button
//                 onClick={() => navigate('/register')}
//                 className="border border-gray-800 py-1 px-4  rounded-lg  text-white hover:border-pink-200 text-lg bg-[#26B67C]"
//               >
//                 Signup
//               </button>
//             </div>
//           )
//         }

//         {
//           user &&
//           <button onClick={handleLogout} className="border border-gray-800 px-5 mt-1 rounded-lg  text-white hover:border-pink-200"
//           >
//             <IoIosLogOut className="text-4xl hover:text-pink-200 hover:translate-x-1" />
//           </button>
//         }
//       </div>

//     </div >
//   )
// }

// export default Header



import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

const Header = ({ setUser, user, darkMode, setDarkMode }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="bg-gray-800 py-3 px-5 w-full flex justify-between items-center">
      {/* Left side - You can add a logo or title here */}
      <div className="text-white text-xl font-semibold">GRE Vocab App</div>

      {/* Right side */}
      <div className="flex items-center gap-6">
        {/* Dark Mode Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="border border-gray-300 rounded-lg py-1 px-3 text-white hover:border-pink-200 transition"
          aria-label="Toggle dark mode"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        {/* Auth buttons */}
        {!user && (
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/login")}
              className="border border-gray-800 rounded-lg py-2 px-3 text-white hover:border-pink-200 text-lg"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="border border-gray-800 py-1 px-4 rounded-lg text-white hover:border-pink-200 text-lg bg-[#26B67C]"
            >
              Signup
            </button>
          </div>
        )}

        {/* Logout button */}
        {user && (
          <button
            onClick={handleLogout}
            className="border border-gray-800 px-5 mt-1 rounded-lg text-white hover:border-pink-200"
            title="Logout"
          >
            <IoIosLogOut className="text-4xl hover:text-pink-200 hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
