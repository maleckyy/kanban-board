import React from 'react'
import { Button, Dialog, DialogTrigger, Popover } from 'react-aria-components';

type PropsType = {
    dialogContent: React.ReactNode
    triggerNode: React.ReactNode
}

export default function AppPopover({ dialogContent, triggerNode }: PropsType) {
    return (
        <DialogTrigger>
            <Button className={'text-primary cursor-pointer'}>{triggerNode}</Button>
            <Popover>
                <Dialog className='min-w-[100px] border border-primary bg-secondary rounded-md p-2 text-primary'>
                    {dialogContent}
                </Dialog>
            </Popover>
        </DialogTrigger>
    )
}
