export const enum Durations {
    SECONDS = 'SECONDS',
    MINUTES = 'MINUTES',
    HOURS = 'HOURS',
    DAYS = 'DAYS',
}

export default {
    diffIn(
        from: Date,
        to: Date,
        duration: Durations = Durations.SECONDS,
    ): number {
        if (duration === Durations.SECONDS) {
            return (to.getTime() - from.getTime()) / 1000
        }
        if (duration === Durations.MINUTES) {
            return (to.getTime() - from.getTime()) / 1000 / 60
        }
        if (duration === Durations.HOURS) {
            return (to.getTime() - from.getTime()) / 1000 / 60 / 60
        }
        if (duration === Durations.DAYS) {
            return (to.getTime() - from.getTime()) / 1000 / 60 / 60 / 24
        } else {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            throw new Error(`unexpected duration ${duration}`)
        }
    },
    dateToDDMMYYYY(date: Date): string {
        return `${this.twoDigits(date.getDate())}-${this.twoDigits(
            date.getMonth() + 1,
        )}-${this.twoDigits(date.getFullYear())}`
    },
    millisecondsToHHMMSS(
        milliseconds: number,
        separator: string = ':',
    ): string {
        return this.secondsToHHMMSS(Math.round(milliseconds / 1000), separator)
    },
    secondsToHHMMSS(seconds: number, separator: string = ':'): string {
        let minutes: number = 0
        while (seconds > 59) {
            seconds -= 60
            minutes++
        }

        let hours: number = 0
        while (minutes > 59) {
            minutes -= 60
            hours++
        }

        return `${this.twoDigits(hours)}${separator}${this.twoDigits(
            minutes,
        )}${separator}${this.twoDigits(seconds)}`
    },
    twoDigits(value: number): string {
        if (value < 10) return `0${value}`
        else return `${value}`
    },
    getTimestamp(date: Date) {
        return `${date.getFullYear()}${this.twoDigits(
            date.getMonth() + 1,
        )}${this.twoDigits(date.getDate())}`
    },
    getDateBefore(now: Date, days: number = 1): Date {
        const dateBefore: Date = new Date(now)
        dateBefore.setDate(now.getDate() - days)
        return dateBefore
    },
    getYesterday(): Date {
        const now: Date = new Date()
        now.setDate(now.getDate() - 1)
        return now
    },
    getFirstDayOfTheMonth(): Date {
        const now: Date = new Date()
        return new Date(now.getFullYear(), now.getMonth(), 1)
    },
    getLastDayOfTheMonth(): Date {
        const now: Date = new Date()
        return new Date(now.getFullYear(), now.getMonth() + 1, 0)
    },
}
