import { DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { BaseInterval, Circuit, initialBaseInterval } from "@/types/Sprint"
import { Label } from "@radix-ui/react-label"
import { useEffect, useRef, useState } from "react"
import { TimePicker } from "@/components/ui/TimePicker"
import { getPace, getTotalSeconds } from "@/utils/utils"
import { Card, CardHeader } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Slider } from "@/components/ui/slider"

interface Params {
    selectedCircuit: Circuit | undefined,
    onChangeInterval: (value: BaseInterval) => void,
    interval: BaseInterval,
}

export const CreateInterval = ({ selectedCircuit, interval, onChangeInterval }: Params) => {

    const [time, setTime] = useState<Date | undefined>(undefined)
    const [distance, setDistance] = useState('')
    const [laps, setLaps] = useState('')
    const [pace, setPace] = useState('')
    const [effort, setEffort] = useState<number[]>([50])
    const [timeRest, setTimeRest] = useState('')
    const [numberOfRep, setNumberOfRep] = useState('')

    const intervalRef = useRef<BaseInterval>(initialBaseInterval)

    console.log("selectedCircuit");
    console.log(selectedCircuit);
    console.log("interval");
    console.log(interval);

    useEffect(() => {
        if (!selectedCircuit) return
        if (isNaN(Number(laps))) return
        if (laps) {
            const newDistance = Math.round(Number(selectedCircuit.distance) * Number(laps))
            setDistance(newDistance.toString())
        }
    }, [laps])

    useEffect(() => {
        const calculatePace = () => {
            if (!distance) return
            if (!time) return
            const distanceFloat = parseFloat(distance)
            if (typeof distanceFloat != 'number') return
            if (distanceFloat == 0) return
            const hours = time?.getHours()
            const minutes = time?.getMinutes()
            const seconds = time?.getSeconds()
            const textPace = getPace(distanceFloat, hours, minutes, seconds)
            setPace(textPace)
            const totalSeconds = getTotalSeconds(hours, minutes, seconds)

            intervalRef.current = {
                ...intervalRef.current,
                distance: distanceFloat,
                time: totalSeconds
            }
            onChangeInterval(intervalRef.current)
        }
        calculatePace()
    }, [distance, time])

    return (
        <>
            <Card className="pb-4">
                <CardHeader className="text-sm font-medium border-b border-border">Intervalo {interval?.order + 1}</CardHeader>
                <DialogHeader className="grid grid-cols-4 items-center mr-5 gap-4">
                    <Label htmlFor="name" className="text-right font-medium text-sm">
                        Tiempo parcial
                    </Label>
                    <TimePicker date={time} setDate={(e) => setTime(e)} />
                </DialogHeader>

                <DialogHeader className="grid grid-cols-4 items-center mr-5 gap-4">
                    <Label htmlFor="name" className="text-right font-medium text-sm">
                        Vueltas
                    </Label>
                    <Input type='text'
                        className="col-span-3"
                        placeholder="Cantidad de vueltas al circuito"
                        value={laps}
                        onChange={(e) => {
                            const value = e.target.value
                            setLaps(value)
                        }} />
                </DialogHeader>
                <DialogHeader className="grid grid-cols-4 items-center mr-5 gap-4">
                    <Label htmlFor="name" className="text-right font-medium text-sm">
                        Distancia parcial (m)
                    </Label>
                    <Input type='text'
                        value={distance}
                        className="col-span-3"
                        placeholder="Distancia en metros"
                        onChange={(e) => {
                            const value = e.target.value
                            setDistance(value)
                            setLaps('')
                        }} />
                </DialogHeader>
                <DialogHeader className="grid grid-cols-4 items-center mr-5 gap-4">
                    <Label htmlFor="name" className="text-right font-medium text-sm">
                        Numero de repeticiones
                    </Label>
                    <Input type='text'
                        value={numberOfRep}
                        className="col-span-3"
                        placeholder="Numero de repeticiones"
                        onChange={(e) => {
                            const value = e.target.value
                            setNumberOfRep(value)
                            if (!isNaN(Number(value))) {
                                intervalRef.current = {
                                    ...intervalRef.current,
                                    numberOfRep: Number(value)
                                }
                                onChangeInterval(intervalRef.current)
                            }
                        }} />
                </DialogHeader>
                <DialogHeader className="grid grid-cols-4 items-center mr-5 gap-4">
                    <Label htmlFor="name" className="text-right font-medium text-sm">
                        Ritmo
                    </Label>
                    <Input
                        value={pace}
                        disabled
                        placeholder="Ritmo en mm:ss/km"
                        className="col-span-3"
                    />
                </DialogHeader>
                <DialogHeader className="grid grid-cols-4 items-center mr-5 gap-4">
                    <Label htmlFor="name" className="text-right font-medium text-sm">
                        Tiempo de descanso
                    </Label>
                    <Input type='text'
                        value={timeRest}
                        className="col-span-3"
                        placeholder="Tiempo en segundos"
                        onChange={(e) => {
                            const value = e.target.value
                            setTimeRest(value)
                            if (!isNaN(Number(value))) {
                                intervalRef.current = {
                                    ...intervalRef.current,
                                    timeRest: Number(value)
                                }
                                onChangeInterval(intervalRef.current)
                            }
                        }} />
                </DialogHeader>
                <DialogHeader className="flex flex-row justify-between items-center mr-5 gap-4">
                    <Label htmlFor="name" className="text-right font-medium text-sm">
                        Nivel de esfuerzo (opcional)
                    </Label>
                    <TooltipProvider>
                        <Tooltip open={true}  >
                            <TooltipContent side="bottom">
                                <p className="font-bold text-sm">{effort}</p>
                            </TooltipContent>
                            <TooltipTrigger asChild>
                                <Slider
                                    value={effort}
                                    onValueChange={(v) => {
                                        setEffort(v)
                                        intervalRef.current = {
                                            ...intervalRef.current,
                                            effort: v[0]
                                        }
                                        onChangeInterval(intervalRef.current)
                                    }}
                                    className="w-full"
                                    defaultValue={[50]}
                                    max={100}
                                    step={1}
                                />
                            </TooltipTrigger>
                        </Tooltip>
                    </TooltipProvider>
                </DialogHeader>
            </Card>

        </>
    )
}