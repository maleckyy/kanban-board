import React from 'react'
import { Trash01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";

type PropsType = {
    deleteColumn: () => void
}

export default function ColumnDelete({ deleteColumn }: PropsType) {
    return (
        <Dropdown.Root>
            <Button color="secondary" size="sm" className='p-1 border-none ml-auto cursor-pointer'>
                <span className="sr-only">Delete column</span><Trash01 fill='var(--color-red-400)' size={16}></Trash01>
            </Button>
            <Dropdown.Popover>
                <Dropdown.Menu>
                    <Dropdown.Section>
                        <Dropdown.Item onClick={deleteColumn}>
                            <span className='text-[12px] flex items-center gap-2 text-red-400'>
                                <Trash01 size={14} />
                                Delete column
                            </span>
                        </Dropdown.Item>
                    </Dropdown.Section>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown.Root>
    )
}
