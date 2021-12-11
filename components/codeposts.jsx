import { motion } from "framer-motion";
import { useRouter } from "next/router";

const Codeposts = ({ posts, user }) => {
  const router = useRouter();

  const editPost = (postId) => {
    router.push(`/editor/${postId}`);
  };

  return (
    <div className="mt-10 flex flex-col space-y-4">
      {posts.map((post, idx) => {
        return (
          <motion.div
            initial={{
              opacity: 0,
              y: "-50px",
            }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.4, type: "spring" }}
            key={post.postId}
            className="border border-gray-100 bg-white shadow-sm flex justify-between items-center rounded-md p-3 cursor-default"
          >
            <div className="flex flex-col">
              <p className="font-semibold text-base">{post.postName}</p>
              <p className="text-xs text-gray-400">{`Posted by ${post.firstName} ${post.lastName}`}</p>
              <p className="mt-2 text-sm">{post.description}</p>
            </div>

            <button
              onClick={() => editPost(post.postId)}
              className="border-2 border-black text-gray-900 hover:bg-black hover:text-white transition-colors duration-300 ease-in-out px-2 py-1 rounded-md font-semibold"
            >
              {user.userId === post.userId ? "Edit" : "View"}
            </button>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Codeposts;
