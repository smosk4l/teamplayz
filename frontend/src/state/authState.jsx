import { create } from 'zustand';

const useAuthState = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useAuthState;
