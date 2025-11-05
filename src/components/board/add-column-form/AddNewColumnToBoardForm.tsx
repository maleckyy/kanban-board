import React from 'react'
import { Save01 } from '@untitledui/icons'
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '@/components/base/input/input';
import { Button } from '@/components/base/buttons/button';
import useBoardStore from '@/stores/board-store/boardStore';

type PropsType = {
    boardId: string
}

export default function AddNewColumnToBoardForm({ boardId }: PropsType) {

    const addColumnSchema = z.object({
        name: z.string().min(3),
    });

    type AddColSchema = z.infer<typeof addColumnSchema>

    const {
        control,
        handleSubmit,
        formState: { isValid }
    } = useForm<AddColSchema>({
        resolver: zodResolver(addColumnSchema)
    });

    const { addNewColumn } = useBoardStore()

    function addColumnToBoard(formData: AddColSchema) {
        addNewColumn(boardId, formData.name)
    }

    return (
        <div className='flex gap-2 items-center'>
            <Controller
                name='name'
                control={control}
                render={({ field }) => (
                    <Input size='sm' aria-label='Column name' defaultValue={field.value} onChange={field.onChange} className='flex-1' inputClassName=' text-[14px]' />
                )}
            />
            <Button onClick={handleSubmit(addColumnToBoard)} color='primary' size='sm' isDisabled={!isValid}><Save01 /><span className="sr-only">Add column</span></Button>
        </div>
    )
}
