import { useState } from 'react'
import { TimePicker } from '@/components/ui/TimePicker'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getPace } from '@/utils/utils'
import { DateTimePicker } from '@/components/ui/dateTimePicker'

export const PaceScreen = () => {

    const [time, setTime] = useState<Date | undefined>(undefined)
    const [datetime, setDatetime] = useState<Date>(new Date())
    const [distance, setDistance] = useState('')
    const [pace, setPace] = useState('')


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

            <div className='my-2'>
                <DateTimePicker datetime={datetime} setDatetime={(e) => setDatetime(e)} />
            </div>
            <div className='my-2'>
                <h2>Tiempo total (s)</h2>
                <TimePicker date={time} setDate={(e) => setTime(e)} />
            </div>
            <div className='my-2'>
                <h2>Distancia total (km)</h2>
                <Input type='text' value={distance} onChange={(e) => setDistance(e.target.value)} />
            </div>
            <Button variant='outline' className='mt-3' onClick={calculatePace}>Calcular ritmo</Button>

            <h1>Ritmo: {pace}</h1>

        </div>
    )
}
