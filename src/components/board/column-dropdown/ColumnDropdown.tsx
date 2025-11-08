import React from 'react'
import { Dotpoints02, DotsVertical, Trash01, Plus } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { useGlobalModal } from '@/components/application/modals/AppModal';
import ChangeColumPositions from '../change-column-positions/ChangeColumPositions';

type PropsType = {
    onClick: () => void
    boardId: string
    deleteTasks: () => void
}

export default function ColumnDropdown({ onClick: addNewTaskToCol, boardId, deleteTasks }: PropsType) {
    const { openModal, closeModal } = useGlobalModal()

    function openStatusModal() {
        openModal(
            {
                title: "Change columns position",
                content: <ChangeColumPositions boardId={boardId} closeDialog={closeModal} />,
                modalWidth: 600,
                dataTestId: "change-columns-position-modal"
            }
        )
    }

    return (
        <div>
            <Dropdown.Root>
                <Button color="secondary" size="sm" className='p-1'>
                    <span className="sr-only">Open column actions dropdown</span>
                    <DotsVertical size={16} />
                </Button>
                <Dropdown.Popover>
                    <Dropdown.Menu>
                        <Dropdown.Section>
                            <Dropdown.Item onClick={addNewTaskToCol}>
                                <span className='text-[12px] flex items-center gap-2'>
                                    < Plus size={14} />
                                    Add new task
                                </span>
                            </Dropdown.Item>
                            <Dropdown.Item onClick={openStatusModal} >
                                <span className='text-[12px] flex items-center gap-2'>
                                    < Dotpoints02 size={14} />
                                    Edit Columns
                                </span>
                            </Dropdown.Item>
                            <Dropdown.Item onClick={deleteTasks}>
                                <span className='text-[12px] flex items-center gap-2 text-red-400'>
                                    <Trash01 size={14} />
                                    Delete task from this column
                                </span>
                            </Dropdown.Item>
                        </Dropdown.Section>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown.Root>
        </div>
    )
}
