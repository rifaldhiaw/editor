import { VStack } from "@chakra-ui/react";
import { useState } from "react";
import { DropResult, DragDropContext, Droppable } from "react-beautiful-dnd";
import dummy from "../dummy";
import { reorder } from "../utils";
import Block from "./Block";

export default function Editor() {
  const [blocks, setBlocks] = useState(dummy);
  const [visibleHandlerId, setVisibleHandlerId] = useState("");

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (blocks.length) {
      const newBlocks = reorder(
        blocks,
        result.source.index,
        result.destination.index
      );

      setBlocks(newBlocks);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <VStack
            align="stretch"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {blocks.map((v, index) => (
              <Block
                key={v.id}
                block={v}
                index={index}
                isDragVisible={visibleHandlerId === v.id}
                onMouseMove={() =>
                  !snapshot.isDraggingOver && visibleHandlerId !== v.id
                    ? setVisibleHandlerId(v.id)
                    : null
                }
              />
            ))}
            {provided.placeholder}
          </VStack>
        )}
      </Droppable>
    </DragDropContext>
  );
}
