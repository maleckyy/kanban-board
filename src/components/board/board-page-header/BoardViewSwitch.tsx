import { ButtonGroup, ButtonGroupItem } from '@/components/base/button-group/button-group'
import React from 'react'
import { List, Columns01 } from '@untitledui/icons'
import { useBoardViewStore } from '@/stores/board-store/boardViewStore'

export default function BoardViewSwitch() {
    const view = useBoardViewStore(state => state.boardView)
    const switchView = useBoardViewStore(state => state.setView)

    return (
        <ButtonGroup selectedKeys={[view]}>
            <ButtonGroupItem id="board" className='py-1 px-3 text-[12px] pr-2!' iconLeading={<Columns01 size={12} />} onClick={() => switchView("board")}>Board</ButtonGroupItem>
            <ButtonGroupItem id="list" className='py-1 px-3 text-[12px]' iconLeading={<List size={12} />} onClick={() => switchView("list")}>List</ButtonGroupItem>
        </ButtonGroup>
    )
}
