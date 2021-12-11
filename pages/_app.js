import "tailwindcss/tailwind.css";
import EditorContextProvider from "../context/editorContext";
import { UserContextProvider } from "../context/userContext";

function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <EditorContextProvider>
        <Component {...pageProps} />
      </EditorContextProvider>
    </UserContextProvider>
  );
}

export default MyApp;
