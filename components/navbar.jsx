import Link from "next/link";
import { motion } from "framer-motion";
import CodetLogoSVG from "../assets/codetLogoSVG";
import { useUserContext } from "../context/userContext";
import axios from "axios";
import { useRouter } from "next/router";
import { API } from "../constants";

const Navbar = () => {
  const { isLoggedIn, user, setIsLoggedIn, setUser } = useUserContext();
  const router = useRouter();

  const logout = async () => {
    try {
      const res = await axios.get(API.USER.LOGOUT);
      setUser(null);
      setIsLoggedIn(false);
    } catch (err) {
      console.error(err);
    }
    router.push("/");
  };

  return (
    <div className="sticky">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="flex justify-between w-full max-w-6xl mx-auto p-2"
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex items-center group"
        >
          <div className="h-10 w-10 md:h-14 md:w-14">
            <CodetLogoSVG />
          </div>
          <h1 className="font-bold text-xl lg:text-3xl cursor-default group-hover:text-theme-red">
            Codet
          </h1>
        </motion.div>

        {/* Links */}
        {!isLoggedIn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex space-x-2 sm:space-x-4 items-center text-base sm:text-lg text-black font-semibold"
          >
            <Link href="/login">
              <a className="hover:text-theme-red border-b-2 border-white hover:border-theme-red transition-all duration-500 ease-out">
                Login
              </a>
            </Link>
            <Link href="/register">
              <a className="hover:text-theme-red border-b-2 border-white hover:border-theme-red transition-all duration-500 ease-out">
                Create Account
              </a>
            </Link>
          </motion.div>
        )}

        {isLoggedIn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex space-x-2 sm:space-x-4 items-center text-sm sm:text-lg text-black font-semibold"
          >
            <Link href="/dashboard">
              <a className="hover:text-theme-red border-b-2 border-white hover:border-theme-red transition-all duration-500 ease-out">
                Dashboard
              </a>
            </Link>
            <Link href="/editor">
              <a className="hover:text-theme-red border-b-2 border-white hover:border-theme-red transition-all duration-500 ease-out">
                Code Editor
              </a>
            </Link>
            <p
              onClick={logout}
              className="cursor-pointer hover:text-theme-red border-b-2 border-white hover:border-theme-red transition-all duration-500 ease-out"
            >
              Logout
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Navbar;
