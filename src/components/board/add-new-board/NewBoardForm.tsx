import useBoardStore from '@/stores/board-store/boardStore'
import { zodResolver } from '@hookform/resolvers/zod';
import { DotsGrid, Save01, Trash01 } from '@untitledui/icons';
import React, { useState } from 'react'
import { Input } from '@/components/base/input/input';
import { Button } from '@/components/base/buttons/button'; import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { Label } from '@/components/base/input/label';
import { useNavigate } from 'react-router';
import { Toggle } from '@/components/base/toggle/toggle';
import { defaultColumnsNames } from '@/consts/board/defaultColumnsName';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from '@hello-pangea/dnd';

export default function NewBoardForm() {
    const { addNewBoard } = useBoardStore()
    const navigate = useNavigate();

    const [showCustomColumns, setShowCustomColumns] = useState(false)
    const [customColNames, setCustomColNames] = useState(defaultColumnsNames)

    const addBoardSchema = z.object({
        title: z.string().min(3),
    });

    type AddBoardSchema = z.infer<typeof addBoardSchema>

    const {
        control,
        handleSubmit,
        formState: { isValid }
    } = useForm<AddBoardSchema>({
        resolver: zodResolver(addBoardSchema)
    });

    function addBoard(formData: AddBoardSchema) {
        const newBoardId = addNewBoard(formData.title, customColNames)

        setTimeout(() => {
            navigate(`/app/board/${newBoardId}`, { replace: true });
        }, 100)
    }

    function changeColumnName(newName: string, index: number) {
        setCustomColNames((prev) => {
            return prev.map((name, idx) => {
                return idx === index ? newName : name
            })
        })
    }

    function removeCustomColumnFromArray(index: number) {
        setCustomColNames(prev => prev.filter((_, idx) => idx !== index))
    }

    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;
        if (!destination) return;
        if (destination.index === source.index) return;
        const next = Array.from(customColNames);
        const [moved] = next.splice(source.index, 1);
        next.splice(destination.index, 0, moved);
        setCustomColNames(next);
    };

    return (
        <div className='flex flex-col gap-3 h-full justify-start'>
            <section className='flex-1 flex flex-col gap-4'>
                <Controller
                    name='title'
                    control={control}
                    render={({ field }) => (
                        <div>
                            <Label className='mb-2'>New board name</Label>
                            <Input size='sm' aria-label='Column name' defaultValue={field.value} onChange={field.onChange} className='flex-1' inputClassName=' text-[14px]' placeholder='Name' />
                        </div>
                    )}
                />
                <Toggle label="Custom default columns" size="sm" isSelected={showCustomColumns} onChange={setShowCustomColumns} />
                {showCustomColumns && (
                    <div className='flex flex-col gap-2'>
                        <div className='text-primary'>
                            <Button onClick={() => setCustomColNames(prev => [...prev, "New status"])} >Add new status</Button>
                        </div>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="status" direction="vertical">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className={`space-y-2 min-h-[120px] ${snapshot.isDraggingOver ? 'bg-primary' : 'bg-primary'}`}
                                    >
                                        {customColNames && customColNames.map((item, index) => (
                                            <Draggable key={index} draggableId={index.toString()} index={index}>
                                                {(draggableProvided, draggableSnapshot) => {
                                                    const element = (
                                                        <div
                                                            ref={draggableProvided.innerRef}
                                                            {...draggableProvided.draggableProps}
                                                            {...draggableProvided.dragHandleProps}
                                                            className="flex items-center justify-between gap-1 p-2 rounded-md shadow-sm border-secondary bg-secondary cursor-pointer text-primary"
                                                            style={{
                                                                ...draggableProvided.draggableProps.style,
                                                                zIndex: draggableSnapshot.isDragging ? 9999 : undefined,
                                                            }}
                                                        >
                                                            <div className='flex items-center gap-2'>
                                                                <DotsGrid size={16} className='mr-2' />
                                                                <span className='text-primary'>{index}.</span>
                                                                <input aria-label={item + "input"} value={item} onChange={({ target }) => changeColumnName(target.value, index)} />
                                                            </div>
                                                            <button className='cursor-pointer' onClick={() => removeCustomColumnFromArray(index)}><Trash01 size={16} color='var(--color-error-400)' /><span className="sr-only">Delete column</span></button>
                                                        </div>
                                                    );
                                                    return element;
                                                }}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                )}
            </section>

            <div className='flex justify-end self-end'>
                <Button
                    onClick={handleSubmit(addBoard)}
                    color='primary'
                    size='sm'
                    isDisabled={!isValid}
                >
                    <div className="flex items-center gap-2">
                        <Save01 size={16} />
                        <span>Add board</span>
                    </div>
                </Button>
            </div>

        </div>
    )
}