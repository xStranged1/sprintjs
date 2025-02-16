import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DateTimePicker } from "@/components/ui/dateTimePicker"
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TimePicker } from "@/components/ui/TimePicker"
import { useToast } from "@/hooks/use-toast"
import { createSprint } from "@/services/sprintService"
import { getPace, getTotalSeconds } from "@/utils/utils"
import { useEffect, useState } from "react"

export const CreateSprint = () => {

    const [time, setTime] = useState<Date | undefined>(undefined)
    const [datetime, setDatetime] = useState<Date>(new Date())
    const [distance, setDistance] = useState('')
    const [takeBreak, setTakeBreak] = useState(false)
    const [pace, setPace] = useState('')
    const { toast } = useToast()

    const handleSubmit = async () => {
        const hours = time?.getHours()
        const minutes = time?.getMinutes()
        const seconds = time?.getSeconds()
        const sprint = {
            date: datetime,
            distance: Number(distance) * 1000,
            time: getTotalSeconds(hours, minutes, seconds),
            takeBreak
        }
        const res = await createSprint(sprint)
        if (!res) toast({ title: 'Hubo un error creando el sprint', variant: 'destructive' })
        toast({ title: 'Sprint creado con exito!' })
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
        <DialogContent className="sm:max-w-[425px] mt-[-28px] ">
            <DialogHeader>
                <DialogTitle>Crear Sprint</DialogTitle>
                <DialogDescription>
                    Ingresa todos los datos de tu Sprint aquí. Clickea guardar cuando lo tengas!
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Fecha y hora
                    </Label>
                    <DateTimePicker datetime={datetime} setDatetime={(e) => setDatetime(e)} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Tiempo total (s)
                    </Label>
                    <TimePicker date={time} setDate={(e) => setTime(e)} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Distancia total (m)
                    </Label>
                    <Input type='text' value={distance} onChange={(e) => setDistance(e.target.value)} className="col-span-3" placeholder="Distancia en metros" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Checkbox id="takeBreak" onCheckedChange={() => setTakeBreak(prev => !prev)} checked={takeBreak}
                        className="justify-self-end"
                    />
                    <Label htmlFor="takeBreak" className="text-left col-span-3">
                        Tomó descansos?
                    </Label>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Ritmo
                    </Label>
                    <Input
                        value={pace}
                        disabled
                        placeholder="Ritmo en mm:ss/km"
                        className="col-span-3"
                    />
                </div>
            </div>
            <DialogFooter>
                <Button type="submit" onClick={handleSubmit}>Save changes</Button>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Close
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    )
}