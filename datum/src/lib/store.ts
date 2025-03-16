import { create } from 'zustand';
import { User } from '@supabase/supabase-js';

interface UserPreferences {
  name: string;
  age: number;
  gender: string;
  readerType: string;
  readingLevel: string;
  genres: string[];
  favoriteCategories: string[];
  profileUrl: string | null;
}

interface UserState {
  user: User | null;
  preferences: UserPreferences;
  setUser: (user: User | null) => void;
  setPreferences: (preferences: UserPreferences) => void;
}

const defaultPreferences: UserPreferences = {
  name: '',
  age: 0,
  gender: '',
  readerType: 'casual',
  readingLevel: 'intermediate',
  genres: [],
  favoriteCategories: [],
  profileUrl: null
};

export const useStore = create<UserState>((set) => ({
  user: null,
  preferences: defaultPreferences,
  setUser: (user) => set({ user }),
  setPreferences: (preferences) => set({ preferences }),
}));