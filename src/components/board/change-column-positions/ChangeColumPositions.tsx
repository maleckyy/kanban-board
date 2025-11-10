import { Button } from '@/components/base/buttons/button';
import useBoardStore from '@/stores/board-store/boardStore';
import { BoardColumn } from '@/types/board/board.type';
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { DotsGrid } from '@untitledui/icons';
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import ColumnDelete from './ColumnDelete';

type PropsType = {
    boardId: string
    closeDialog: () => void
}

export default function ChangeColumPositions({ boardId, closeDialog }: PropsType) {
    const [items, setItems] = useState<BoardColumn[]>([]);
    const board = useBoardStore((state) => state.boards.find(b => b.board.id === boardId))
    const { updateColumns: updateBoardColumns, deleteColumn } = useBoardStore()

    const [_, setDraggedEl] = useState<React.ReactNode | null>(null);
    const [__, setIsChanged] = useState<boolean>(false)

    const onDragEnd = (result: DropResult) => {
        setDraggedEl(null);
        const { destination, source } = result;
        if (!destination) return;
        if (destination.index === source.index) return;
        const next = Array.from(items);
        const [moved] = next.splice(source.index, 1);
        next.splice(destination.index, 0, moved);
        setItems(next);
    };

    function saveChanges() {
        const newColsPositions: BoardColumn[] = items.map((item, index) => ({
            ...item,
            position: index,
        }));
        updateBoardColumns(boardId, newColsPositions)
        closeDialog()
    }

    function deleteColumnById(colId: string) {
        deleteColumn(boardId, colId)
    }

    useEffect(() => {
        const changed = items.some((item, index) => item.position !== index);
        setIsChanged(changed);
    }, [items]);

    useEffect(() => {
        if (board) setItems(board.columns)
    }, [board])

    useEffect(() => {
        const body = document.body;
        const currentStyle = body.getAttribute('style') || '';
        const styleToRemove = 'pointer-events: none;';
        const newStyle = currentStyle.replace(new RegExp(styleToRemove.trim() + '\\s*'), '').trim();

        if (newStyle !== currentStyle) {
            if (newStyle) {
                body.setAttribute('style', newStyle);
            } else {
                body.removeAttribute('style');
            }
        }
    }, []);

    return (
        <div className="w-full">
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="status" direction="vertical">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`space-y-2 min-h-[120px] ${snapshot.isDraggingOver ? 'bg-primary' : 'bg-primary'}`}
                        >
                            {board && items.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(draggableProvided, draggableSnapshot) => {
                                        const element = (
                                            <div
                                                ref={draggableProvided.innerRef}
                                                {...draggableProvided.draggableProps}
                                                {...draggableProvided.dragHandleProps}
                                                className="flex items-center gap-2 p-2 rounded-md shadow-sm border-secondary bg-secondary cursor-pointer text-primary"
                                                style={{
                                                    ...draggableProvided.draggableProps.style,
                                                    zIndex: draggableSnapshot.isDragging ? 9999 : undefined,
                                                }}
                                            >
                                                <DotsGrid size={16} />
                                                <span className="small-text-title font-semibold">{index + 1}. {item.name}</span>
                                                <ColumnDelete deleteColumn={() => deleteColumnById(item.id)} />
                                            </div>
                                        );

                                        if (draggableSnapshot.isDragging) {
                                            return ReactDOM.createPortal(element, document.body);
                                        }

                                        return element;
                                    }}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <div className='mt-4 flex flex-row gap-2 justify-end'>
                <Button color={'primary-destructive'} onClick={closeDialog}>Cancel</Button>
                <Button color={'primary'} onClick={saveChanges}>Save</Button>
            </div>
        </div>
    );

}
