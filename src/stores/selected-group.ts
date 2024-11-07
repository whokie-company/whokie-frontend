import { create } from 'zustand'

interface SelectedGroupProps {
  groupId?: number
  setGroupId: (groupId?: number) => void
}

export const useSelectedGroupStore = create<SelectedGroupProps>((set) => ({
  groupId: undefined,
  setGroupId: (groupId) => {
    set({ groupId })
  },
}))
