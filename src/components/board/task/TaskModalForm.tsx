import BorderlessInput from '@/styled-components/inputs/BorderlessInput'
import { BoardColumnSelectType, Task } from '@/types/board/board.type'
import React, { useEffect, useRef } from 'react'
import { DotsHorizontal, Copy01, Flag01, CalendarPlus01, Trash01, CalendarCheck02, Asterisk01 } from '@untitledui/icons'
import { TextArea } from 'react-aria-components'
import { BadgeWithIcon } from '@/components/base/badges/badges'
import { getTaskPriorityColor } from '../utils/getTaskPriorityColor'
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { useGlobalModal } from '@/components/application/modals/AppModal'
import { removeSearchParam } from '../utils/removeSearchParam'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateTaskSchema } from '@/schemas/board/task/task.schema'
import { Controller, useForm } from 'react-hook-form'
import { taskPriorityOptions } from '../utils/taskPriorityOptions'
import { DatePicker } from '@/components/application/date-picker/date-picker'
import { parseDate } from "@internationalized/date";

type PropsType = {
    task: Task
    deleteTaskFn: () => void
    updateTaskFn: (colId: string, task: Task) => void
    boardColumnsData: BoardColumnSelectType[]
}

export default function TaskModalForm({ task, deleteTaskFn, updateTaskFn, boardColumnsData }: PropsType) {
    const titleInputRef = useRef<HTMLInputElement | null>(null)
    type UpdateTaskSchemaType = z.infer<typeof updateTaskSchema>;
    const {
        reset,
        control,
        getValues,
        watch
    } = useForm<UpdateTaskSchemaType>({
        resolver: zodResolver(updateTaskSchema)
    });

    const priorityValue = watch("priority");

    useEffect(() => {
        if (task) {
            reset({
                title: task.title,
                description: task.description ?? '',
                priority: task.priority.toString(),
                endDate: task.dueDate,
                columnId: task.columnId
            })
        }
    }, [task, reset])

    useEffect(() => {
        setTimeout(() => {
            if (task && titleInputRef.current && task.title === "New task") {
                const input = titleInputRef.current;
                input.focus();
                const length = input.value.length;
                input.setSelectionRange(length, length);
            }
        }, 50)
    }, []);

    function checkChanges(value: UpdateTaskSchemaType) {
        if (!task) return false
        if (value.title === task.title && value.description === task.description && value.priority === task.priority.toString() && value.endDate === task.dueDate && value.columnId === task.columnId) {
            return false
        }
        return true
    }

    const { } = useGlobalModal(() => {
        const updatedValues = getValues()

        if (checkChanges(updatedValues)) {
            const updatedTaskData: Task = {
                ...task,
                title: updatedValues.title.trim() === '' ? 'Task title' : updatedValues.title,
                description: updatedValues.description ?? '',
                priority: Number(updatedValues.priority),
                dueDate: updatedValues.endDate,
                columnId: updatedValues.columnId
            }
            updateTaskFn(updatedTaskData.columnId, updatedTaskData)
        }
        removeSearchParam("task");
    })

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            alert("Skopiowano do schowka! 📋");
        } catch (err) {
            console.error("Nie udało się skopiować: ", err);
        }
    };

    return (
        <section className='flex flex-col gap-3'>
            <div className='flex gap-2 items-center'>
                <Controller
                    name='title'
                    control={control}
                    render={({ field }) => (
                        <BorderlessInput defaultValue={field.value} onChange={field.onChange} className='flex-1 text-[18px]' ref={titleInputRef} />
                    )}
                />
                <Dropdown.Root>
                    <Button color="secondary" iconTrailing={DotsHorizontal}></Button>
                    <Dropdown.Popover>
                        <Dropdown.Menu>
                            <Dropdown.Item icon={Trash01} onClick={deleteTaskFn}>
                                Delete
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown.Popover>
                </Dropdown.Root>
            </div>

            <div className='flex flex-col gap-2'>
                <BadgeWithIcon type="modern" size="md" iconLeading={Copy01} onClick={() => copyToClipboard(task.id)} className='cursor-copy'>
                    <span>
                        Task ID: {task.id}
                    </span>
                </BadgeWithIcon>


                <div className='grid gap-1 md:grid-rows-2  md:grid-cols-2 items-start auto-rows-fr grid-cols-1 grid-rows-1'>
                    <div className='flex items-center gap-2 text-[14px] h-full'>
                        <div className='flex items-center gap-2 w-25'>
                            <CalendarPlus01 size={15} className='mb-0.5' /> Created at: </div>{new Date(task.createdAt).toLocaleDateString()}
                    </div>

                    <div className='flex items-center gap-2 text-[14px] h-full'>
                        <div className='flex items-center gap-2 w-25'>
                            <Flag01 size={15} fill={getTaskPriorityColor(Number(priorityValue))} className='mb-0.5' />
                            Priority:
                        </div>
                        <Controller
                            name='priority'
                            control={control}
                            render={({ field }) => (
                                <select id="priority" name="priority" onChange={field.onChange} value={field.value} className='py-2 px-3 bg-primary border-secondary! rounded-lg'>
                                    {taskPriorityOptions.map(option => {
                                        return <option key={option.value} value={option.value} className="text-sm text-foreground bg-background">{option.label}</option>
                                    })}
                                </select>
                            )}
                        />
                    </div>
                    <div className='flex items-center gap-2 text-[14px] h-full'>
                        <div className='flex items-center gap-2 w-25'>
                            <CalendarCheck02 size={14} className='mb-0.5' />
                            Due date:
                        </div>
                        <Controller
                            name="endDate"
                            control={control}
                            render={({ field }) => {
                                const valueAsDateValue = field.value
                                    ? parseDate(field.value)
                                    : null;

                                return (
                                    <DatePicker
                                        hideIcon
                                        buttonClassName='py-1 px-2'
                                        value={valueAsDateValue}
                                        aria-label='Task due date'
                                        onChange={(dateValue) => {
                                            if (!dateValue) {
                                                field.onChange("");
                                                return;
                                            }
                                            field.onChange(dateValue.toString());
                                        }}
                                    />
                                );
                            }}
                        />
                    </div>
                    <div className='flex items-center gap-2 text-[14px] h-full'>
                        <div className='flex items-center gap-2 w-25'>
                            <Asterisk01 size={15} className='mb-0.5' />
                            Status:
                        </div>
                        <Controller
                            name='columnId'
                            control={control}
                            render={({ field }) => (
                                <select id="columnId" name="columnId" className='py-2 px-3 bg-primary border-secondary! rounded-lg' onChange={field.onChange} value={field.value}>
                                    {boardColumnsData.map(option => {
                                        return <option key={option.id} value={option.id} className="text-sm text-foreground bg-background">{option.name}</option>
                                    })}
                                </select>
                            )}
                        />
                    </div>
                </div>
            </div>

            <hr></hr>

            <Controller
                name='description'
                control={control}
                render={({ field }) => (
                    <TextArea rows={10} className={'w-full p-1'} defaultValue={field.value} onChange={field.onChange}></TextArea>
                )}
            />
        </section>
    )
}
