import { motion } from "framer-motion";

const Snackbar = ({ message }) => {
  return (
    <div className="fixed w-screen bottom-12 z-10 flex justify-center items-center">
      <motion.div
        initial={{
          opacity: 0,
          y: "100vh",
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          type: "spring",
        }}
        className=" bg-white mx-auto rounded-lg text-center text-semibold shadow-2xl drop-shadow-2xl p-3"
      >
        <p>{message}</p>
      </motion.div>
    </div>
  );
};

export default Snackbar;
