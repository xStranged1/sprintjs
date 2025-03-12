import { useEffect, useMemo, useState } from 'react'
import '../App.css'
import { Button } from '@/components/ui/button'
import { getAllSprints, orderByDate, orderByTime } from '@/services/sprintService'
import { useToast } from '@/hooks/use-toast'
import { OrderedBy, Sprint } from '@/types/Sprint'
import { CardSprint } from '@/core/CardSprint'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { CreateSprint } from './components/CreateSprint'
import { FilterBar } from './components/FilterBar'

export const HomeScreen = () => {

    const [sprints, setSprints] = useState<Sprint[]>([])
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [orderedBy, setOrderedBy] = useState<OrderedBy>('date')
    const [isOrderedAscending, setIsOrderedAscending] = useState(false)

    const { toast } = useToast()

    const addSprint = (newSprint: Sprint) => {
        setSprints((prevSprints) => [...prevSprints, newSprint])
    }

    useEffect(() => {
        const fetchSprints = async () => {
            setLoading(true)
            const res = await getAllSprints()
            setLoading(false)
            if (!res.success) return toast({ title: 'Hubo un error recuperando los sprints', description: res.message, variant: 'destructive' })
            const sprints = res.data
            setSprints(sprints)
            console.log(sprints);
        }
        fetchSprints()
    }, [])


    const orderedSprints = useMemo(() => {
        console.log(`use memo`);

        const time1 = performance.now()

        let orderedSprint: Sprint[] = sprints
        if (orderedBy == 'date') {
            orderedSprint = orderByDate(sprints)
        }
        if (orderedBy == 'time') {
            orderedSprint = orderByTime(sprints)
        }
        if (orderedBy == 'circuit') {
            orderedSprint = orderByDate(sprints)
        }
        if (orderedBy == 'pace') {
            orderedSprint = orderByDate(sprints)
        }
        if (isOrderedAscending) {
            orderedSprint = orderedSprint.reverse()
        }
        const time2 = performance.now()
        console.log(`calculo ordeno sprints: ${time2 - time1}ms`);

        return orderedSprint
    }, [sprints, orderedBy, isOrderedAscending])


    return (
        <div>
            <div className='flex justify-between gap-5 items-center'>
                <FilterBar orderedBy={orderedBy} setOrderedBy={setOrderedBy} isOrderedAscending={isOrderedAscending} setIsOrderedAscending={setIsOrderedAscending} />
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className='bg-primary'>Crear nuevo Sprint</Button>
                    </DialogTrigger>
                    <CreateSprint closeDialog={setOpen} onSubmit={addSprint} />
                </Dialog>
            </div>
            {loading && (<h2>Loading...</h2>)}
            {orderedSprints.length > 0 && (
                sprints.map((sprint, i) => (
                    <CardSprint sprint={sprint} key={i} />
                ))
            )}

        </div>
    )
}
