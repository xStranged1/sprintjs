import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import '../App.css'
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useMemo, useState } from 'react';
import { getAllSprints, orderByDate } from '@/services/sprintService';
import { toast } from '@/hooks/use-toast';
import { Sprint } from '@/types/Sprint';
import { format } from "date-fns";

export const description = "An interactive bar chart";

const chartConfig = {
    views: {
        label: "Valor",
    },
    kilometers: {
        label: "Kilometros totales",
        color: "hsl(var(--chart-1))",
    },
    times: {
        label: "Tiempo total",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export const StatsScreen = () => {
    const [activeChart, setActiveChart] = useState<keyof typeof chartConfig>("kilometers");
    const [loading, setLoading] = useState(true)
    const [sprints, setSprints] = useState<Sprint[]>([])

    useEffect(() => {
        const fetchSprints = async () => {
            setLoading(true)
            const res = await getAllSprints()
            setLoading(false)
            if (!res.success) return toast({ title: 'Hubo un error recuperando los sprints', description: res.message, variant: 'destructive' })
            const sprints = res.data
            console.log(sprints);

            const orderedSprints = orderByDate(sprints)
            setSprints(orderedSprints)
        }
        fetchSprints()
    }, [])

    const total = useMemo(() => {
        if (sprints.length > 0) {
            console.log('setea total');

            const chartSprint = sprints.map((sprint) => {
                return {
                    date: format(sprint.date, 'yyyy-MM-dd'),
                    kilometers: sprint.distance,
                    times: sprint.time
                }
            })

            return ({
                kilometers: `${(sprints.reduce((acc, curr) => acc + curr.distance, 0) / 1000).toFixed(2)} km`,
                times: `${(sprints.reduce((acc, curr) => acc + curr.time, 0) / 3600).toFixed(2)} horas`,
                chartSprint
            })
        }

    }, [sprints]);

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Grafico de barra</CardTitle>
                    <CardDescription>
                        Mostrando kilometros y tiempo acumulado anual
                    </CardDescription>
                </div>
                <div className="flex">
                    {["kilometers", "times"].map((key) => {
                        const chart = key as keyof typeof chartConfig;
                        return (
                            <button
                                key={chart}
                                data-active={activeChart === chart}
                                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className="text-xs text-muted-foreground">
                                    {chartConfig[chart].label}
                                </span>
                                <span className="text-lg font-bold leading-none sm:text-3xl">
                                    {total ? total[key as keyof typeof total].toLocaleString() : ''}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                {loading ? (<h2>Loading...</h2>) :
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[250px] w-full"
                    >

                        <BarChart
                            accessibilityLayer
                            data={total?.chartSprint}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                minTickGap={32}
                                tickFormatter={(value) => {
                                    const date = new Date(value);
                                    return date.toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                    });
                                }}
                            />
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent
                                        className="w-[150px]"
                                        nameKey="views"
                                        labelFormatter={(value) => {
                                            return new Date(value).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            });
                                        }}
                                    />
                                }
                            />
                            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
                        </BarChart>
                    </ChartContainer>
                }


            </CardContent>
        </Card>
    );
}