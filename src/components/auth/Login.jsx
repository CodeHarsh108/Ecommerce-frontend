import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import InputField from "../shared/InputField";
import Spinners from "../shared/Spinners";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";  
import { authenticateSignInUser } from "../../store/actions/index.js";

const Login = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();


    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        mode: "onTouched",
    });

    const loginHandler = async(data) => {
        console.log("Login Click");
        dispatch(authenticateSignInUser(data, toast, reset, navigate, setLoader));
    };


    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
            <form
                onSubmit={handleSubmit(loginHandler)}
                className="sm:w-[400px] w-[90vw] max-w-[400px] bg-white shadow-2xl py-10 px-6 rounded-2xl border border-gray-200"
            >
                <div className="flex flex-col items-center justify-center space-y-4 mb-6">
                    <div className="bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 p-4 rounded-full shadow-lg">
                        <AiOutlineLogin className="text-white text-5xl" />
                    </div>
                    <h1 className="text-gray-800 text-center font-montserrat text-3xl font-extrabold tracking-tight">
                        Welcome Back!
                    </h1>
                    <p className="text-gray-500 text-center text-base font-medium">
                        Please login to your account
                    </p>
                </div>
                <hr className="mb-6 border-t-2 border-purple-200" />
                <div className="flex flex-col gap-5">
                    <InputField
                        label="UserName"
                        required
                        id="username"
                        type="text"
                        message="*UserName is required"
                        placeholder="Enter your username"
                        register={register}
                        errors={errors}
                    />

                    <InputField
                        label="Password"
                        required
                        id="password"
                        type="password"
                        message="*Password is required"
                        placeholder="Enter your password"
                        register={register}
                        errors={errors}
                    />
                </div>

                <button
                    disabled={loader}
                    className={`bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex gap-2 items-center justify-center font-semibold text-white w-full py-3 mt-7 rounded-lg shadow-md hover:scale-[1.03] transition-transform duration-150 ${
                        loader ? "opacity-60 cursor-not-allowed" : "hover:brightness-90"
                    }`}
                    type="submit"
                >
                    {loader ? (
                        <>
                            <Spinners /> Loading...
                        </>
                    ) : (
                        <>Login</> 
                    )}
                </button>

                <p className="text-center text-sm text-gray-700 mt-8">
                    Don't have an account?
                    <Link
                        className="font-semibold underline hover:text-purple-600 ml-1"
                        to="/register"
                    >
                        <span>Sign Up</span>
                    </Link>
                </p>
            </form>
        </div>
    );
};
export default Login;