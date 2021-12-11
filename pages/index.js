import Head from "next/head";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Navbar from "../components/navbar";
import Link from "next/link";

export default function Home() {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const animation = useAnimation();

  const [midsTransBg, setMidsTransBg] = useState(0);

  const toggleTransBg = () => {
    setMidsTransBg((prevValue) => (prevValue + 1) % 3);
  };

  useEffect(() => {
    const intervalid = setInterval(toggleTransBg, 2000);

    return () => clearInterval(intervalid);
  }, []);

  useEffect(() => {
    if (inView) {
      animation.start({
        opacity: 1,
        transition: { duration: 0.5 },
      });
    } else {
      animation.start({
        opacity: 0,
        transition: { duration: 0.5 },
      });
    }
  }, [inView]);

  return (
    <div className="h-full w-full pb-10">
      <Head>
        <title>Codet</title>
      </Head>

      <Navbar />

      {/* Mid section */}
      <div className="flex flex-col items-center justify-center pt-10 sm:pt-20 select-none">
        <motion.span
          // variants={midSectionSpanVariant}
          initial={{ x: -2000 }}
          animate={{ x: 0 }}
          transition={{
            delay: 1,
            duration: 0.8,
            type: "spring",
          }}
          className={`${
            midsTransBg === 0 ? "text-transparent" : ""
          } text-7xl sm:text-9xl font-bold bg-clip-text block bg-gradient-to-r from-blue-500 to-cyan-400 transition-colors duration-500 ease-in-out`}
        >
          Code.
        </motion.span>
        <motion.span
          initial={{ x: -2000 }}
          animate={{ x: 0 }}
          transition={{ delay: 2, duration: 0.8, type: "spring" }}
          className={`${
            midsTransBg === 1 ? "text-transparent" : ""
          } text-7xl sm:text-9xl font-bold bg-clip-text block bg-gradient-to-r from-violet-600 to-fuchsia-500 transition-colors duration-500 ease-in-out`}
        >
          Preview.
        </motion.span>
        <motion.span
          initial={{ x: -2000 }}
          animate={{ x: 0 }}
          transition={{ delay: 3, duration: 0.8, type: "spring" }}
          className={`${
            midsTransBg === 2 ? "text-transparent" : ""
          } text-7xl sm:text-9xl font-bold bg-clip-text block bg-gradient-to-r from-orange-600 to-amber-400 transition-colors duration-500 ease-in-out`}
        >
          Share.
        </motion.span>
      </div>

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-12 lg:mt-32 font-semibold text-lg md:text-2xl text-center p-4"
      >
        <p>
          Codet is a platform for you to try out your HTML, CSS and JavaScript
          code in an editor.<br></br>
          You can code your webpages, preview them and share with the community.
        </p>
      </motion.div>

      <motion.div
        ref={ref}
        animate={animation}
        className="bg-palewhite mt-12 p-2 lg:p-4 lg:mt-28"
      >
        <p className="font-bold text-2xl lg:text-6xl mb-8 text-center">
          Code Editor
        </p>
        <img src="editor.png"></img>
      </motion.div>

      <div className="p-2 mt-8 font-semibold text-center text-xl">
        <Link href="/editor">
          <a className="text-white bg-black hover:bg-theme-red hover:text-white p-2 rounded-md transition-all duration-500 ease-out">
            Try out the code editor for yourself!
          </a>
        </Link>
      </div>

      <div className="mt-20 flex justify-center items-center  ">
        Made with{" "}
        <span className="text-theme-red mx-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        by
        <a
          href="http://nikhilpawar.in"
          target="_blank"
          className="hover:text-theme-red mx-1"
        >
          Nikhil Pawar
        </a>
      </div>
    </div>
  );
}
