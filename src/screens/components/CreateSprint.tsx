import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DateTimePicker } from "@/components/ui/dateTimePicker"
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { TimePicker } from "@/components/ui/TimePicker"
import { useToast } from "@/hooks/use-toast"
import { createSprint } from "@/services/sprintService"
import { BaseSprint, Circuit, Sprint } from "@/types/Sprint"
import { getPace, getTotalSeconds } from "@/utils/utils"
import { useEffect, useRef, useState } from "react"
import { DistanceFields } from "./DistanceFields"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PropsCreateSprint {
    closeDialog: (booelan: boolean) => void,
    onSubmit: (newSprint: Sprint) => void
}

export const CreateSprint = ({ closeDialog, onSubmit }: PropsCreateSprint) => {

    const [time, setTime] = useState<Date | undefined>(undefined)
    const today = new Date()
    today.setMinutes(today.getMinutes() - 40);
    const [datetime, setDatetime] = useState<Date>(today)
    const [distance, setDistance] = useState('')
    const circuit = useRef<Circuit>()
    const numberOfLaps = useRef('')
    const setCircuitRef = (value: Circuit) => circuit.current = value
    const setLapsRef = (value: string) => numberOfLaps.current = value
    const [takeBreak, setTakeBreak] = useState(false)
    const [pace, setPace] = useState('')
    const [temperature, setTemperature] = useState('')
    const [comment, setComment] = useState('')
    const [effort, setEffort] = useState<number[]>([50])
    const [haveEffort, setHaveEffort] = useState<boolean>(false)

    const { toast } = useToast()

    const handleSubmit = async () => {
        const hours = time?.getHours()
        const minutes = time?.getMinutes()
        const seconds = time?.getSeconds()
        const newSprint: BaseSprint = {
            date: datetime,
            distance: Number(distance),
            time: getTotalSeconds(hours, minutes, seconds),
            takeBreak,
            circuit: circuit.current,
            numberOfLaps: Number(numberOfLaps.current),
            comment,
            effort: haveEffort ? effort[0] : undefined,
            temperature: Number(temperature)
        }
        const res = await createSprint(newSprint)
        if (!res.success) return toast({ title: 'Hubo un error creando el sprint', description: res.message, variant: 'destructive' })
        toast({ title: 'Sprint creado con exito!' })
        closeDialog(false)
        onSubmit(res.data)
    }

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
        }
        calculatePace()
    }, [distance, time])

    return (
        <DialogContent className="w-[310px] sm:w-[520px] md:w-[600px] lg:w-[700px]">
            <DialogHeader>
                <DialogTitle>Crear Sprint</DialogTitle>
                <DialogDescription>
                    Ingresa todos los datos de tu Sprint aquí. Clickea guardar cuando lo tengas!
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-2 py-4 sm:max-h-[300px] lg:max-h-[500px] scroll-smooth px-16 scrollable-content">
                <DialogHeader className="grid grid-cols-4 items-center mr-5 gap-4">
                    <Label htmlFor="name" className="text-right">
                        Fecha y hora
                    </Label>
                    <DateTimePicker datetime={datetime} setDatetime={(e) => setDatetime(e)} />
                </DialogHeader>
                <DialogHeader className="grid grid-cols-4 items-center mr-5 gap-4">
                    <Label htmlFor="name" className="text-right">
                        Tiempo total
                    </Label>
                    <TimePicker date={time} setDate={(e) => setTime(e)} />
                </DialogHeader>

                <DistanceFields
                    onInputDistance={setDistance}
                    onSelectCircuit={setCircuitRef}
                    onInputLaps={setLapsRef}
                />

                <DialogHeader className="grid grid-cols-4 items-center mr-5 gap-4">
                    <Label htmlFor="name" className="text-right">
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
                    <Checkbox id="takeBreak" onCheckedChange={() => setTakeBreak(prev => !prev)} checked={takeBreak}
                        className="justify-self-end"
                    />
                    <Label htmlFor="takeBreak" className="text-left col-span-3 cursor-pointer ml-1">
                        Tomó descansos?
                    </Label>
                </DialogHeader>
                <DialogHeader className="grid grid-cols-4 items-center mr-5 gap-4">
                    <Label htmlFor="name" className="text-right">
                        Temperatura (opcional)
                    </Label>
                    <Input
                        onChange={(e) => setTemperature(e.target.value)}
                        value={temperature}
                        placeholder="Temperatura en °C"
                        className="col-span-3"
                    />
                </DialogHeader>
                <DialogHeader className="flex flex-row justify-between items-center mr-5 gap-4">
                    <Label htmlFor="name" className="text-right">
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
                                    onValueChange={(v) => { setEffort(v); setHaveEffort(true); }}
                                    className="w-full"
                                    defaultValue={[50]}
                                    max={100}
                                    step={1}
                                />
                            </TooltipTrigger>
                        </Tooltip>
                    </TooltipProvider>
                </DialogHeader>
                <DialogHeader className="mt-8 flex flex-row justify-between items-center mr-5 gap-4">
                    <Label htmlFor="name" className="text-right">
                        Comentario
                    </Label>
                    <Textarea
                        value={comment}
                        placeholder="Comentario opcional"
                        onChange={(e) => setComment(e.target.value)}
                    />
                </DialogHeader>
                <DialogFooter className="mr-5">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button type="submit" onClick={handleSubmit}>Crear Sprint</Button>
                </DialogFooter>
            </div>

        </DialogContent>
    )
}