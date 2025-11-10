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
    closeDialog: () => void
}

export default function ChangeBoardNameForm({ boardId, closeDialog }: PropsType) {
    const titleInputRef = useRef<HTMLInputElement | null>(null)
    const { boards, editBoardName } = useBoardStore()
    const board = boards.find(b => b.board.id === boardId)

    const boardNameSchema = z.object({
        name: z.string().min(3)
    })

    type BoardNameType = z.infer<typeof boardNameSchema>

    const {
        control,
        formState: {
            isValid
        },
        handleSubmit
    } = useForm<BoardNameType>({
        resolver: zodResolver(boardNameSchema),
        defaultValues: {
            name: board?.board.name ?? ""
        }
    });

    function changeNameFn(formData: BoardNameType) {
        if (!boardId) return
        editBoardName(boardId, formData.name)
        closeDialog()
    }

    useEffect(() => {
        if (!board) return
        setTimeout(() => {
            if (titleInputRef.current) {
                const input = titleInputRef.current;
                input.focus();
                const length = input.value.length;
                input.setSelectionRange(length, length);
            }
        }, 50)
    }, [board])

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
                        aria-label='Board name input'
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
