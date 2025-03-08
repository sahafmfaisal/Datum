import { create } from 'zustand';
import { User } from '@supabase/supabase-js';

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  preferences: {
    genres: string[];
    readingLevel: string;
  };
  setPreferences: (preferences: { genres: string[]; readingLevel: string }) => void;
}

export const useStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  preferences: {
    genres: [],
    readingLevel: 'intermediate',
  },
  setPreferences: (preferences) => set({ preferences }),
}));

