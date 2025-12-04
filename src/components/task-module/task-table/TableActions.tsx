import { Edit01, Trash01 } from "@untitledui/icons";
import { Dropdown } from "@/components/base/dropdown/dropdown";

type PropsType = {
    deleteFn: () => void
    editFn: () => void
}

export default function TableActions({ deleteFn, editFn }: PropsType) {
    return (
        <Dropdown.Root>
            <Dropdown.DotsButton data-testid='task-dropdown-trigger' />
            <Dropdown.Popover className="w-min">
                <Dropdown.Menu data-testid='task-dropdown-menu'>
                    <Dropdown.Item icon={Edit01} onClick={editFn}>
                        <span className="pr-4">Edit</span>
                    </Dropdown.Item>
                    <Dropdown.Item icon={Trash01} onClick={deleteFn}>
                        <span className="pr-4">Delete</span>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown.Root>
    )
}
