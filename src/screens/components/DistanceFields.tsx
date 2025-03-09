import { DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAllCircuits } from "@/services/circuitService"
import { Circuit } from "@/types/Sprint"
import { Label } from "@radix-ui/react-label"
import { useEffect, useState } from "react"
import { CreateCircuit } from "./CreateCircuit"

interface Params {
    onInputDistance: (value: string) => void,
    onSelectCircuit: (value: Circuit) => void,
    onInputLaps: (value: string) => void,
}

export const DistanceFields = ({ onSelectCircuit, onInputDistance, onInputLaps }: Params) => {

    const [distance, setDistance] = useState('')
    const [selectedCircuit, setSelectedCircuit] = useState<Circuit | undefined>()
    const [laps, setLaps] = useState('')
    const [circuits, setCircuits] = useState<Circuit[]>([])

    useEffect(() => {
        const fetchCircuits = async () => {
            const res = await getAllCircuits()
            console.log(res);
            if (res.success) {
                setCircuits(res.data)
            }
        }
        fetchCircuits()
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
                        <SelectSeparator />
                        <CreateCircuit />
                    </SelectContent>
                </Select>

            </DialogHeader >
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