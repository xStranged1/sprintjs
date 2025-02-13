import { useState } from 'react'
import '../App.css'
import { TimePickerDemo } from '@/components/ui/time-picker-demo'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getPace, getTotalSeconds } from '@/utils/utils'
import { createSprint } from '@/services/sprintService'
import { useToast } from '@/hooks/use-toast'
import { DateTimePicker } from '@/components/ui/dateTimePicker'

export const HomeScreen = () => {

    const [time, setTime] = useState<Date | undefined>(undefined)
    const [datetime, setDatetime] = useState<Date>(new Date())
    const [distance, setDistance] = useState('')
    const [pace, setPace] = useState('')
    const { toast } = useToast()

    const handleSubmit = async () => {
        const hours = time?.getHours()
        const minutes = time?.getMinutes()
        const seconds = time?.getSeconds()
        const sprint = {
            date: datetime,
            distance: Number(distance) * 1000,
            time: getTotalSeconds(hours, minutes, seconds)
        }
        const res = await createSprint(sprint)
        if (!res) toast({ title: 'Hubo un error creando el sprint', variant: 'destructive' })
        toast({ title: 'Sprint creado con exito!' })
    }

    const calculatePace = () => {
        const distanceFloat = parseFloat(distance)
        const hours = time?.getHours()
        const minutes = time?.getMinutes()
        const seconds = time?.getSeconds()
        const textPace = getPace(distanceFloat, hours, minutes, seconds)
        setPace(textPace)
    }

    return (
        <div>
            <h1>SprintJS</h1>

            <div className='my-2'>
                <DateTimePicker datetime={datetime} setDatetime={(e) => setDatetime(e)} />
            </div>
            <div className='my-2'>
                <h2>Tiempo total (s)</h2>
                <TimePickerDemo date={time} setDate={(e) => setTime(e)} />
            </div>
            <div className='my-2'>
                <h2>Distancia total (km)</h2>
                <Input type='text' value={distance} onChange={(e) => setDistance(e.target.value)} />
            </div>
            <Button variant='outline' className='mt-3' onClick={calculatePace}>Calcular ritmo</Button>

            <h1>Ritmo: {pace}</h1>

            <div className='my-2'>
                <Button color="black" className='mt-3' onClick={handleSubmit}>Guardar Sprint</Button>
            </div>

        </div>
    )
}
