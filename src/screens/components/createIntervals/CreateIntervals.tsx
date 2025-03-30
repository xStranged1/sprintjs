import { BaseInterval, Circuit, initialBaseInterval } from "@/types/Sprint"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CreateInterval } from "./CreateInterval"

interface Params {
    selectedCircuit: Circuit | undefined,
    onChangeIntervals: (intervals: BaseInterval[]) => void,
}

export const CreateIntervals = ({ selectedCircuit, onChangeIntervals }: Params) => {

    const [intervals, setIntervals] = useState<BaseInterval[]>([initialBaseInterval])
    const intervalsRef = useRef<BaseInterval[]>([])
    console.log("selectedCircuit");
    console.log(selectedCircuit);

    const handleAddInterval = () => {
        const newInterval = initialBaseInterval
        newInterval.order = intervals.length
        setIntervals([...intervals, newInterval])
    }

    const onChangeInterval = (interval: BaseInterval) => {
        console.log("interval createIntervals");
        console.log(interval);
        const updatedIntervals = intervals
        updatedIntervals[interval.order] = interval
        intervalsRef.current = updatedIntervals
        onChangeIntervals(updatedIntervals)
    }

    return (
        <>
            <div className="mt-8" />
            {intervals.length > 0 && (
                <div className="flex flex-col gap-8">
                    {intervals.map((interval, i) =>
                    (<CreateInterval selectedCircuit={selectedCircuit}
                        key={i.toString()}
                        interval={interval}
                        onChangeInterval={onChangeInterval} />
                    ))}
                </div>
            )}
            <Button variant='outline' onClick={handleAddInterval}>
                <Plus className="h-8 w-8" />
                Agregar intervalo
            </Button>
        </>
    )
}