import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Filter } from "@/types/Sprint"
import { Filter as FilterIcon } from "lucide-react"
import { useRef, useState } from "react"

interface ParamsFilter {
    onApplyFilter: (filter: Filter) => void
}

export const FilterPopover = ({ onApplyFilter }: ParamsFilter) => {

    const [open, setOpen] = useState(false)
    const [takeBreak, setTakeBreak] = useState(false)
    const minDistance = useRef('')
    const maxDistance = useRef('')
    const takeBreakRef = useRef<boolean | undefined>()

    const handleApplyFilters = () => {
        const newFilter: Filter = {
            distanceRange: {
                min: minDistance.current ? Number(minDistance.current) : undefined,
                max: maxDistance.current ? Number(maxDistance.current) : undefined
            },
            takeBreak: takeBreakRef.current
        }

        onApplyFilter(newFilter)
    }

    return (
        <Popover open={open}>
            <PopoverTrigger asChild>
                <Button variant='ghost' size={"lg"} onClick={() => setOpen(true)}><FilterIcon size={50} /></Button>
            </PopoverTrigger>

            <PopoverContent className="w-fit flex flex-row">
                <div className="grid gap-4 border-r-2 border-border h-full pr-4 mr-2">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Filtros de los sprints</h4>
                        <p className="text-sm text-muted-foreground">
                            Puedes encadenar varios filtros
                        </p>
                    </div>
                    <div className="flex flex-row gap-6 items-center">
                        <div className="items-center">
                            <Label htmlFor="name">Distancia mínima (m)</Label>
                            <Input
                                onChange={(text) => minDistance.current = text.target.value}
                                id="distance"
                                className="max-w-36 flex-1 mt-1"
                            />
                        </div>
                        <div className="items-center">
                            <Label htmlFor="name">Distancia máxima (m)</Label>
                            <Input
                                onChange={(text) => maxDistance.current = text.target.value}
                                id="distance"
                                className="max-w-36 flex-1 mt-1"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid gap-2">
                    <div className="flex flex-row gap-6 items-center">
                        <div className="flex flex-row  gap-2 items-center">
                            <Checkbox id="takeBreak"
                                className="justify-self-end"
                                checked={takeBreak}
                                onCheckedChange={() => { setTakeBreak(prev => !prev); takeBreakRef.current = !takeBreak }}
                            />
                            <Label htmlFor="takeBreak" className="text-left col-span-3 cursor-pointer ml-1">
                                Tomó descansos?
                            </Label>
                        </div>
                    </div>
                    <div className="flex flex-row justify-end self-end items-center gap-4 mt-2">
                        <Button variant='ghost' onClick={() => setOpen(false)}>Cancelar</Button>
                        <Button onClick={handleApplyFilters}>Aplicar</Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>

    )
}