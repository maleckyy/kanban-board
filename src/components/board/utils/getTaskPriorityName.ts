export function getTaskPriorityName(priority: number) {
    switch (priority) {
        case 1:
            return "Medium"
        case 2:
            return "High"
        case 3:
            return "Urgent"
        default:
            return "Low"
    }
}