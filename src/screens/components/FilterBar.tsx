import { Button } from '@/components/ui/button'
import { OrderedBy } from '@/types/Sprint'
import { ArrowUp } from 'lucide-react'

interface FilterBarProps {
    orderedBy: OrderedBy
    setOrderedBy: (value: OrderedBy) => void
    isOrderedAscending: boolean
    setIsOrderedAscending: (value: boolean) => void
}

export const FilterBar = ({ orderedBy, setOrderedBy, isOrderedAscending, setIsOrderedAscending }: FilterBarProps) => {

    const handleOrderChange = (order: OrderedBy) => {
        setOrderedBy(order)
        setIsOrderedAscending(!isOrderedAscending)
    }

    return (
        <div className="flex items-center gap-4">
            <h3>Ordenar por:</h3>
            {['date', 'time'].map((order) => (
                <Button key={order} variant="ghost" onClick={() => handleOrderChange(order as OrderedBy)}>
                    {order === 'date' ? 'Fecha' : 'Tiempo'}
                    {orderedBy === order && (
                        <ArrowUp className={`transform transition-transform duration-300 ${isOrderedAscending ? "rotate-0" : "rotate-180"}`} />
                    )}
                </Button>
            ))}
        </div>
    )
}
