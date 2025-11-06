export function getDeadlineColor(dueDateStr: string | undefined | null): string {
    if (!dueDateStr) return "text-primary";

    const today = new Date();
    const endDate = new Date(dueDateStr);

    today.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    const diffMs = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "text-red-600 font-bold";
    if (diffDays < 3) return "text-red-400";
    if (diffDays <= 7) return "text-yellow-400";
    return "text-primary";
}