import React from 'react'
import { Dotpoints02, DotsVertical, Edit01, Trash01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import useBoardStore from '@/stores/board-store/boardStore';
import { useNavigate } from 'react-router';
import { useGlobalModal } from '@/components/application/modals/AppModal';
import ChangeColumPositions from '../change-column-positions/ChangeColumPositions';

export default function BoardActionsDropdown({ boardId }: { boardId: string }) {
    const { deleteBoard } = useBoardStore()
    const navigate = useNavigate()
    const { openModal, closeModal } = useGlobalModal()

    function deleteCurrentBoard() {
        deleteBoard(boardId)
        navigate("/app", { replace: true })
    }

    function openStatusModal() {
        openModal(
            {
                title: "Change columns position",
                description: "Deleting a column will delete the tasks associated with it.",
                content: <ChangeColumPositions boardId={boardId} closeDialog={closeModal} />,
                modalWidth: 600,
                dataTestId: "change-columns-position-modal"
            }
        )
    }

    return (
        <Dropdown.Root>
            <Button color="secondary" size="sm" className='p-1 border-none'>
                <span className="sr-only">Open board actions dropdown</span>
                <DotsVertical size={18} />
            </Button>
            <Dropdown.Popover>
                <Dropdown.Menu>
                    <Dropdown.Section>
                        <Dropdown.Item>
                            <span className='text-[12px] flex items-center gap-2'>
                                < Edit01 size={14} />
                                Edit board
                            </span>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={openStatusModal}>
                            <span className='text-[12px] flex items-center gap-2'>
                                < Dotpoints02 size={14} />
                                Edit Columns
                            </span>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={deleteCurrentBoard}>
                            <span className='text-[12px] flex items-center gap-2 text-red-400'>
                                <Trash01 size={14} />
                                Delete this board
                            </span>
                        </Dropdown.Item>
                    </Dropdown.Section>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown.Root>
    )
}
