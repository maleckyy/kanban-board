import { useEffect, useMemo } from "react";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult
} from "@hello-pangea/dnd";

import { useLocation } from "react-router";
import useBoardStore from "@/stores/board-store/boardStore";
import { Task } from "@/types/board/board.type";
import { cx } from "@/utils/cx";
import { reorderList } from "./utils/reorderList";
import SingleTaskBox from "./single-task-item/SingleTaskBox";
import AddNewTaskButton from "./board-components/AddNewTaskButton";
import { useBoardViewStore } from "@/stores/board-store/boardViewStore";
import AddNewStatusButton from "./board-components/AddNewStatusButton";
import { useGlobalModal } from "../application/modals/AppModal";
import TaskModalForm from "./task/TaskModalForm";
import { setSearchParam } from "./utils/setSearchParam";

export default function BoardContent() {
    const location = useLocation();
    const params = new URLSearchParams(window.location.search);

    const taskIdInParams = useMemo(() => params.get("task"), [params]);
    const boardId = useMemo(() => location.pathname.split("/").pop(), [location]);

    const { boards, updateTask, deleteTask, addNewTask: createNewTask, updateColumns: updateColumn } = useBoardStore(state => state)

    const board = boards.find(b => b.board.id === boardId);
    const view = useBoardViewStore(state => state.boardView);

    const { openModal, closeModal } = useGlobalModal();

    function deleteTaskFn(colId: string, taskId: string) {
        if (!boardId) return;
        deleteTask(boardId, colId, taskId);
        closeModal();
    }

    function updateTaskData(colId: string, task: Task) {
        if (boardId) updateTask(boardId, colId, task)
    }

    function openTaskDialog(colId: string, task?: Task) {
        if (!board || !boardId) return;

        const newTask: Task | null = task ?? createNewTask(boardId, colId);
        const id = task?.id ?? newTask?.id;

        if (id) setSearchParam("task", String(id));

        const taskForModal = task ?? newTask;
        if (taskForModal) {
            openModal({
                content: <TaskModalForm task={taskForModal} deleteTaskFn={() => deleteTaskFn(colId, taskForModal.id)} updateTaskFn={(task: Task) => updateTaskData(colId, task)} />,
                modalWidth: 800,
                dataTestId: "board-task-modal",
                hideCloseButton: true
            });
        }
    }

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!boardId || !destination || !board) return;

        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }

        const cols = Array.from(board.columns);
        const sourceColIndex = cols.findIndex(c => c.id === source.droppableId);
        const destColIndex = cols.findIndex(c => c.id === destination.droppableId);

        if (sourceColIndex === -1 || destColIndex === -1) return;

        const sourceCol = { ...cols[sourceColIndex] };
        const destCol = { ...cols[destColIndex] };
        const sourceTasks = Array.from(sourceCol.tasks);
        const destTasks = Array.from(destCol.tasks);

        if (source.droppableId === destination.droppableId) {
            const newTasks = reorderList(sourceTasks, source.index, destination.index);
            const newCols = cols.slice();
            newCols[sourceColIndex] = { ...sourceCol, tasks: newTasks.map((t, i) => ({ ...t, position: i })) };
            updateColumn(boardId, newCols);
            return;
        }

        const [moved] = sourceTasks.splice(source.index, 1);
        const movedUpdated: Task = { ...moved, columnId: destCol.id };
        destTasks.splice(destination.index, 0, movedUpdated);

        const newSourceCol = { ...sourceCol, tasks: sourceTasks.map((t, i) => ({ ...t, position: i })) };
        const newDestCol = { ...destCol, tasks: destTasks.map((t, i) => ({ ...t, position: i })) };
        const newCols = cols.slice();
        newCols[sourceColIndex] = newSourceCol;
        newCols[destColIndex] = newDestCol;

        updateColumn(boardId, newCols);
    };

    useEffect(() => {
        if (!board || !taskIdInParams) return;

        board.columns.forEach(col => {
            const existingTask = col.tasks.find(task => task.id === taskIdInParams);
            if (existingTask) {
                openModal({
                    content: <TaskModalForm task={existingTask} deleteTaskFn={() => deleteTaskFn(col.id, existingTask.id)} updateTaskFn={(task: Task) => updateTaskData(col.id, task)} />,
                    modalWidth: 800,
                    dataTestId: "board-task-modal",
                    hideCloseButton: true
                });
            }
        });
    }, [taskIdInParams]);

    if (!board) return

    return (
        <div
            className={cx(
                "flex flex-row justify-start items-start gap-4 flex-nowrap overflow-x-auto w-full",
                view === "list" ? "flex-col" : "flex-row"
            )}
        >
            <DragDropContext onDragEnd={onDragEnd}>
                {board.columns.map(col => (
                    <Droppable droppableId={col.id.toString()} key={col.id}>
                        {provided => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={cx(
                                    "shrink-0 p-4 bg-primary rounded-xl border-secondary border",
                                    view === "list" ? "w-full" : "w-[264px] min-h-60"
                                )}
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold uppercase text-primary text-[13px]">{col.name}</h3>
                                    <div className="flex gap-2 text-primary">
                                        <AddNewTaskButton noText onClick={() => openTaskDialog(col.id)} />
                                    </div>
                                </div>

                                {col.tasks.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                        {provided => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="p-2 mb-2 bg-secondary rounded shadow cursor-pointer"
                                            >
                                                <SingleTaskBox
                                                    task={item}
                                                    openDialog={() => openTaskDialog(col.id, item)}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}

                                {provided.placeholder}
                                <AddNewTaskButton onClick={() => openTaskDialog(col.id)} />
                            </div>
                        )}
                    </Droppable>
                ))}
            </DragDropContext>
            <AddNewStatusButton boardId={boardId as string} />
        </div>
    );
}
