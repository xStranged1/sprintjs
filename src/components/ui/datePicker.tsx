import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"

export function DatePicker({ date, setDate }: { date: Date, setDate: (date: Date) => void }) {
    const [dateState, setDateState] = useState<Date>(date ?? new Date())
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={dateState}
                    onSelect={(date) => {
                        setDateState(date ?? new Date())
                        setDate(date ?? new Date())
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
