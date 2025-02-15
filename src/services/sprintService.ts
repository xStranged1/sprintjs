import { API_URL } from "@/config/config";
import { BaseSprint, Sprint } from "@/types/Sprint";

export const createSprint = async (sprint: BaseSprint): Promise<Sprint | false | string[]> => {
    try {
        const response = await fetch(`${API_URL}/sprint`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sprint)
        })
        const data = await response.json()
        if (data.error) return data.error
        return data
    } catch (err) {
        console.log(err);
        return false
    }
}

export const getAllSprints = async (): Promise<Sprint[] | false> => {
    try {
        const response = await fetch(`${API_URL}/sprint`, { method: 'GET' })
        if (!response.ok) return false
        const sprints = await response.json()
        return sprints
    } catch (err) {
        console.log(err);
        return false
    }
}
