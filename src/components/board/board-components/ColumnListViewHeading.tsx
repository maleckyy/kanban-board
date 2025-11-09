export default function ColumnListViewHeading() {
    return (
        <div className='md:grid grid-cols-6 text-secondary text-[10px] mb-1 hidden'>
            <span className='col-span-3'>Name</span>
            <span>Priority</span>
            <span>Created date</span>
            <span>Due date</span>
        </div>
    )
}
