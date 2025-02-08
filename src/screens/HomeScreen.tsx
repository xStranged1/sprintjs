import { useState } from 'react'
import '../App.css'
import { TimePickerDemo } from '@/components/ui/time-picker-demo'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'


export const HomeScreen = () => {

    const [time, setTime] = useState<Date | undefined>(undefined)
    const [distance, setDistance] = useState('')
    const [pace, setPace] = useState('')

    const calculatePace = () => {
        const distanceFloat = parseFloat(distance)
        const hours = time?.getHours()
        const minutes = time?.getMinutes()
        const seconds = time?.getSeconds()
        const totalSeconds = (hours ?? 0) * 60 * 60 + (minutes ?? 0) * 60 + (seconds ?? 0)
        const timePerKm = totalSeconds / distanceFloat
        const minutesPerKm = timePerKm / 60
        const decimal = minutesPerKm % 1
        const secondsPerKm = Math.round((decimal * 100) * 60 / 100).toString()
        let textSeconds = secondsPerKm
        if (secondsPerKm.length == 1) {
            textSeconds = secondsPerKm + 0
        }
        setPace(`${Math.floor(minutesPerKm)}:${(textSeconds)}m / KM`)
    }

    return (
        <div>
            <h1>SprintJS</h1>
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
        </div>
    )
}
