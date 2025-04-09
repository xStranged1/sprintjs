import { BaseInterval } from "@/types/Sprint";
import { formatTime } from "@/utils/utils";
import { Bed, RefreshCcw, Repeat, Ruler, Timer, Watch } from "lucide-react";

export const trophyColor = {
    'gold': "#f4bf1f",
    'silver': "#c4c4c4",
    'bronze': "#cf8338"
}

export const CardInterval = ({ interval }: { interval: BaseInterval, trophy?: 'gold' | 'silver' | 'bronze' }) => {

    const textDistance = Math.round(interval.distance / 3).toString()
    const textTime = formatTime(Math.round(interval.distance / 3))
    const textPace = interval.pace ? formatTime(interval.pace) : ''
    const textTimeRest = formatTime(Math.round(interval.timeRest))

    return (
        <div
            className="flex flex-col gap-2"
            key={interval.order.toString()}
        >
            <div className="flex flex-row items-center gap-4">
                <div className="flex items-center gap-2">
                    <Ruler size={18} />
                    <p>Distancia: <strong>{textDistance}m X {interval.numberOfRep}</strong></p>
                </div>
                <div className="flex items-center gap-2">
                    <Timer />
                    <p>Tiempo: <strong>{textTime}</strong></p>
                </div>
                <div className="flex items-center gap-2">
                    <Watch />
                    <p>Ritmo: <strong>{textPace}/km</strong></p>
                </div>
            </div>
            <div className="flex flex-row items-center gap-4">
                <div className="flex items-center gap-2">
                    <Repeat />
                    <p>Repeticiones: <strong>{interval.numberOfRep}</strong></p>
                </div>
                {interval.numberOfLaps && (
                    <div className="flex items-center gap-2">
                        <RefreshCcw />
                        <p>Vueltas: <strong>{interval.numberOfLaps}</strong></p>
                    </div>
                )}
                <div className="flex items-center gap-2">
                    <Bed />
                    <p>Tiempo de descanso: <strong>{textTimeRest}</strong></p>
                </div>
            </div>
        </div>
    )
}