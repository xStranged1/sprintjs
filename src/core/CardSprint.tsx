import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprint } from "@/types/Sprint";
import { formatTime } from "@/utils/utils";
import { format } from "date-fns";
import { Map, Timer, Trophy, Watch } from "lucide-react";

export const trophyColor = {
    'gold': "#f4bf1f",
    'silver': "#c4c4c4",
    'bronze': "#cf8338"
}

export const CardSprint = ({ sprint, trophy }: { sprint: Sprint, trophy?: 'gold' | 'silver' | 'bronze' }) => {

    const textDate = format(sprint.date, 'dd/MM/yyyy');
    const textTime = formatTime(sprint.time)
    const textPace = formatTime(sprint.pace)

    return (
        <div className="my-4">
            <Card className="min-w-[450px] w-fit relative">
                <CardHeader>
                    <div className="flex flex-row  items-center gap-2">
                        {trophy && (<Trophy color={trophyColor[trophy]} className="drop-shadow" size={32} />)}
                        <CardTitle>Distancia: {sprint.distance}m</CardTitle>
                    </div>
                    <CardDescription>{textDate}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Timer />
                        <p>Tiempo: <strong>{textTime}</strong></p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Watch />
                        <p>Ritmo: <strong>{textPace}/km</strong></p>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <Map />
                        <p>Circuito: </p><strong>{sprint.circuit?.name ?? '?'}</strong>
                    </div>
                </CardContent>
            </Card>
        </div>


    )
}