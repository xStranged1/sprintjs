import { useEffect, useState } from 'react'
import '../App.css'
import { getSprintById } from '@/services/sprintService'
import { useToast } from '@/hooks/use-toast'
import { Sprint } from '@/types/Sprint'
import { CardSprint } from '@/core/CardSprint'
import { useGetAccessToken } from '@/services/api'
import { useParams } from 'wouter'

export const DetailSprintScreen = () => {

    const [sprint, setSprint] = useState<Sprint>()
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const getAccessToken = useGetAccessToken();
    const { sprintId } = useParams()

    useEffect(() => {
        const fetchSprint = async () => {
            if (!sprintId) return
            setLoading(true)
            const token = await getAccessToken()
            const res = await getSprintById(sprintId, token)
            setLoading(false)
            if (!res.success) return toast({ title: 'Hubo un error recuperando el sprint', description: res.message, variant: 'destructive' })
            const sprint = res.data
            setSprint(sprint)
            console.log(sprint);
        }
        fetchSprint()
    }, [])

    return (
        <div>
            {loading && (<h2>Loading...</h2>)}
            {sprint && <CardSprint sprint={sprint} />}
        </div>
    )
}
