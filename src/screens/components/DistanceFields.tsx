import { DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Circuit } from "@/types/Sprint"
import { Label } from "@radix-ui/react-label"
import { useEffect, useMemo, useState } from "react"

interface Params {
    onInputDistance: (value: string) => void,
    onSelectCircuit: (value: Circuit) => void,
    onInputLaps: (value: string) => void,
}

export const DistanceFields = ({ onSelectCircuit, onInputDistance, onInputLaps }: Params) => {

    const [distance, setDistance] = useState('')
    const [selectedCircuit, setSelectedCircuit] = useState<Circuit | undefined>()
    const [laps, setLaps] = useState('')

    const circuits = useMemo(() => {
        // fetch circuits
        const dummyCircuits: Circuit[] = [
            {
                name: 'Plaza Azcuenaga',
                distance: 548.24
            },
            {
                name: 'Parque San Martín',
                distance: 1458.245

            }
        ]
        return dummyCircuits
    }, [])

    useEffect(() => {
        if (isNaN(Number(laps))) return
        if (laps && selectedCircuit) {
            const newDistance = Math.round(Number(selectedCircuit.distance) * Number(laps))
            setDistance(newDistance.toString())
            onInputDistance(newDistance.toString())
        }
    }, [laps, selectedCircuit])


    const handleOnSelectCircuit = (value: Circuit) => {
        setSelectedCircuit(value)
        onSelectCircuit(value)
    }

    return (
        <>
            <DialogHeader className="grid grid-cols-4 items-center mr-5 gap-4">
                <Label htmlFor="name" className="text-right">
                    Circuito
                </Label>
                <Select onValueChange={(value) => handleOnSelectCircuit(JSON.parse(value))}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecciona un circuito" />
                    </SelectTrigger>
                    <SelectContent>
                        {circuits.map((circuit) => (
                            <SelectItem key={circuit.name} value={JSON.stringify(circuit)}>{circuit.name}</SelectItem>
                        ))}
                        <SelectItem key='new' value='Agregar un circuito'>Agregar un circuito</SelectItem>
                    </SelectContent>
                </Select>
            </DialogHeader>
            <DialogHeader className="grid grid-cols-4 items-center mr-5 gap-4">
                <Label htmlFor="name" className="text-right">
                    Vueltas
                </Label>
                <Input type='text'
                    className="col-span-3"
                    placeholder="Cantidad de vueltas al circuito"
                    value={laps}
                    onChange={(e) => {
                        const value = e.target.value
                        setLaps(value)
                        onInputLaps(value)
                    }} />
            </DialogHeader>
            <DialogHeader className="grid grid-cols-4 items-center mr-5 gap-4">
                <Label htmlFor="name" className="text-right">
                    Distancia total (m)
                </Label>
                <Input type='text'
                    value={distance}
                    className="col-span-3"
                    placeholder="Distancia en metros"
                    onChange={(e) => {
                        const value = e.target.value
                        setDistance(value)
                        onInputDistance(value)
                        setLaps('')
                    }} />
            </DialogHeader>
        </>
    )
}