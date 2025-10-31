export function emptyDataHelper(text: string | undefined, emptyText: string = "No data") {
    if (text === undefined || text.trim() === '') return emptyText
    return text
}