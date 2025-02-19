import { useEffect, useState } from 'react'
import '../App.css'
import { Button } from '@/components/ui/button'
import { getAllSprints } from '@/services/sprintService'
import { useToast } from '@/hooks/use-toast'
import { Sprint } from '@/types/Sprint'
import { CardSprint } from '@/core/CardSprint'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { CreateSprint } from './components/CreateSprint'

export const HomeScreen = () => {

    const [sprints, setSprints] = useState<Sprint[]>([])
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

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
            setSprints(res.data)
        }
        fetchSprints()
    }, [])

    return (
        <div>
            <div className='justify-self-end'>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className='bg-primary'>Crear nuevo Sprint</Button>
                    </DialogTrigger>
                    <CreateSprint closeDialog={setOpen} onSubmit={addSprint} />
                </Dialog>
            </div>
            {loading && (<h2>Loading...</h2>)}
            {sprints.length > 0 && (
                sprints.map((sprint) => (
                    <CardSprint sprint={sprint} key={sprint.id} />
                ))
            )}

        </div>
    )
}
