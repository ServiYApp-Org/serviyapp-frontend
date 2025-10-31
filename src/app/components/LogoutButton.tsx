"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/auth.store";

export default function LogoutButton() {
	const router = useRouter();
	const { clearAuth, role } = useAuthStore();

	const handleLogout = () => {
		clearAuth();
		const target = role === "provider" ? "/loginProvider" : "/loginUser";
		router.push(target);
	};

	return (
		<button
			onClick={handleLogout}
			className="px-3 py-2 text-sm rounded-lg border transition-colors"
			style={{
				borderColor: "var(--color-primary)",
				color: "var(--color-primary)",
			}}
		>
			Cerrar sesión
		</button>
	);
}
