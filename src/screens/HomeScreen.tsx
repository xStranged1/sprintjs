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

    const { toast } = useToast()

    useEffect(() => {
        const fetchSprints = async () => {
            setLoading(true)
            const res = await getAllSprints()
            setLoading(false)
            if (!res) return toast({ title: 'Hubo un error recuperando los sprints', variant: 'destructive' })
            setSprints(res)
        }
        fetchSprints()
    }, [])

    return (
        <div>
            <div className='justify-self-end'>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className='bg-primary'>Crear nuevo Sprint</Button>
                    </DialogTrigger>
                    <CreateSprint />
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
