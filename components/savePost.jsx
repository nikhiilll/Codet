import { motion } from "framer-motion";
import { useState } from "react";

const SavePost = (props) => {
  const { saveCode, codePost } = props;

  const [published, setPublished] = useState(codePost?.published || false);
  const [description, setDescription] = useState(codePost?.description || "");
  const [postName, setPostName] = useState(codePost?.postName || "");
  const [message, setMessage] = useState("");

  const handleToggle = (e) => {
    if (e.target.checked) {
      setPublished(true);
    } else {
      setPublished(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!postName) {
      setMessage("Please enter a post name");
      return;
    }

    if (!description) {
      setMessage("Please enter a description");
      return;
    }

    const res = await saveCode(postName, published, description);
  };

  return (
    <>
      <p className="text-2xl font-bold text-center">Save your code</p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col">
        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className=" text-theme-red text-center mb-2"
          >
            {message}
          </motion.p>
        )}
        <input
          type="text"
          value={postName}
          onChange={(e) => setPostName(e.target.value)}
          minLength="5"
          maxLength="64"
          placeholder="Enter name of the post"
          className="p-3 border-2 border-gray-200 outline-none rounded-md focus:border-2 focus:border-theme-red transition duration-500 ease-in-out"
        ></input>

        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength="1024"
          placeholder="Enter description"
          className="p-3 mt-2 border-2 border-gray-200 outline-none rounded-md focus:border-2 focus:border-theme-red transition duration-500 ease-in-out"
        ></input>

        <label for="published" className="flex mt-5">
          <div class="text-lg mr-3">Share with people?</div>

          <div class="relative">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={handleToggle}
              class="sr-only"
            />
            <motion.div
              initial={{ backgroundColor: "#E5E7EB" }}
              animate={
                published
                  ? { backgroundColor: "#FECACA" }
                  : { backgroundColor: "#E5E7EB" }
              }
              className="block w-14 h-8 rounded-full"
            ></motion.div>
            <motion.div
              initial={{ backgroundColor: "#ffffff" }}
              animate={
                published
                  ? { backgroundColor: "#C3073F", translateX: "100%" }
                  : { backgroundColor: "#ffffff" }
              }
              className="absolute left-1 top-1 w-6 h-6 rounded-full"
            ></motion.div>
          </div>
        </label>

        <button
          type="submit"
          className="p-3 mt-8 border-2 text-theme-red border-theme-red rounded-md hover:bg-theme-red hover:text-white transition duration-500 ease-out font-semibold"
        >
          Save
        </button>
      </form>
    </>
  );
};

export default SavePost;
