import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/hooks/use-toast"
import { createCircuit } from "@/services/circuitService"
import { Plus } from "lucide-react"
import { useRef, useState } from "react"

export const CreateCircuit = () => {

    const [open, setOpen] = useState(false)
    const name = useRef('')
    const distance = useRef('')
    const { toast } = useToast()

    const handleCreateCircuit = async () => {

        if (!name.current) return
        if (!distance.current) return
        const numberDistance = Number(distance.current)
        if (isNaN(numberDistance)) return
        const res = await createCircuit({ name: name.current, distance: numberDistance })
        if (!res.success) {
            setOpen(false)
            toast({ title: 'Hubo un error creando el circuito', variant: 'destructive' })
            return
        }

        toast({ title: 'Circuito creado con exito!' })

        setOpen(false)
    }

    return (
        <Popover open={open}>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="w-full" onClick={() => setOpen(true)}><Plus className="h-8 w-8" />Crear circuito</Button>
            </PopoverTrigger>

            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Nuevo circuito</h4>
                        <p className="text-sm text-muted-foreground">
                            Setea el nombre y la distancia del circuito
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="name">Nombre</Label>
                            <Input
                                onChange={(text) => name.current = text.target.value}
                                id="name"
                                placeholder="Nombre del circuito"
                                className="col-span-2 "
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="distance">Distancia</Label>
                            <Input
                                onChange={(text) => distance.current = text.target.value}
                                id="distance"
                                placeholder="Distancia en metros"
                                className="col-span-2 "
                            />
                        </div>
                        <div className="flex flex-row justify-end items-center gap-4 mt-2">
                            <Button variant='ghost' onClick={() => setOpen(false)}>Cancelar</Button>
                            <Button onClick={handleCreateCircuit}>Confirmar</Button>
                        </div>

                    </div>
                </div>
            </PopoverContent>
        </Popover>

    )
}