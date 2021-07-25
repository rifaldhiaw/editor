import { useEffect, useRef } from "react";

export const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const setCaretToEnd = (element: any) => {
  // Create a new range
  const range = document.createRange();
  // Get the selection object
  const selection = window.getSelection();
  // Select all the content from the contenteditable element
  range.selectNodeContents(element);
  // Collapse it to the end, i.e. putting the cursor to the end
  range.collapse(false);
  // Clear all existing selections
  selection?.removeAllRanges();
  // Put the new range in place
  selection?.addRange(range);
  // Set the focus to the contenteditable element
  element.focus();
};

export function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
