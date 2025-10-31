"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";


export type Role = "provider" | "user";

export interface User {
	id: string;
	email: string;
	name?: string;
	lastName?: string;
}

interface AuthState {
	token: string | null;
	role: Role | null;
	user: User | null;
	isAuthenticated: boolean;
	setAuth: (data: { token: string; role: Role; user: User }) => void;
	clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			token: null,
			role: null,
			user: null,
			isAuthenticated: false,

			setAuth: (data) =>
				set({
					token: data.token,
					role: data.role,
					user: data.user,
					isAuthenticated: true,
				}),

			clearAuth: () => {
				set({ token: null, user: null, role: null });
				localStorage.removeItem("access_token");
				localStorage.removeItem("provider_id");
				localStorage.removeItem("user_role");
			},
		}),
		{ name: "serviyapp-auth" }
	)
);
