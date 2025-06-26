import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";


const Header = ({ setUser, user }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    console.log(localStorage.getItem('userInfo'));
    localStorage.removeItem('userInfo')
    setUser(null)
    navigate('/')
  }
  return (
    <div className="bg-gray-800 py-3 px-5 w-full flex justify-between items-start">
      <div>

      </div>

      <div>

        {
          !user && (
            <div className="flex gap-8">
              <button
                onClick={() => navigate('/login')}
                className="border border-gray-800 rounded-lg py-2 px-3  text-white hover:border-pink-200 text-lg"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="border border-gray-800 py-1 px-4  rounded-lg  text-white hover:border-pink-200 text-lg bg-[#26B67C]"
              >
                Signup
              </button>
            </div>
          )
        }

        {
          user &&
          <button onClick={handleLogout} className="border border-gray-800 px-5 mt-1 rounded-lg  text-white hover:border-pink-200"
          >
            <IoIosLogOut className="text-4xl hover:text-pink-200 hover:translate-x-1" />
          </button>
        }
      </div>

    </div >
  )
}

export default Header