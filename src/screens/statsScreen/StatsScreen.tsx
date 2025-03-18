
import '@/App.css'
import { StatBarChart } from './components/StatBarChart'
import { StatPaceChart } from './components/StatPaceChart'
import { useEffect, useState } from 'react'
import { Sprint } from '@/types/Sprint'
import { getAllSprints } from '@/services/sprintService'
import { toast } from '@/hooks/use-toast'
import { PersonalRecords } from './components/PersonalRecords'

export const StatsScreen = () => {
    const [loading, setLoading] = useState(true)
    const [sprints, setSprints] = useState<Sprint[]>([])

    useEffect(() => {
        const fetchSprints = async () => {
            setLoading(true)
            const res = await getAllSprints()
            setLoading(false)
            if (!res.success) return toast({ title: 'Hubo un error recuperando los sprints', description: res.message, variant: 'destructive' })
            const sprints = res.data.reverse()
            setSprints(sprints)
        }
        fetchSprints()
    }, [])

    return (
        <>
            <StatBarChart fetchedSprints={sprints} loading={loading} />
            <div className='mt-6' />
            <StatPaceChart fetchedSprints={sprints} loading={loading} />
            <div className='mt-6' />
            <PersonalRecords />
        </>

    )
}
