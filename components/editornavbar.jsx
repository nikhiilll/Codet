import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import CodetLogoSVG from "../assets/codetLogoSVG";
import { API } from "../constants";
import axios from "axios";
import { useUserContext } from "../context/userContext";

const EditorNavbar = (props) => {
  const { openModal, isCreator, existingCode } = props;
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
        className="flex justify-between w-full mx-auto py-2 px-2 lg:px-6"
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex items-center group"
        >
          <div className="h-12 w-12 lg:h-14 lg:w-14">
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
            transition={{ duration: 0.8 }}
            className="flex space-x-2 sm:space-x-5 items-center text-base sm:text-lg text-black font-semibold"
          >
            <Link href="/dashboard">
              <a className="hover:text-theme-red border-b-2 border-white hover:border-theme-red transition-all duration-500 ease-out">
                Dashboard
              </a>
            </Link>
            {((existingCode && isCreator) || !existingCode) && (
              <button
                onClick={() => openModal(true)}
                type="button"
                className="px-1 md:py-1 md:px-3 font-semibold bg-black hover:bg-theme-red text-white rounded-md transition-colors duration-300 ease-in-out flex items-center justify-center"
              >
                Save
              </button>
            )}
            <p
              onClick={logout}
              className="cursor-pointer ml-6 hover:text-theme-red border-b-2 border-white hover:border-theme-red transition-all duration-500 ease-out"
            >
              Logout
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default EditorNavbar;
