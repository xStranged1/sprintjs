import { Sprint } from "@/types/Sprint";

export const CardSprint = ({ sprint }: { sprint: Sprint }) => {

    const textDate = sprint.date.toLocaleString()
    return (
        <div className="my-4">
            <h2>Fecha: {textDate}</h2>
            <h2>Distancia: {sprint.distance}</h2>
            <h2>Tiempo: {sprint.time}</h2>
            <h2>{sprint.createDate}</h2>
        </div>
    )
}