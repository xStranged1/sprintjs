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
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"

interface Params {
    selectedCircuit: Circuit | undefined,
    onChangeInterval: (value: BaseInterval) => void,
    onDeleteInterval: (value: BaseInterval) => void,
    interval: BaseInterval,
    index: number
}

export const CreateInterval = ({ selectedCircuit, interval, onChangeInterval, onDeleteInterval, index }: Params) => {

    const [time, setTime] = useState<Date | undefined>(undefined)
    const [distance, setDistance] = useState('')
    const [laps, setLaps] = useState('')
    const [pace, setPace] = useState('')
    const [effort, setEffort] = useState<number[]>([50])
    const [timeRest, setTimeRest] = useState('')
    const [numberOfRep, setNumberOfRep] = useState('1')
    const [isIntervalDeleted, setIsIntervalDeleted] = useState(false)

    const intervalRef = useRef<BaseInterval>({ ...initialBaseInterval, order: interval.order })
    const inputLapRef = useRef(null);
    const inputDistanceRef = useRef(null);
    const inputTimeRestRef = useRef(null);
    const inputNumberOfRepRef = useRef(null);

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
            let numberOfRepINT = 1
            if (!isNaN(Number(numberOfRep))) {
                numberOfRepINT = Number(numberOfRep)
            }
            const distanceFloat = parseFloat(distance) * numberOfRepINT
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
                time: totalSeconds,
                numberOfRep: numberOfRepINT
            }
            onChangeInterval(intervalRef.current)
        }
        calculatePace()
    }, [distance, time, numberOfRep])

    const handleDeleteInterval = () => {
        onDeleteInterval(intervalRef.current)
        setIsIntervalDeleted(true)
    }

    if (isIntervalDeleted) return

    const handleKeyDown = (e: any, nextInputRef: any) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Evitar el comportamiento por defecto de Enter (enviar formulario)
            nextInputRef.current.focus(); // Cambiar el foco al siguiente input
        }
    };

    return (
        <>
            <Card className="pb-7 mr-4">
                <CardHeader className="border-b border-border flex flex-row justify-between items-center">
                    <h2 className="text-sm font-medium ">Intervalo {index + 1}</h2>
                    <Button variant='destructive' size='sm' className="w-24"
                        onClick={handleDeleteInterval}
                    >
                        <Trash />Eliminar
                    </Button>
                </CardHeader>
                <DialogHeader className="grid grid-cols-4 items-center mr-5 gap-4">
                    <Label htmlFor="name" className="text-right font-medium text-sm">
                        Tiempo parcial
                    </Label>
                    <TimePicker date={time} setDate={(e) => setTime(e)} />
                </DialogHeader>
                <div className="flex flex-col gap-2 px-4">
                    <DialogHeader className="grid grid-cols-4 items-center mr-5 gap-4">
                        <Label htmlFor="name" className="text-right font-medium text-sm">
                            Vueltas
                        </Label>
                        <Input type='text'
                            className="col-span-3"
                            placeholder="Cantidad de vueltas al circuito"
                            value={laps}
                            ref={inputLapRef}
                            onKeyDown={(e) => handleKeyDown(e, inputDistanceRef)}
                            onChange={(e) => {
                                const value = e.target.value
                                if (!isNaN(Number(value))) {
                                    intervalRef.current = {
                                        ...intervalRef.current,
                                        numberOfLaps: Number(value)
                                    }
                                    onChangeInterval(intervalRef.current)
                                    setLaps(value)
                                }
                            }} />
                    </DialogHeader>
                    <DialogHeader className="grid grid-cols-4 items-center mr-5 gap-4">
                        <Label htmlFor="name" className="text-right font-medium text-sm">
                            Distancia parcial (m)
                        </Label>
                        <Input type='text'
                            value={intervalRef.current.distance ?? ''}
                            ref={inputDistanceRef}
                            onKeyDown={(e) => handleKeyDown(e, inputNumberOfRepRef)}
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
                            ref={inputNumberOfRepRef}
                            onKeyDown={(e) => handleKeyDown(e, inputTimeRestRef)}
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
                            ref={inputTimeRestRef}
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
                </div>
            </Card>

        </>
    )
}