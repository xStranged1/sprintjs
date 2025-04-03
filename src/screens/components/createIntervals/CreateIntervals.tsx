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

    const handleAddInterval = () => {
        let newInterval = initialBaseInterval
        const orders = intervals.map(interval => interval.order)
        const maxOrder = Math.max(...orders)
        newInterval = { ...newInterval, order: maxOrder + 1 }
        setIntervals([...intervals, newInterval])
        onChangeIntervals([...intervals, newInterval])
    }

    const onChangeInterval = (interval: BaseInterval) => {
        const updatedIntervals = intervals
        const index = updatedIntervals.findIndex(prevInterval => prevInterval.order == interval.order)
        updatedIntervals[index] = interval
        intervalsRef.current = updatedIntervals
        setIntervals(updatedIntervals)
        onChangeIntervals(updatedIntervals)
    }

    const onDeleteInterval = (interval: BaseInterval) => {
        setIntervals((prev) => {
            const index = prev.findIndex(({ order }) => order === interval.order);
            if (index === -1) return prev; // Si no se encuentra, no cambia nada

            const newIntervals = [...prev];
            newIntervals.splice(index, 1);

            intervalsRef.current = newIntervals;
            onChangeIntervals(newIntervals);
            return newIntervals;
        });
    }

    return (
        <>
            <div className="mt-8" />
            {intervals.length > 0 && (
                <div className="flex flex-col gap-8">
                    {intervals.map((interval, i) => (
                        <CreateInterval selectedCircuit={selectedCircuit}
                            key={interval.order}
                            index={i}
                            interval={interval}
                            onChangeInterval={onChangeInterval}
                            onDeleteInterval={onDeleteInterval}
                        />
                    ))}
                </div>
            )}
            <Button variant='outline' onClick={handleAddInterval} className="mr-4">
                <Plus className="h-8 w-8" />
                Agregar intervalo
            </Button>
            {/* <Button variant='outline' onClick={() => {
                console.log(intervalsRef.current)
                console.log(intervals)
            }}>
                <Plus className="h-8 w-8" />
                ver intervals
            </Button> */}
        </>
    )
}