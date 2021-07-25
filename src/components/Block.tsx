import { DragHandleIcon } from "@chakra-ui/icons";
import { HStack, Box, Flex } from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";
import { IBlock } from "../types";
import Note from "./Note";
import Todo from "./Todo";

export default function Block(props: {
  block: IBlock;
  index: number;
  isDragVisible: boolean;
  onMouseMove: React.MouseEventHandler<HTMLDivElement>;
}) {
  function renderBlockItem(v: IBlock) {
    switch (v.kind) {
      case "todo":
        return <Todo todo={v} />;
      case "simpleNote":
        return <Note value={v} />;
      default:
        return null;
    }
  }

  return (
    <Draggable
      key={props.block.id}
      draggableId={props.block.id}
      index={props.index}
    >
      {(provided, snapshot) => (
        <HStack
          onMouseMove={props.onMouseMove}
          ref={provided.innerRef}
          align="stretch"
          bg="white"
          shadow={snapshot.isDragging ? "lg" : "none"}
          {...provided.draggableProps}
          py="2"
        >
          <Box
            opacity={props.isDragVisible ? 1 : 0}
            w="12px"
            ml="2"
            mr="1"
            rounded="sm"
            {...provided.dragHandleProps}
          >
            <DragHandleIcon />
          </Box>

          <Flex flex={1}>{renderBlockItem(props.block)}</Flex>
        </HStack>
      )}
    </Draggable>
  );
}
