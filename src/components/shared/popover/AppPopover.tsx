import React from 'react'
import { Placement } from 'react-aria';
import { Dialog, DialogTrigger, Popover } from 'react-aria-components';

type PropsType = {
    dialogContent: React.ReactNode
    triggerNode: React.ReactNode,
    popoverPlacement?: Placement
}

export default function AppPopover({ dialogContent, triggerNode, popoverPlacement = "bottom" }: PropsType) {
    return (
        <DialogTrigger>
            {triggerNode}
            <Popover placement={popoverPlacement}>
                <Dialog className='min-w-[100px] border border-primary bg-secondary rounded-md p-2 text-primary'>
                    {dialogContent}
                </Dialog>
            </Popover>
        </DialogTrigger>
    )
}
