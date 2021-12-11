// import { Controlled as ControlledEditor } from "react-codemirror2";
import dynamic from "next/dynamic";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material-darker.css";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowCloseSVG, ArrowExpandSVG } from "../assets/arrowSVG";
import { useMediaQuery } from "react-responsive";

const CodeMirror = dynamic(
  () => {
    import("codemirror/mode/javascript/javascript");
    import("codemirror/mode/xml/xml");
    import("codemirror/mode/css/css");
    return import("react-codemirror2").then((module) => module.Controlled);
  },
  { ssr: false }
);

const mediumVariants = {
  initial: {},
  animate: {
    width: "8%",
    transition: {
      duration: 1,
    },
  },
};

const smallVariants = {
  initial: {
    height: "100%",
  },
  animate: {
    height: "40px",
    transition: {
      duration: 1,
    },
  },
};

const Editor = (props) => {
  const isMedium = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const { titleName, codeLanguage, editorValue, setEditorValue } = props;
  const [closed, setClosed] = useState(false);

  const handleChange = (editor, data, value) => {
    setEditorValue(value);
  };

  return (
    <motion.div
      variants={isMedium ? mediumVariants : smallVariants}
      initial="initial"
      animate={closed ? "animate" : "initial"}
      className="flex flex-col shadow-xl w-full lg:w-1/3 rounded-md"
    >
      {/* Title */}
      <div className="flex justify-between items-center space-x-2 lg:space-x-4 bg-gray-300 p-2 shadow-xl rounded-t-md">
        <p className="font-semibold xl:text-lg hover:text-theme-red cursor-default">
          {titleName}
        </p>
        <div
          onClick={() => setClosed((prev) => !prev)}
          className="h-4 w-4 sm:h-5 sm:w-5 cursor-pointer hover:text-theme-red transition-colors duration-200 ease-in-out text-black"
        >
          {!closed && <ArrowCloseSVG />}
          {closed && <ArrowExpandSVG />}
        </div>
      </div>

      {CodeMirror && (
        <CodeMirror
          className="flex-grow overflow-hidden rounded-b-md z-10"
          value={editorValue}
          onBeforeChange={handleChange}
          editorDidMount={(editor) => {
            editor.setSize("100%", "");
          }}
          options={{
            lineWrapping: true,
            lint: true,
            mode: codeLanguage,
            lineNumbers: true,
            theme: "material-darker",
          }}
        />
      )}
    </motion.div>
  );
};

export default Editor;
