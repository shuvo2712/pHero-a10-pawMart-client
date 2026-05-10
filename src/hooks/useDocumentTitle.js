import { useEffect } from "react";

const useDocumentTitle = (title) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} | PawMart`;
    }
  }, [title]);
};

export default useDocumentTitle;
