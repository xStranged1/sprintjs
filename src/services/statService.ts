import { Sprint } from "@/types/Sprint";

export const calculeWeekVolume = (sprints: Sprint[]) => {

    const getWeekStart = (date: any) => {
        const d = new Date(date);
        d.setUTCHours(0, 0, 0, 0);
        const day = d.getUTCDay();
        const diff = d.getUTCDate() - day + (day === 0 ? -6 : 1); // Ajuste para que la semana inicie en lunes
        d.setUTCDate(diff);
        return d;
    };

    const formatWeekLabel = (date: any) => {
        const d = new Date(date);
        return `${String(d.getUTCDate()).padStart(2, "0")}/${String(
            d.getUTCMonth() + 1
        ).padStart(2, "0")}`;
    };

    const groupedData = sprints.reduce((acc: any, sprint) => {
        const weekStart = getWeekStart(sprint.date);
        const weekLabel = formatWeekLabel(weekStart);

        acc[weekLabel] = (acc[weekLabel] || 0) + sprint.distance;
        return acc;
    }, {});

    const sortedWeeks = Object.keys(groupedData).sort((a, b) => {
        const [dayA, monthA] = a.split("/").map(Number);
        const [dayB, monthB] = b.split("/").map(Number);

        const dateA: any = new Date(2025, monthA - 1, dayA)
        const dateB: any = new Date(2025, monthB - 1, dayB)
        return dateA - dateB;
    });

    const currentWeekLabel = "Actual";
    const lastWeek = sortedWeeks.at(-1);
    const lastWeekDistance = groupedData[lastWeek as string];

    const chartData = sortedWeeks.map((week) => ({
        week,
        kilometers: groupedData[week],
    }));

    chartData.pop()
    chartData.push({ week: currentWeekLabel, kilometers: lastWeekDistance });

    return chartData
}