import { Checkbox, HStack, Stack, Text } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { useRef } from "react";
import { createRef, RefObject, useState, useEffect } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { ITodo, ITodoItem } from "../types";
import { setCaretToEnd } from "../utils";

function Todo(props: { todo: ITodo }) {
  const [todo, setTodo] = useState(props.todo);
  const [elRefs, setElRefs] = useState<Array<RefObject<HTMLElement>>>([]);

  const arrLength = todo.items.length;

  useEffect(() => {
    // Add or Remove Refs
    const newRefs = Array(arrLength)
      .fill(undefined)
      .map((_, i) => elRefs[i] || createRef());
    setElRefs(newRefs);
  }, [arrLength]); // eslint-disable-line react-hooks/exhaustive-deps

  const prevArrLen = useRef(arrLength);
  useEffect(() => {
    console.log("prevArrLen", prevArrLen.current, arrLength);

    if (prevArrLen.current < arrLength) {
      console.log("elRefs", elRefs);

      setCaretToEnd(elRefs[arrLength - 1].current);
      prevArrLen.current = arrLength;
    }
  }, [elRefs.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChangeItem = (target: ITodoItem) => {
    const newItems = todo.items.map((v) => (v.id === target.id ? target : v));
    setTodo({ ...todo, items: newItems });
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        if (index !== arrLength - 1) {
          setCaretToEnd(elRefs[index + 1].current);
        } else {
          setTodo({
            ...todo,
            items: [
              ...todo.items,
              {
                id: nanoid(),
                checked: false,
                text: "",
              },
            ],
          });
        }
        return;
      case "ArrowDown":
        e.preventDefault();
        if (index !== arrLength - 1) {
          setCaretToEnd(elRefs[index + 1].current);
        }
        return;
      case "ArrowUp":
        e.preventDefault();
        if (index !== 0) {
          setCaretToEnd(elRefs[index - 1].current);
        }
        return;
      default:
        return;
    }
  };

  return (
    <Stack flex={1}>
      <Text fontWeight="bold"> {todo.title}</Text>
      <Stack flex={1}>
        {todo.items.map((v, i) => (
          <TodoItem
            forwardRef={elRefs[i]}
            key={v.id}
            item={v}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onChange={handleChangeItem}
          />
        ))}
      </Stack>
    </Stack>
  );
}

function TodoItem({
  item,
  onChange,
  onKeyDown,
  forwardRef,
}: {
  item: ITodoItem;
  onChange: (value: ITodoItem) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  forwardRef: RefObject<HTMLElement>;
}) {
  const handleChecked = () => onChange({ ...item, checked: !item.checked });

  const handleChangeText = (evt: ContentEditableEvent) =>
    onChange({ ...item, text: evt.target.value });

  return (
    <HStack flex={1}>
      <Checkbox isChecked={item.checked} onChange={handleChecked} />
      <ContentEditable
        style={{ width: "100%" }}
        innerRef={forwardRef}
        onKeyDown={onKeyDown}
        html={item.text}
        onChange={handleChangeText}
      />
    </HStack>
  );
}

export default Todo;
