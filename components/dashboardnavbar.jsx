import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import CodetLogoSVG from "../assets/codetLogoSVG";
import axios from "axios";
import { useUserContext } from "../context/userContext";
import { API } from "../constants";

const Dashboardnavbar = (props) => {
  const { isLoggedIn, user, setIsLoggedIn, setUser } = useUserContext();
  const { openModal } = props;
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
        className="flex justify-between w-full mx-auto py-2 px-2 lg:px-6 border-b border-gray-200 shadow-sm"
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex items-center group cursor-pointer"
          onClick={() => router.push("/")}
        >
          <div className="h-12 w-12 lg:h-14 lg:w-14">
            <CodetLogoSVG />
          </div>
          <h1 className="font-bold text-xl lg:text-3xl group-hover:text-theme-red">
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
            transition={{ duration: 0.8 }}
            className="flex space-x-2 sm:space-x-5 items-center text-base sm:text-lg text-black font-semibold"
          >
            <Link href="/editor">
              <a className="py-1 px-2 bg-black rounded-md text-white hover:bg-theme-red transition-all duration-500 ease-out shadow-sm">
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

export default Dashboardnavbar;
