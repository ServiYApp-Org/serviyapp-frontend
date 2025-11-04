"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role = "admin" | "provider" | "user";

export interface User {
	id: string;
	email: string;
	names?: string;
	surnames?: string;
	phone?: string;
	country?: string;
	profilePicture?: string;
	role: Role;
	isCompleted?: boolean;
}

export interface Provider {
	id: string;
	email: string;
	names?: string;
	surnames?: string;
	userName?: string;
	phone?: string;
	country?: string;
	profilePicture?: string;
	role: Role;
	isCompleted?: boolean;
	status?: string;
}

interface AuthState {
	token: string | null;
	role: Role | null;
	user: User | null;
	provider: Provider | null;
	isAuthenticated: boolean;

	setAuth: (data: {
		token: string;
		role: Role;
		user?: User;
		provider?: Provider;
	}) => void;

	clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			token: null,
			role: null,
			user: null,
			provider: null,
			isAuthenticated: false,

			setAuth: (data) =>
				set({
					token: data.token,
					role: data.role,
					user: data.role === "user" ? data.user || null : null,
					provider:
						data.role === "provider" ? data.provider || null : null,
					isAuthenticated: true,
				}),

			clearAuth: () => {
				set({
					token: null,
					role: null,
					user: null,
					provider: null,
					isAuthenticated: false,
				});
				localStorage.removeItem("access_token");
				localStorage.removeItem("user_id");
				localStorage.removeItem("provider_id");
			},
		}),
		{ name: "serviyapp-auth" }
	)
);
