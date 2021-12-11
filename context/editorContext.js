import { createContext, useContext, useState } from "react";

const editorContext = createContext({
  openedPost: null,
  setOpenedPost: () => {},
  isCreator: false,
  setIsCreator: () => {},
});

export const useEditorContext = () => {
  return useContext(editorContext);
};

const EditorContextProvider = ({ children }) => {
  const [openedPost, setOpenedPost] = useState(null);
  const [isCreator, setIsCreator] = useState(false);

  const initialValue = {
    openedPost,
    setOpenedPost,
    isCreator,
    setIsCreator,
  };

  return (
    <editorContext.Provider value={initialValue}>
      {children}
    </editorContext.Provider>
  );
};

export default EditorContextProvider;
