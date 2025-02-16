export const getTotalSeconds = (hours: number | undefined, minutes: number | undefined, seconds: number | undefined) => {
    return (hours ?? 0) * 60 * 60 + (minutes ?? 0) * 60 + (seconds ?? 0)
}

export const getPace = (distance: number, hours: number | undefined, minutes: number | undefined, seconds: number | undefined) => {
    const totalSeconds = getTotalSeconds(hours, minutes, seconds)
    const timePerKm = totalSeconds / (distance / 1000)
    const minutesPerKm = timePerKm / 60
    const decimal = minutesPerKm % 1
    const secondsPerKm = Math.round((decimal * 100) * 60 / 100).toString()
    let textSeconds = secondsPerKm
    if (secondsPerKm.length == 1) {
        textSeconds = secondsPerKm + 0
    }
    const textPace = `${Math.floor(minutesPerKm)}:${(textSeconds)}m / KM`
    return textPace
}