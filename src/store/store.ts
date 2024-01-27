
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


export const useStore = create(
	persist(
		(set) => ({
			// Initial state
			user: {
				email: '',
			},
			// actions
			startLogin: (user) => set({ user }),
			startLogout: () => {
				set({ user: {}  });
			},
		}),
		{
			name: 'auth-storage',
		}
	)
);
