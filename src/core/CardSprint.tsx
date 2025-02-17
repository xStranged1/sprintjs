import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprint } from "@/types/Sprint";
import { formatTime } from "@/utils/utils";
import { format } from "date-fns";
import { Timer, Watch } from "lucide-react";

export const CardSprint = ({ sprint }: { sprint: Sprint }) => {

    const textDate = format(sprint.date, 'dd/MM/yyyy');
    const textTime = formatTime(sprint.time)
    const textPace = formatTime(sprint.pace)
    return (
        <div className="my-4">
            <Card className="w-[450px]">
                <CardHeader>
                    <CardTitle>Distancia: {sprint.distance}m</CardTitle>
                    <CardDescription>{textDate}</CardDescription>
                </CardHeader>
                <CardContent className=" flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Timer />
                        <p>Tiempo: <strong>{textTime}</strong></p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Watch />
                        <p>Ritmo: <strong>{textPace}/km</strong></p>
                    </div>
                </CardContent>
            </Card>
        </div>


    )
}