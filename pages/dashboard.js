import { AnimateSharedLayout, motion } from "framer-motion";
import Head from "next/head";
import Codeposts from "../components/codeposts";
import Dashboardnavbar from "../components/dashboardnavbar";
import { getUserData, verifyAuthToken } from "../lib/authHelper";
import CodePost from "../models/CodePost";
import dbConnect from "../lib/mongodb";
import { useEffect, useState } from "react";
import { API } from "../constants";
import Search from "../components/search";
import axios from "axios";

const dashboard = (props) => {
  const { isLoggedIn, user, userPosts, publishedPosts } = props;

  const [publicPosts, setPublicPosts] = useState(publishedPosts || []);
  const [userMessage, setUserMessage] = useState("");
  const [publicMessage, setPublicMessage] = useState("");
  const [selected, setSelected] = useState(false);

  const searchCodePosts = async (searchQuery) => {
    try {
      const res = await axios.post(API.SEARCH, { searchQuery });

      if (res.data.data.length === 0) {
        setPublicMessage("No matching codets found");
      }
      setPublicPosts(res.data.data);
    } catch (err) {
      console.error(err);
      setPublicPosts([]);
    }
  };

  useEffect(() => {
    if (publicPosts.length === 0) {
      setPublicMessage("No public codets");
    } else {
      setPublicMessage("");
    }
    if (userPosts.length === 0) {
      setUserMessage("You have no saved codets");
    } else {
      setUserMessage("");
    }
  }, [publicPosts, userPosts]);

  return (
    <div className="h-full min-h-screen w-full bg-palewhite">
      <Head>
        <title>Dashboard</title>
      </Head>

      <Dashboardnavbar isLoggedIn={isLoggedIn} user={user} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="h-full w-full pt-8 p-4 flex flex-col"
      >
        <AnimateSharedLayout transition={{ duration: 2 }}>
          <div className="flex flex-row space-x-4 w-full mb-10 mx-4">
            <div
              className="flex flex-col cursor-pointer"
              onClick={() => setSelected(false)}
            >
              <p
                className={
                  "font-semibold text-lg lg:text-xl text-center transition duration-500 ease-in-out" +
                  (!selected ? " text-theme-red" : "")
                }
              >
                Public Codets
              </p>
              {!selected && (
                <motion.div
                  className="w-full h-1 bg-theme-red rounded-lg"
                  layoutId="underline"
                ></motion.div>
              )}
            </div>
            <div
              className="flex flex-col cursor-pointer"
              onClick={() => setSelected(true)}
            >
              <p
                className={
                  "font-semibold text-lg lg:text-xl text-center transition duration-500 ease-in-out" +
                  (selected ? " text-theme-red" : "")
                }
              >
                My Codets
              </p>
              {selected && (
                <motion.div
                  className="w-full h-1 bg-theme-red rounded-lg"
                  layoutId="underline"
                ></motion.div>
              )}
            </div>
          </div>
        </AnimateSharedLayout>

        {selected && (
          <div className="px-2 lg:px-10">
            <Codeposts posts={userPosts} user={user} />
            {userMessage && (
              <p className="text-theme-red text-center">{userMessage}</p>
            )}
          </div>
        )}

        {!selected && (
          <div className="px-2 lg:px-10">
            <Search searchCodePosts={searchCodePosts} />
            <div>
              <Codeposts posts={publicPosts} user={user} />
              {publicMessage && (
                <p className="text-theme-red text-center">{publicMessage}</p>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  // Get user codets
  const getUserPosts = async (userId) => {
    try {
      await dbConnect();

      const posts = await CodePost.find(
        { userId: userId },
        {
          _id: 1,
          userId: 1,
          postName: 1,
          createdDate: 1,
          description: 1,
          firstName: 1,
          lastName: 1,
        }
      ).lean();
      const newPosts = posts.map((post) => {
        return {
          postId: post._id.toString(),
          userId: post.userId,
          postName: post.postName,
          firstName: post.firstName || null,
          lastName: post.lastName || null,
          description: post.description || null,
          createdDate: Date(post.createdDate),
        };
      });
      return newPosts;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  // Get public codets
  const getPublicPosts = async () => {
    try {
      const posts = await CodePost.find(
        {
          published: true,
        },
        {
          _id: 1,
          userId: 1,
          postName: 1,
          createdDate: 1,
          description: 1,
          firstName: 1,
          lastName: 1,
        }
      )
        .sort({ createdDate: -1 })
        .limit(10)
        .lean();
      const newPosts = posts.map((post) => {
        return {
          postId: post._id.toString(),
          userId: post.userId,
          postName: post.postName,
          firstName: post.firstName || null,
          lastName: post.lastName || null,
          description: post.description || null,
          createdDate: Date(post.createdDate),
        };
      });
      return newPosts;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const { authToken } = ctx.req.cookies;

  const { isValid, data } = await verifyAuthToken(authToken);
  if (!isValid) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const [userData, userPosts, publicPosts] = await Promise.all([
    getUserData(data.userId),
    getUserPosts(data.userId),
    getPublicPosts(),
  ]);

  if (!userData) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      isLoggedIn: true,
      user: userData,
      userPosts,
      publishedPosts: publicPosts,
    },
  };
}

export default dashboard;
