import { create } from 'zustand'
import { Sprint } from '@/types/Sprint'

interface SprintStore {
    sprintToEdit: Sprint | null
    setSprintToEdit: (sprint: Sprint | null) => void
    clearSprintToEdit: () => void
}

export const useSprintStore = create<SprintStore>((set) => ({
    sprintToEdit: null,
    setSprintToEdit: (sprint) => set({ sprintToEdit: sprint }),
    clearSprintToEdit: () => set({ sprintToEdit: null }),
}))

