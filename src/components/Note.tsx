import { useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { INote } from "../types";

function Note({ value }: { value: INote }) {
  const [note, setNote] = useState(value);

  const handleChangeText = (evt: ContentEditableEvent) =>
    setNote({ ...note, data: evt.target.value });

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement> & { target: { blur: () => void } }
  ) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.target.blur();
    }
  };

  return (
    <ContentEditable
      onKeyDown={handleKeyDown}
      style={{ width: "100%" }}
      html={note.data}
      onChange={handleChangeText}
    />
  );
}

export default Note;
