import { Button } from '@/components/base/buttons/button'
import { Input } from '@/components/base/input/input'
import useBoardStore from '@/stores/board-store/boardStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { Save01 } from '@untitledui/icons'
import React, { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'

type PropsType = {
    boardId: string
    closeDialog: () => void,
    colId: string
}

export default function EditColumnNameForm({ boardId, closeDialog, colId }: PropsType) {
    const titleInputRef = useRef<HTMLInputElement | null>(null)
    const { boards, updateColumnName } = useBoardStore()
    const column = boards.find(b => b.board.id === boardId)?.columns.find(c => c.id === colId)

    const columnNameSchema = z.object({
        name: z.string().min(3)
    })

    type ColumnNameType = z.infer<typeof columnNameSchema>

    const {
        control,
        formState: {
            isValid
        },
        handleSubmit
    } = useForm<ColumnNameType>({
        resolver: zodResolver(columnNameSchema),
        defaultValues: {
            name: column?.name ?? ""
        }
    });

    function changeNameFn(formData: ColumnNameType) {
        if (!boardId || !column) return
        updateColumnName(boardId, column.id, formData.name)
        closeDialog()
    }

    useEffect(() => {
        if (!column) return
        setTimeout(() => {
            if (titleInputRef.current) {
                const input = titleInputRef.current;
                input.focus();
                const length = input.value.length;
                input.setSelectionRange(length, length);
            }
        }, 50)
    }, [column])

    return (
        <div className='flex items-center'>
            <Controller
                name='name'
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        className='flex text-[18px] p-1'
                        ref={titleInputRef}
                        aria-label='Column name input'
                    />
                )}
            />
            <Button
                className='flex gap-2 items-center flex-row h-10'
                iconLeading={Save01}
                onClick={handleSubmit(changeNameFn)}
                isDisabled={!isValid}
            >
                <span>Save</span>
            </Button>
        </div>
    )
}
