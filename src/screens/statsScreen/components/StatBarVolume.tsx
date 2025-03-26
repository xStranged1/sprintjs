import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { Ruler, TrendingUp } from 'lucide-react';
import { StatProps } from '@/types/Stat';
import { Skeleton } from '@/components/ui/skeleton';
import { filterDateSprint } from '@/services/sprintService';
import { calculeWeekVolume } from '@/services/statService';

export const StatBarVolume = ({ fetchedSprints, loading }: StatProps) => {

    const [chartData, setChartData] = useState()
    const [avgVolume, setAvgVolume] = useState(0)
    const [lastWeekIncrease, setLastWeekIncrease] = useState(0)

    const chartConfig = {
        kilometers: {
            label: "Distancia",
            color: "hsl(var(--chart-1))",
        },
    } satisfies ChartConfig;

    useEffect(() => {
        const last3months = filterDateSprint(fetchedSprints, '90d')
        if (last3months.length > 0) {
            const weekVolume = calculeWeekVolume(last3months)

            let sum = 0
            for (let i = 0; i < weekVolume.length - 1; i++) {
                const week = weekVolume[i];
                sum = sum + Number(week.kilometers)
            }
            const avg = (sum / (weekVolume.length - 1))
            const kmLastWeek = weekVolume[weekVolume.length - 2].kilometers
            const newLastWeekIncrease = (((kmLastWeek - avg) / avg) * 100).toFixed(2)
            setLastWeekIncrease(Number(newLastWeekIncrease))
            setAvgVolume(avg)
            setChartData(weekVolume as any)
        }

    }, [fetchedSprints])

    if (loading) return (<Skeleton className='w-[580px] h-[484px]' />)

    return (
        <div className='w-[580px]'>
            <Card>
                <CardHeader>
                    <CardTitle>Volumen de kilometros</CardTitle>
                    <CardDescription>Volumen semanal de los ultimos 3 meses</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <BarChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                top: 20,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="week"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                            // tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        hideLabel
                                        formatter={(value: any) => {
                                            return <div className="flex flex-row items-center justify-between gap-2"><Ruler size={18} /><p>Distancia: {value}m</p></div>
                                        }}
                                    />
                                }
                            />
                            <Bar dataKey="kilometers" fill="var(--color-kilometers)" radius={8}>
                                <LabelList
                                    position="top"
                                    offset={12}
                                    className="fill-foreground"
                                    fontSize={12}
                                />
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col gap-2  items-start text-sm">
                    <div className="flex font-medium leading-none">
                        La última semana incrementaste un
                        <p className={`${lastWeekIncrease >= 0 ? 'text-primary' : 'text-destructive'} mx-1 `}>
                            {lastWeekIncrease}%
                        </p>
                        el promedio<TrendingUp className="h-4 w-4 ml-2" />
                    </div>
                    <div className="leading-none text-muted-foreground">
                        Volumen promedio:  {(avgVolume / 1000).toFixed(2)}km/semana
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}