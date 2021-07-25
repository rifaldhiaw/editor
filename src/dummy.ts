import { nanoid } from "nanoid";
import { IBlock } from "./types";

const data: IBlock[] = [
  {
    id: nanoid(),
    kind: "simpleNote",
    data: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam quibusdam laboriosam accusantium! Necessitatibus officia eaque totam, possimus dignissimos reprehenderit harum!",
  },
  {
    id: nanoid(),
    kind: "todo",
    title: "My Todo",
    items: [
      { id: nanoid(), checked: false, text: "Make something" },
      { id: nanoid(), checked: false, text: "Lorem todo" },
      { id: nanoid(), checked: false, text: "Is it work?" },
    ],
  },
  {
    id: nanoid(),
    kind: "simpleNote",
    data: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. ",
  },
  {
    id: nanoid(),
    kind: "todo",
    title: "My Todo 2",
    items: [
      { id: nanoid(), checked: false, text: "Make something" },
      { id: nanoid(), checked: false, text: "Lorem todo" },
    ],
  },
];

export default data;
