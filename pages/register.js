import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { API } from "../constants";
import { useRouter } from "next/router";
import Head from "next/head";
import LoginSVG from "../assets/loginSVG";

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

const register = () => {
  const router = useRouter();

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API.USER.REGISTER, {
        emailId,
        password,
        firstName,
        lastName,
      });
      const { success, data } = res.data;
      if (!success) {
        setError(data);
      } else {
        router.push("/login");
      }
    } catch (err) {
      console.log(err.response);
      setError(err.response.data.data);
    }
  };

  return (
    <div className="flex items-center justify-center h-full bg-palewhite">
      <Head>
        <title>Create Account</title>
      </Head>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.5,
          duration: 1,
        }}
        className="flex flex-col w-full sm:w-1/2 lg:w-1/3 justify-center items-center bg-white shadow-md p-4 m-8 rounded-md"
      >
        <h1 className="font-bold mb-6 text-3xl text-center">
          Create an account
        </h1>
        <motion.p
          variants={errorVariant}
          initial="hidden"
          animate={error ? "visible" : "hidden"}
          className="mb-2 text-red-500"
        >
          {error}
        </motion.p>
        <div className="w-1/2 h-1/2">
          <LoginSVG />
        </div>

        <form onSubmit={registerHandler} className="flex flex-col w-3/4">
          <input
            required
            type="email"
            placeholder="Email id"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            className="p-3 mt-4 border-2 border-gray-200 outline-none rounded-md focus:border-2 focus:border-theme-red transition duration-500 ease-in-out"
          ></input>
          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 mt-4 border-2 border-gray-200 outline-none rounded-md focus:border-2 focus:border-theme-red transition duration-500 ease-in-out"
          ></input>
          <input
            required
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="p-3 mt-4 border-2 border-gray-200 outline-none rounded-md focus:border-2 focus:border-theme-red transition duration-500 ease-in-out"
          ></input>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="p-3 mt-4 border-2 border-gray-200 outline-none rounded-md focus:border-2 focus:border-theme-red transition duration-500 ease-in-out"
          ></input>

          <button
            type="submit"
            className="p-3 mt-8 border-2 text-theme-red border-theme-red rounded-md hover:bg-theme-red hover:text-white transition duration-500 ease-out"
          >
            Create Account
          </button>
        </form>

        <p className="mt-4">
          Already have an account?{" "}
          <Link href="/login">
            <a className="text-theme-red hover:underline">Sign in</a>
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default register;
