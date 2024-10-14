import { DateTime } from "luxon"

export function getTimeAgo(date: Date) {
    const luxonDate = DateTime.fromJSDate(date).toRelative()
    return luxonDate?.replace(/ minutes| minute | hours| hour| days| day| months| month| years| year/, (word) => {
        const mapping = { minute: "m", minutes: "m", hour: "h", hours: "h", day: "d", days: "d", month: "mon", months: "mon", year: "y", years: "y" }
        return mapping[word.trim() as keyof typeof mapping]
    })
}
