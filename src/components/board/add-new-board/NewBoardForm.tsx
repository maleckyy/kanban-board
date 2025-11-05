import useBoardStore from '@/stores/board-store/boardStore'
import { zodResolver } from '@hookform/resolvers/zod';
import { Save01 } from '@untitledui/icons';
import React from 'react'
import { Input } from '@/components/base/input/input';
import { Button } from '@/components/base/buttons/button'; import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { Label } from '@/components/base/input/label';
import { useNavigate } from 'react-router';

export default function NewBoardForm() {
    const { addNewBoard } = useBoardStore()
    const navigate = useNavigate();

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
        const newBoardId = addNewBoard(formData.title)
        console.log(formData)
        setTimeout(() => {
            navigate(`/app/board/${newBoardId}`, { replace: true });
        }, 100)
    }
    return (
        <div className='flex flex-col gap-3'>
            <Controller
                name='title'
                control={control}
                render={({ field }) => (
                    <>
                        <Label className='-mb-1'>New board name</Label>
                        <Input size='sm' aria-label='Column name' defaultValue={field.value} onChange={field.onChange} className='flex-1' inputClassName=' text-[14px]' placeholder='Name' />
                    </>
                )}
            />
            <div className='flex justify-end'>
                <Button onClick={handleSubmit(addBoard)} color='primary' size='sm' isDisabled={!isValid}>
                    <div className="flex items-center gap-2">
                        <Save01 size={16} />
                        <span>Add board</span>
                    </div>
                </Button>
            </div>

        </div>
    )
}
