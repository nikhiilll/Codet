import { useEffect, useState } from "react";
import Editor from "../../components/editor";
import EditorNavbar from "../../components/editornavbar";
import Modal from "../../components/modal";
import SavePost from "../../components/savePost";
import { useUserContext } from "../../context/userContext";
import { API } from "../../constants";
import axios from "axios";
import Snackbar from "../../components/snackbar";
import Head from "next/head";

const CodeEditor = () => {
  const userCtx = useUserContext();

  const [htmlValue, setHtmlValue] = useState("");
  const [cssValue, setCssValue] = useState("");
  const [jsValue, setJsValue] = useState("");
  const [sourceDoc, setSourceDoc] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const saveCodePost = async (postName, published, description) => {
    const postData = {
      ...userCtx.user,
      postName,
      description,
      published,
      code: {
        js: jsValue,
        css: cssValue,
        html: htmlValue,
      },
    };

    try {
      const res = await axios.post(API.CODE, postData);
      setOpenModal(false);
      if (res.data.success) {
        setSnackbarMessage("Your code is saved!");
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
    }
    setTimeout(() => setShowSnackbar(false), 3000);
  };

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
          {...userCtx}
          isOpen={openModal}
          openModal={setOpenModal}
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
          <SavePost saveCode={saveCodePost} />
        </Modal>
      )}
      {showSnackbar && <Snackbar message={snackbarMessage}></Snackbar>}
    </>
  );
};

export default CodeEditor;
