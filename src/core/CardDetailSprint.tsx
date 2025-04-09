import BedTicket from "@/components/ui/bedTicket";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IconTempStyled } from "@/components/ui/iconTempStyled";
import { Slider } from "@/components/ui/slider";
import { BaseInterval, Sprint } from "@/types/Sprint";
import { formatTime } from "@/utils/utils";
import { format } from "date-fns";
import { Bed, Map, Timer, Trophy, Watch } from "lucide-react";
import { CardInterval } from "./CardInterval";

export const trophyColor = {
    'gold': "#f4bf1f",
    'silver': "#c4c4c4",
    'bronze': "#cf8338"
}

export const CardDetailSprint = ({ sprint, trophy }: { sprint: Sprint, trophy?: 'gold' | 'silver' | 'bronze' }) => {

    const textDate = format(sprint.date, 'dd/MM/yyyy');
    const textTime = formatTime(sprint.time)
    const textPace = formatTime(sprint.pace)

    const Intervals = ({ intervals }: { intervals: BaseInterval[] }) => {

        return (
            <div>
                <h2 className="font-bold mb-2">Intervalos</h2>
                {intervals.map((interval) => (
                    <CardInterval interval={interval} />
                ))}
            </div>
        )
    }

    return (
        <div className="my-4">
            <Card className="min-w-[450px] w-fit relative">
                <CardHeader>
                    <div className="flex flex-row justify-between gap-2">
                        {trophy && (<Trophy color={trophyColor[trophy]} className="drop-shadow" size={32} />)}
                        <CardTitle>Distancia: {sprint.distance}m</CardTitle>
                        {sprint.takeBreak && (
                            <CardContent className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <Bed />
                                    <p className="font-semibold text-sm">Con descanso</p>
                                </div>
                            </CardContent>
                        )}
                        {!sprint.takeBreak && (<>
                            <div className="flex items-center gap-2">
                                <BedTicket />
                                <p className="font-semibold text-sm">Sin descanso</p>
                            </div>
                        </>)}
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
                <CardContent className="flex items-center gap-6">
                    {sprint.effort && (<>
                        <p className="font-bold text-sm">Esfuerzo percibido</p>
                        <Slider
                            value={[sprint.effort]}
                            className="w-full"
                            max={100}
                            step={1}
                        />
                    </>)}

                    {sprint.temperature && (<>
                        <div className="flex items-center gap-2">
                            <IconTempStyled temperature={sprint.temperature} />
                            <p className="font-bold text-sm flex">Temperatura: <strong className="ml-2">{sprint.temperature}°C</strong></p>
                        </div>
                    </>)}
                </CardContent>

                {sprint.intervals && (
                    <CardContent className="items-center gap-6">
                        <Intervals intervals={sprint.intervals} />
                    </CardContent>
                )}

                {sprint.comment && (
                    <CardContent className="items-center gap-6">
                        <h2 className="font-bold text-sm">Comentario</h2>
                        <p>{sprint.comment}</p>
                    </CardContent>
                )}

            </Card>
        </div>


    )
}