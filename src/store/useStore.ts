import { create } from 'zustand'

export const useStore = create((set) => ({
  isLoggedIn: true,
}))

export default useStore
