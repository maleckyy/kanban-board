import { Button } from '@/components/base/buttons/button'
import AppPopover from '@/components/shared/popover/AppPopover'
import React from 'react'
import AddNewColumnToBoardForm from '../add-column-form/AddNewColumnToBoardForm'

type PropsType = {
    boardId: string

}

export default function AddNewStatusButton({ boardId }: PropsType) {
    return (
        <>
            <AppPopover
                triggerNode={<Button color='secondary' className='text-[12px]'>+ Add new status</Button>}
                dialogContent={<AddNewColumnToBoardForm boardId={boardId} />}
            />
        </>
    )
}
