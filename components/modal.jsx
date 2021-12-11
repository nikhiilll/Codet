import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const Modal = ({ setIsOpen, children }) => {
  const modalRef = useRef();

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);

    return () =>
      document.removeEventListener("click", handleClickOutside, false);
  }, []);

  const modalJSX = (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-20"></div>
      <div className="fixed inset-0 z-20 flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: "-100vh" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100vh" }}
          transition={{
            duration: 1,
            type: "spring",
          }}
          ref={modalRef}
          className="w-3/4 md:w-1/3 max-h-4/5 bg-white opacity-100 z-20 rounded-md p-4"
        >
          {children}
        </motion.div>
      </div>
    </>
  );

  return createPortal(modalJSX, document.getElementById("modal-root"));
};

export default Modal;
