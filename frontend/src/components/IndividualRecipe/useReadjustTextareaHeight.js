import { useEffect } from "react";


// element: ref to text area
// value: the actua value of the textarea

// resize anytime element or value changes
const useReadjustTextareaHeight = (element, value) => {
  useEffect(() => {
    if (!element) return;

    element.current.style.height = "auto";
    element.current.style.height = element.current.scrollHeight + "px";
  }, [element, value]);
};

export default useReadjustTextareaHeight;
