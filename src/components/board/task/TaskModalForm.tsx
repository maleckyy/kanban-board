import BorderlessInput from '@/styled-components/inputs/BorderlessInput'
import { Task } from '@/types/board/board.type'
import React, { useEffect } from 'react'
import { DotsHorizontal, Copy01, Flag01, CalendarPlus01, Trash01 } from '@untitledui/icons'
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

type PropsType = {
    task: Task
    deleteTaskFn: () => void
    updateTaskFn: (task: Task) => void
}

export default function TaskModalForm({ task, deleteTaskFn, updateTaskFn }: PropsType) {
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
                priority: task.priority.toString()
            })
        }
    }, [task, reset])

    function checkChanges(value: UpdateTaskSchemaType) {
        if (!task) return false
        if (value.title === task.title && value.description === task.description && value.priority === task.priority.toString()) {
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
                priority: Number(updatedValues.priority)
            }
            updateTaskFn(updatedTaskData)
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
                        <BorderlessInput defaultValue={field.value} onChange={field.onChange} className='flex-1 text-[18px]' />
                    )}
                />
                <Dropdown.Root>
                    <Button className="" color="secondary" iconTrailing={DotsHorizontal}></Button>
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
                <div className='grid gap-2 grid-cols-2'>
                    <div className='flex items-center gap-2 text-[14px]'>
                        <CalendarPlus01 size={15} /> Created at: {new Date(task.createdAt).toLocaleDateString()}
                    </div>
                    <div className='flex items-center gap-2 text-[14px]'>
                        <Flag01 size={15} fill={getTaskPriorityColor(Number(priorityValue))} />
                        Priority:
                        <Controller
                            name='priority'
                            control={control}
                            render={({ field }) => (
                                <select id="priority" name="priority" onChange={field.onChange} value={field.value} className='p-1 bg-primary'>
                                    {taskPriorityOptions.map(option => {
                                        return <option key={option.value} value={option.value} className="text-sm text-foreground bg-background">{option.label}</option>
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
                    <TextArea rows={10} className={'w-full'} defaultValue={field.value} onChange={field.onChange}></TextArea>
                )}
            />
        </section>
    )
}
