import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Search = ({ searchCodePosts }) => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => searchCodePosts(searchQuery), 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for codets"
        className="w-1/3 focus:w-1/2  focus:translate-x-1/2 p-3 bg-white border-2 border-gray-100 focus:border-theme-red rounded-md outline-none transition-all  duration-1000 ease-in-out text-theme-red font-semibold"
      ></input>
    </motion.div>
  );
};

export default Search;
