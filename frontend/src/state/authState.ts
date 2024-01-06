import { create } from 'zustand';
import { User } from '../types/types';

type State = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const useAuthState = create<State>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useAuthState;
