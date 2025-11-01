import { Plus } from "@untitledui/icons";
import { Table, TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import useTaskStore from "@/stores/task-store/taskStore";
import { useGlobalModal } from "@/components/application/modals/AppModal";
import ModalTaskForm from "./ModalTaskForm";
import { emptyDataHelper } from "@/utils/text-values/emptyDataHelper";
import TableActions from "./TableActions";
import { useCallback } from "react";
import { TaskItem } from "@/types/task/task.type";

export const TaskTable = () => {
    const { openModal } = useGlobalModal();
    const tasks = useTaskStore(state => state.tasks)
    const deleteTask = useTaskStore(state => state.removeTask)
    const toggleTaskStatus = useTaskStore(state => state.toggleTask)
    const removeCompleted = useTaskStore(state => state.removeCompleted)
    const finishedTasks: number = tasks.filter(task => task.isDone === true).length

    function openAddTaskDialog() {
        openModal({
            title: "Add new task",
            modalWidth: 500,
            dataTestId: "add-task-modal",
            content: <ModalTaskForm />
        })
    }

    const editTask = useCallback((task: TaskItem) => {
        openModal({
            title: "Edit task",
            modalWidth: 500,
            dataTestId: "Edit-task-modal",
            content: <ModalTaskForm taskData={task} />
        })
    }, [openModal])

    return (
        <TableCard.Root>
            <TableCard.Header
                title="All tasks"
                badge={`${finishedTasks}/${tasks.length} tasks`}
                contentTrailing={
                    <div className="flex items-center gap-3">
                        <Button size="sm" iconLeading={Plus} onClick={openAddTaskDialog}>
                            Add
                        </Button>
                    </div>
                }
            />
            <Table aria-label="All tasks">
                <Table.Header className="bg-primary">
                    <Table.Head id="status" label="Status" className="w-16" />
                    <Table.Head id="name" label="Task name" isRowHeader />
                    <Table.Head id="desc" label="Description" />
                    <Table.Head id="actions" className='w-16'>
                        <Button size="sm" color="secondary-destructive" onClick={removeCompleted} isDisabled={finishedTasks === 0}>Delete selected</Button>
                    </Table.Head>
                </Table.Header>
                <Table.Body items={tasks}>
                    {(item) => (
                        <Table.Row id={item.id} className="odd:bg-secondary_subtle" key={item.id}>
                            <Table.Cell className="whitespace-nowrap">
                                <div className="flex justify-center items-center">
                                    <Checkbox size="sm" isSelected={item.isDone} onChange={() => { toggleTaskStatus(item.id) }} />
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="flex items-center gap-3">
                                    <div className="whitespace-nowrap">
                                        <p className="text-sm font-medium text-primary">{item.title}</p>
                                        <p className="text-sm text-tertiary">{new Date(item.createDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap">{emptyDataHelper(item.description, "No description")}</Table.Cell>
                            <Table.Cell className="px-4">
                                <div className="flex items-center justify-end">
                                    <TableActions deleteFn={() => deleteTask(item.id)} editFn={() => editTask(item)} />
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </TableCard.Root>
    );
};
