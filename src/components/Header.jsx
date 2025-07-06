
// import { useNavigate } from "react-router-dom";
// import { IoIosLogOut } from "react-icons/io";
// import BASE_URL from "../config/api";
// import { useEffect, useState } from "react";
// import { toast } from 'react-toastify';

// const Header = ({ setUser, user, darkMode, setDarkMode }) => {

//   console.log(user)

//   const navigate = useNavigate();
//   const [subscribed, setSubscribed] = useState();

//   useEffect(() => {
//     if (user?.data?.user?.subscribedForDailyEmail !== undefined) {
//       setSubscribed(user.data.user.subscribedForDailyEmail);
//     }
//   }, [user]);

//   const handleLogout = () => {
//     localStorage.removeItem("userInfo");
//     setUser(null);
//     navigate("/");
//     toast.info("Logged out successfully.");
//   };

//   const handleSubscribe = async () => {
//     const token = user.data.token;
//     try {
//       const res = await fetch(`${BASE_URL}/users/subscribe`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       const data = await res.json();
//       console.log(data)
//       setSubscribed(data.user.subscribedForDailyEmail);


//       toast.success(data.message);
//     } catch (error) {
//       console.log('ERROR', error);
//       toast.error("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="bg-gray-800 py-3 px-5 w-full flex justify-between items-center">
//       <div className="text-white text-xl font-semibold">GRE Vocab App</div>
//       <div className="flex items-center gap-6">
//         <button
//           onClick={() => setDarkMode(!darkMode)}
//           className="border border-gray-300 rounded-lg py-1 px-3 text-white hover:border-pink-200 hover:text-pink-200 transition"
//         >
//           {darkMode ? "Light Mode" : "Dark Mode"}
//         </button>

//         {!user ? (
//           <div className="flex gap-4">
//             <button
//               onClick={() => navigate("/login")}
//               className="border border-gray-800 rounded-lg py-2 px-3 text-white hover:border-pink-200 text-lg"
//             >
//               Login
//             </button>
//             <button
//               onClick={() => navigate("/register")}
//               className="border border-gray-800 py-1 px-4 rounded-lg text-white hover:border-pink-200 text-lg bg-[#26B67C]"
//             >
//               Signup
//             </button>
//           </div>
//         ) : (
//           <div className="flex items-center gap-4">
//             <button
//               onClick={handleSubscribe}
//               disabled={subscribed === undefined}
//               className="border border-gray-300 rounded-lg py-1 px-3 text-white hover:border-pink-200 hover:text-pink-200 cursor-pointer"
//               title="Subscribe to get daily GRE word notification on your email address"

//             >
//               {subscribed ? "Unsubscribe" : "Subscribe"}
//             </button>

//             <button
//               onClick={handleLogout}
//               className="px-1 mt-1 rounded-lg text-white hover:border-pink-200"
//               title="Logout"
//             >
//               <IoIosLogOut className="text-4xl hover:text-pink-200 hover:translate-x-1 " />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Header;







import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import BASE_URL from "../config/api";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const Header = ({ setUser, user, darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const [subscribed, setSubscribed] = useState();

  // Set initial subscribed status from user data
  useEffect(() => {
    if (user?.data?.user?.subscribedForDailyEmail !== undefined) {
      setSubscribed(user.data.user.subscribedForDailyEmail);
    }
  }, [user]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    navigate("/");
    toast.info("Logged out successfully.");
  };

  // Toggle subscribe/unsubscribe
  const handleSubscribe = async () => {
    const token = user.data.token;
    try {
      const res = await fetch(`${BASE_URL}/users/subscribe`, {
        method: 'PATCH', // must match backend route
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await res.json();


      setSubscribed(data.user.subscribedForDailyEmail);


      const updatedUserInfo = {
        ...user,
        data: {
          ...user.data,
          user: data.user, // Replace with updated user from backend
        },
      };

      localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
      setUser(updatedUserInfo);

      toast.success(data.message);
    } catch (error) {
      console.log('ERROR', error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-gray-800 py-3 px-5 w-full flex justify-between items-center">
      <div className="text-white text-xl font-semibold">GRE Vocab App</div>

      <div className="flex items-center gap-6">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="border border-gray-300 rounded-lg py-1 px-3 text-white hover:border-pink-200 hover:text-pink-200 transition"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        {!user ? (
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
        ) : (
          <div className="flex items-center gap-4">
            <button
              onClick={handleSubscribe}
              className="border border-gray-300 rounded-lg py-1 px-3 text-white hover:border-pink-200 hover:text-pink-200 cursor-pointer"
              title={subscribed ? "UnSubscribe to not get daily GRE word notification on your email address" : "Subscribe to get daily GRE word notification on your email address"}
            >
              {subscribed ? "Unsubscribe" : "Subscribe"}
            </button>

            <button
              onClick={handleLogout}
              className="px-1 mt-1 rounded-lg text-white hover:border-pink-200"
              title="Logout"
            >
              <IoIosLogOut className="text-4xl hover:text-pink-200 hover:translate-x-1" />
            </button>
          </div>
        )}
      </div>
    </div >
  );
};

export default Header;
