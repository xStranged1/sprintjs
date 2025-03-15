import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { filterDateSprint, filterSprints, getAllSprints } from "@/services/sprintService";
import { Filter, Sprint } from "@/types/Sprint";
import { useEffect, useMemo, useRef, useState } from "react";
import { format } from "date-fns";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { formatTime } from "@/utils/utils";
import { FilterPopover } from "@/core/FilterPopover";
import { Watch } from "lucide-react";

export const description = "An interactive area chart";

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
    pace: {
        label: "Ritmo",
        color: "hsl(var(--chart-4))",
    },
} satisfies ChartConfig;

export function StatPaceChart() {

    const [timeRange, setTimeRange] = useState("90d");
    const [loading, setLoading] = useState(true)
    const [sprints, setSprints] = useState<Sprint[]>([])
    const [fetchedSprints, setFetchedSprints] = useState<Sprint[]>([])
    const filterRef = useRef<Filter>()

    useEffect(() => {
        const fetchSprints = async () => {
            setLoading(true)
            const res = await getAllSprints()
            setLoading(false)
            if (!res.success) return toast({ title: 'Hubo un error recuperando los sprints', description: res.message, variant: 'destructive' })
            const sprints = res.data.reverse()
            setSprints(sprints)
            setFetchedSprints(sprints)
        }
        fetchSprints()
    }, [])

    const chartSprint = useMemo(() => {
        if (sprints.length > 0) {
            console.log('setea total');
            const chart = sprints.map((sprint) => {
                return {
                    date: format(sprint.date, 'yyyy-MM-dd'),
                    kilometers: sprint.distance,
                    times: sprint.time,
                    pace: sprint.pace
                }
            })
            return chart
        }

    }, [sprints]);

    const handleSetDateRange = (date: string) => {

        setTimeRange(date);
        if (date === "overall") {
            setSprints(fetchedSprints);
            return;
        }
        const filteredSprints = filterDateSprint(fetchedSprints, date)
        setSprints(filteredSprints);
    };

    useEffect(() => {
        if (filterRef.current) handleApplyFilter(filterRef.current, true)
    }, [timeRange])

    const handleApplyFilter = (filter: Filter, filterFromSprints?: boolean) => {
        let filterFrom: Sprint[]
        if (timeRange != 'overall') {
            filterFrom = sprints
        } else {
            filterFrom = fetchedSprints
        }
        filterRef.current = filter
        const filteredSprints = filterSprints(filterFromSprints ? sprints : filterFrom, filter)
        setSprints(filteredSprints)
    }

    return (
        <Card>
            {loading ?? <h2>loading...</h2>}
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="flex flex-row items-center gap-6">
                    <div className="grid flex-1 gap-1 text-center sm:text-left">
                        <CardTitle>Ritmo Promedio</CardTitle>
                        <CardDescription>
                            Mostrando datos del ultimo año
                        </CardDescription>
                    </div>
                    <FilterPopover filter={filterRef.current} onApplyFilter={handleApplyFilter} />
                </div>
                <Select value={timeRange} onValueChange={handleSetDateRange}>
                    <SelectTrigger
                        className="w-[160px] rounded-lg sm:ml-auto"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Ultimos 3 meses" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="overall" className="rounded-lg">
                            Todos los tiempos
                        </SelectItem>
                        <SelectItem value="365d" className="rounded-lg">
                            Ultimo año
                        </SelectItem>
                        <SelectItem value="180d" className="rounded-lg">
                            Ultimos 6 meses
                        </SelectItem>
                        <SelectItem value="90d" className="rounded-lg">
                            Ultimos 3 meses
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Ultimo mes
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Ultima semana
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={chartSprint}>
                        <defs>
                            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-mobile)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-mobile)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="hsl(var(--chart-2))"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="hsl(var(--chart-2))"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <YAxis type="number" domain={[150, (dataMax: string) => dataMax + 5]} allowDataOverflow
                            tickFormatter={(value) => formatTime(value)}
                        />
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
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    formatter={(value: any) => <div className="flex flex-row items-center justify-between gap-1"><Watch size={22} /><p>Ritmo: {formatTime(value)}m</p></div>}

                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        });
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="pace"
                            type="natural"
                            fill="url(#fillMobile)"
                            stroke="hsl(var(--chart-2))"
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}