import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Filter, initialFilter } from "@/types/Sprint"
import { Filter as FilterIcon } from "lucide-react"
import { useRef, useState } from "react"

interface ParamsFilter {
    filter: Filter | undefined
    onApplyFilter: (filter: Filter) => void
}

export const FilterPopover = ({ filter, onApplyFilter }: ParamsFilter) => {

    const [open, setOpen] = useState(false)
    const [takeBreak, setTakeBreak] = useState(filter?.takeBreak ?? undefined)
    const [minDistance, setMinDistance] = useState(filter?.distanceRange?.min ?? '')
    const [maxDistance, setMaxDistance] = useState(filter?.distanceRange?.max ?? '')

    const [minEffort, setMinEffort] = useState<number[]>(filter?.effortRange?.min ? [filter.effortRange.min] : [50])
    const [haveMinEffort, setHaveMinEffort] = useState<boolean>(false)
    const [maxEffort, setMaxEffort] = useState<number[]>(filter?.effortRange?.max ? [filter.effortRange.max] : [50])
    const [haveMaxEffort, setHaveMaxEffort] = useState<boolean>(false)

    const takeBreakRef = useRef<boolean | undefined>(filter?.takeBreak ?? undefined)

    const handleClearFilters = () => {
        setTakeBreak(undefined); setMinDistance(''); setMaxDistance(''); setMinEffort([50]); setHaveMinEffort(false); setMaxEffort([50]); setHaveMaxEffort(false); takeBreakRef.current = undefined
        onApplyFilter(initialFilter)
        setOpen(false)
    }

    const handleApplyFilters = () => {
        const newFilter: Filter = {
            distanceRange: {
                min: minDistance ? Number(minDistance) : undefined,
                max: maxDistance ? Number(maxDistance) : undefined
            },
            takeBreak: takeBreakRef.current,
            effortRange: {
                min: haveMinEffort ? minEffort[0] : undefined,
                max: haveMaxEffort ? maxEffort[0] : undefined,
            }
        }
        setOpen(false)
        onApplyFilter(newFilter)
    }

    return (
        <Popover open={open}>
            <PopoverTrigger asChild>
                <Button variant='ghost' size={"lg"} onClick={() => setOpen(true)}><FilterIcon size={50} /></Button>
            </PopoverTrigger>

            <PopoverContent className="w-fit flex flex-row ml-5">
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
                                onChange={(text) => setMinDistance(text.target.value)}
                                value={minDistance}
                                id="distance"
                                className="max-w-36 flex-1 mt-1"
                            />
                        </div>
                        <div className="items-center">
                            <Label htmlFor="name">Distancia máxima (m)</Label>
                            <Input
                                onChange={(text) => setMaxDistance(text.target.value)}
                                value={maxDistance}
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
                </div>
                <div className="grid gap-2 border-l-2 border-border pl-4 ml-2">
                    <h4 className="font-medium leading-none">NIvel de esfuerzo</h4>

                    <div className="flex flex-row gap-6 items-center">
                        <div className="mb-8">
                            <TooltipProvider>
                                <Label htmlFor="name" className="text-right mt-2">
                                    Mínimo
                                </Label>
                                <Tooltip open={true}  >
                                    <TooltipContent side="top" className="my-1 ml-16">
                                        <p className="font-bold text-sm">{minEffort}</p>
                                    </TooltipContent>
                                    <TooltipTrigger asChild>
                                        <Slider
                                            value={minEffort}
                                            onValueChange={(v) => { setMinEffort(v); setHaveMinEffort(true); }}
                                            className="w-64"
                                            defaultValue={[50]}
                                            max={100}
                                            step={1}
                                        />
                                    </TooltipTrigger>
                                </Tooltip>
                                <div className="mt-2" />
                                <Label htmlFor="name" className="text-right">
                                    Máximo
                                </Label>
                                <Tooltip open={true} >
                                    <TooltipContent side="bottom" className="my-1 ml-16">
                                        <p className="font-bold text-sm">{maxEffort}</p>
                                    </TooltipContent>
                                    <TooltipTrigger asChild>
                                        <Slider
                                            value={maxEffort}
                                            onValueChange={(v) => { setMaxEffort(v); setHaveMaxEffort(true); }}
                                            className="w-64"
                                            defaultValue={[50]}
                                            max={100}
                                            step={1}
                                        />
                                    </TooltipTrigger>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                    <div className="flex flex-row justify-end self-end items-center gap-4 mt-2">
                        <Button onClick={handleClearFilters} variant='secondary'>Limpiar filtros</Button>
                        <Button variant='ghost' onClick={() => setOpen(false)}>Cancelar</Button>
                        <Button onClick={handleApplyFilters}>Aplicar</Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>

    )
}