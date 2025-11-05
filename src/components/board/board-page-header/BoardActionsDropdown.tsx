import React from 'react'
import { Dotpoints02, DotsVertical, Edit01, Trash01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import useBoardStore from '@/stores/board-store/boardStore';
import { useNavigate } from 'react-router';

export default function BoardActionsDropdown({ boardId }: { boardId: string }) {
    const { deleteBoard } = useBoardStore()
    const navigate = useNavigate()

    function deleteCurrentBoard() {
        deleteBoard(boardId)
        navigate("/app", { replace: true })
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
                        <Dropdown.Item>
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
