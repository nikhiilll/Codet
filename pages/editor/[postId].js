import axios from "axios";
import { useEffect, useState } from "react";
import Head from "next/head";
import { getUserData, verifyAuthToken } from "../../lib/authHelper";
import CodePost from "../../models/CodePost";
import dbConnect from "../../lib/mongodb";
import Editor from "../../components/editor";
import EditorNavbar from "../../components/editornavbar";
import Modal from "../../components/modal";
import SavePost from "../../components/savePost";
import { API } from "../../constants";
import Snackbar from "../../components/snackbar";

const EditPost = (props) => {
  const { codePost, user, isCreator, isLoggedIn } = props;

  const [htmlValue, setHtmlValue] = useState(codePost.code.html || "");
  const [cssValue, setCssValue] = useState(codePost.code.css || "");
  const [jsValue, setJsValue] = useState(codePost.code.js || "");
  const [sourceDoc, setSourceDoc] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const updateCodePost = async (postName, published, description) => {
    const postData = {
      ...user,
      postId: codePost.postId,
      postName,
      published,
      description,
      code: {
        js: jsValue,
        css: cssValue,
        html: htmlValue,
      },
    };

    try {
      const res = await axios.put(API.CODE, postData);
      setOpenModal(false);
      if (res.data.success) {
        setSnackbarMessage("Your code is updated!");
        setShowSnackbar(true);
      } else {
        setSnackbarMessage(res.data.data);
        setShowSnackbar(true);
      }
    } catch (err) {
      setOpenModal(false);
      setSnackbarMessage(err.response.data.data);
      setShowSnackbar(true);
      console.log(err);
      return err.response;
    }
    setTimeout(() => setShowSnackbar(false), 4000);
  };

  useEffect(() => {
    setSourceDoc(`
    <html>
      <body>${htmlValue}</body>
      <style>${cssValue}</style>
      <script>${jsValue}</script>
    </html>
  `);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSourceDoc(`
    <html>
      <body>${htmlValue}</body>
      <style>${cssValue}</style>
      <script>${jsValue}</script>
    </html>
  `);
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [htmlValue, cssValue, jsValue]);

  return (
    <>
      <Head>
        <title>Editor</title>
      </Head>
      <div className="w-screen lg:h-screen flex flex-col">
        <EditorNavbar
          {...user}
          isOpen={openModal}
          openModal={setOpenModal}
          isCreator={isCreator}
          isLoggedIn={isLoggedIn}
          existingCode={true}
        />

        {/* Code Editors */}
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:h-1/2 w-full lg:space-x-2 p-4 bg-palewhite border-b border-gray-200">
          <Editor
            titleName="HTML"
            codeLanguage="xml"
            editorValue={htmlValue}
            setEditorValue={setHtmlValue}
          />
          <Editor
            titleName="CSS"
            codeLanguage="css"
            editorValue={cssValue}
            setEditorValue={setCssValue}
          />
          <Editor
            titleName="JS"
            codeLanguage="javascript"
            editorValue={jsValue}
            setEditorValue={setJsValue}
          />
        </div>

        {/* Code preview */}
        <div className="lg:h-1/2 overflow-scroll">
          <iframe
            srcDoc={sourceDoc}
            title="Preview"
            sandbox="allow-scripts"
            frameBorder="0"
            width="100%"
            height="100%"
            className="max-w-full"
          ></iframe>
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <Modal setIsOpen={setOpenModal}>
          <SavePost
            saveCode={updateCodePost}
            existingPost={true}
            isCreator={isCreator}
            codePost={codePost}
          />
        </Modal>
      )}
      {showSnackbar && <Snackbar message={snackbarMessage}></Snackbar>}
    </>
  );
};

export async function getServerSideProps(ctx) {
  const getCodePost = async (postId) => {
    try {
      await dbConnect();

      const post = await CodePost.findById({ _id: postId }).lean();

      const codePost = {
        postId: post._id.toString(),
        userId: post.userId,
        postName: post.postName,
        firstName: post.firstName,
        description: post.description || null,
        lastName: post.lastName,
        published: post.published,
        code: {
          css: post.code.css,
          js: post.code.js,
          html: post.code.html,
        },
        createdDate: Date(post.createdDate),
      };

      return codePost;
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

  const { params } = ctx;

  const [userData, codePost] = await Promise.all([
    getUserData(data.userId),
    getCodePost(params.postId),
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
      codePost,
      isCreator: userData.userId === codePost.userId,
    },
  };
}

export default EditPost;
