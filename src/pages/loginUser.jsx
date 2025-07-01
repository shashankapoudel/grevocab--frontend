

import { useToast } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../config/api";
import { useState } from "react";

const LoginUser = ({ setUser }) => {
    const toast = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const {
        control,
        handleSubmit,
        formState: { errors },

    } = useForm({
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (data) => {
        setIsLoading(true)
        try {
            const res = await fetch(`${BASE_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: data.email }),
            })
            console.log(res);
            const data1 = await res.json()
            console.log(data1);

            if (data1.error) {
                console.log("Error", "error");
                return;
            }
            toast({
                title: 'Login successfull',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })
            localStorage.setItem("userInfo", JSON.stringify(data1));
            setUser(data1)
            navigate('/')



        } catch (error) {
            console.log(error);
            toast({
                title: "Error Occured!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

        } finally {
            setIsLoading(false)
        }


    };

    return (
        <div className="flex  justify-center items-center bg-gray-500 min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: "url('/Images/loginimage4.jpg')",
                // backgroundSize: '60%',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                height: '100vh',
                width: '100vw',
            }}>
            < form onSubmit={handleSubmit(onSubmit)} className=" flex justify-center items-center space-y-6 bg-opacity-10 backdrop-blur-6 bg-white w-full p-12 rounded-lg shadow-2xl max-w-lg">
                <div className="grid grid-cols-1 gap-4 w-full p-4">
                    <h2 className="text-white text-4xl mb-4 text-center font-bold">Welcome</h2>
                    <div>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Email is required"
                                }
                            }}
                            render={({ field }) => (
                                <div className="flex flex-col">
                                    <label
                                        className="text-sm md:text-base lg:text-labelLarge ml-1 mb-2 text-white"
                                        htmlFor="email"
                                    >
                                        Email
                                    </label>
                                    <input
                                        {...field}
                                        type="text"
                                        id="email"
                                        placeholder="Enter your email here"
                                        className={`py-2.5 rounded-lg px-4 text-sm md:text-base lg:text-labelLarge  cursor-pointer border ${errors.email
                                            ? "border-red-500"
                                            : "border-[#CFCFCF] focus:border-[#006AFF]"
                                            } focus:outline-none w-full`}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 ml-1 text-labelMedium mt-1">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                            )}
                        />
                    </div>

                    <button
                        className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg"
                        type="submit">

                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                            </svg>
                        ) : "Submit"}

                    </button>

                    <div className="flex justify-center items-center">
                        <p className="font-semibold text-white">If you do not have an account, <Link to='/register'><span className="text-yellow-500 font-semibold underline">Register</span></Link></p>
                    </div>
                </div>
            </form>
        </div >
    );
};

export default LoginUser;

