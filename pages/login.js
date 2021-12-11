import LoginSVG from "../assets/loginSVG";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { API } from "../constants";
import { useRouter } from "next/router";
import { useUserContext } from "../context/userContext";
import Head from "next/head";

const errorVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const Login = () => {
  const router = useRouter();
  const userCtx = useUserContext();

  // Controlled form inputs
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(" ");

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API.USER.LOGIN, {
        emailId,
        password,
      });
      const { success, data } = res.data;
      if (!success) {
        setError(data);
      } else {
        userCtx.setIsLoggedIn(true);
        userCtx.setUser(data);
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err.response.data.data);
      console.log(err.response.data);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-palewhite p-4">
      <Head>
        <title>Login</title>
      </Head>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.5,
          duration: 1,
        }}
        className="flex flex-col w-full sm:w-1/2 lg:w-1/3 justify-center items-center bg-white shadow-md p-4 rounded-md"
      >
        <h1 className="font-bold mb-6 text-3xl text-center">
          Sign in to your account
        </h1>
        <motion.p
          variants={errorVariant}
          initial="hidden"
          animate={error.trim() ? "visible" : "hidden"}
          className="mb-2 text-red-500"
        >
          {error}
        </motion.p>
        <div className="w-1/2 h-1/2">
          <LoginSVG />
        </div>

        <form onSubmit={loginHandler} className="flex flex-col w-3/4">
          <input
            type="email"
            placeholder="Email id"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            className="p-3 mt-4 border-2 border-gray-200 outline-none rounded-md focus:border-2 focus:border-theme-red transition duration-500 ease-in-out"
          ></input>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 mt-4 border-2 border-gray-200 outline-none rounded-md focus:border-2 focus:border-theme-red transition duration-500 ease-in-out"
          ></input>

          <button
            type="submit"
            className="p-3 mt-8 border-2 text-theme-red border-theme-red rounded-md hover:bg-theme-red hover:text-white transition duration-500 ease-out"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4">
          Don't have an account?{" "}
          <Link href="/register">
            <a className="text-theme-red hover:underline">
              Create a new account
            </a>
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
