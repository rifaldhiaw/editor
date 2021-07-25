export type IBlock = INote | ITodo;

export type INote = {
  id: string;
  kind: "simpleNote";
  data: string;
};

export type ITodo = {
  id: string;
  kind: "todo";
  title: string;
  items: ITodoItem[];
};

export type ITodoItem = {
  id: string;
  checked: boolean;
  text: string;
};
