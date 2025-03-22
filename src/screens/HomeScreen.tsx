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
import { IPersonalRecord } from '@/types/Stat'
import { AnimationConfetti } from '@/core/AnimationConffetti'
import { useAuth0 } from '@auth0/auth0-react'
import { useGetAccessToken } from '@/services/api'

export const HomeScreen = () => {

    const [sprints, setSprints] = useState<Sprint[]>([])
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [orderedBy, setOrderedBy] = useState<OrderedBy>('date')
    const [isOrderedAscending, setIsOrderedAscending] = useState(false)
    const { toast } = useToast()
    const [showConfetti, setShowConfetti] = useState(false)
    const { user, isAuthenticated, isLoading } = useAuth0();
    const getAccessToken = useGetAccessToken();

    console.log("user");
    console.log(user);
    console.log("isAuthenticated");
    console.log(isAuthenticated);
    console.log("isLoading");
    console.log(isLoading);

    const handleSubmit = (data: { newSprint: Sprint, newPersonalRecord?: IPersonalRecord }) => {
        setSprints((prevSprints) => [...prevSprints, data.newSprint])
        if (data.newPersonalRecord) {
            const distanceCategory = data.newPersonalRecord.distance.distance
            toast({
                title: 'Felicidades! Rompiste un record personal',
                description: `Nuevo record personal en la categoria de ${distanceCategory}m`,
                duration: 6000
            })
            setShowConfetti(true)
        }
        return
    }

    useEffect(() => {
        const fetchSprints = async () => {
            setLoading(true)
            const token = await getAccessToken()
            const res = await getAllSprints(token)
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
            {showConfetti && <AnimationConfetti />}
            <div className='flex justify-between gap-5 items-center'>
                <FilterBar orderedBy={orderedBy} setOrderedBy={setOrderedBy} isOrderedAscending={isOrderedAscending} setIsOrderedAscending={setIsOrderedAscending} />
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className='bg-primary'>Crear nuevo Sprint</Button>
                    </DialogTrigger>
                    <CreateSprint closeDialog={setOpen} onSubmit={handleSubmit} />
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
