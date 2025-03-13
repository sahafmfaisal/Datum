import { create } from 'zustand';
import { User } from '@supabase/supabase-js';

// Extend the User type with custom user metadata
declare module '@supabase/supabase-js' {
  interface UserMetadata {
    name?: string;
    age?: number;
    gender?: string;
    profileImage?: string;
  }
}

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  preferences: {
    genres: string[];
    readingLevel: string;
  };
  setPreferences: (preferences: { genres: string[]; readingLevel: string }) => void;
  // Add function to update user metadata
  updateUserMetadata: (metadata: Record<string, any>) => void;
}

export const useStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  preferences: {
    genres: [],
    readingLevel: 'intermediate',
  },
  setPreferences: (preferences) => set({ preferences }),
  // Function to update user metadata
  updateUserMetadata: (metadata) => set((state) => {
    if (!state.user) return state;
    
    return {
      user: {
        ...state.user,
        user_metadata: {
          ...state.user.user_metadata,
          ...metadata,
        }
      }
    };
  }),
}));