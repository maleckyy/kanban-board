export function getTaskPriorityColor(priority: number) {
    switch (priority) {
        case 1:
            return "#5EABD6"
        case 2:
            return "#FAD691"
        case 3:
            return "red"
        default:
            return "var(--background-color-primary)"
    }
}