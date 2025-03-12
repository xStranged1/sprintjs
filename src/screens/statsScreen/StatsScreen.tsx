
import '@/App.css'
import { StatBarChart } from './components/StatBarChart'
import { StatPaceChart } from './components/StatPaceChart'

export const StatsScreen = () => {

    return (
        <>
            <StatBarChart />
            <div className='mt-6' />
            <StatPaceChart />
        </>

    )
}
