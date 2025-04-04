export const getTotalSeconds = (hours: number | undefined, minutes: number | undefined, seconds: number | undefined) => {
    return (hours ?? 0) * 60 * 60 + (minutes ?? 0) * 60 + (seconds ?? 0)
}

export const getPace = (distance: number, hours: number | undefined, minutes: number | undefined, seconds: number | undefined) => {
    const totalSeconds = getTotalSeconds(hours, minutes, seconds)
    const timePerKm = Math.round(totalSeconds / (distance / 1000))
    const textPace = formatTime(timePerKm)
    return textPace
}

export function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    // Si hay horas formato hh:mm:ss
    if (hours > 0) {
        return `${padZero(hours)}:${padZero(minutes)}:${padZero(remainingSeconds)}`;
    } else {
        // Si no hay horas formato mm:ss
        return `${padZero(minutes)}:${padZero(remainingSeconds)}`;
    }
}
export function padZero(num: number) {
    return num < 10 ? '0' + num : num;
}