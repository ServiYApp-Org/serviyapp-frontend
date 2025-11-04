"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Api } from "@/app/services/api";
import { useAuthStore } from "@/app/store/auth.store";
import { toast } from "react-toastify";

export default function GoogleCallbackUser() {
	const params = useSearchParams();
	const router = useRouter();
	const setAuth = useAuthStore((s) => s.setAuth);

	useEffect(() => {
		const token = params.get("token");

		if (!token) {
			toast.error("Token no recibido");
			return router.push("/loginUser");
		}

		(async () => {
			try {
				// 1️⃣ Guardar token en localStorage
				localStorage.setItem("access_token", token);

				// 2️⃣ Obtener usuario desde el backend
				const { data: user } = await Api.get("/auth/me", {
					headers: { Authorization: `Bearer ${token}` },
				});
				console.log("👤 Usuario recibido desde /auth/me:", user);

				// 3️⃣ Guardar en Zustand
				setAuth({
					token,
					role: user.role,
					user: {
						id: user.id,
						email: user.email,
						names: user.names,
						surnames: user.surnames,
						phone: user.phone,
						country: user.country?.name || "",
						profilePicture: user.profilePicture || "",
						role: user.role,
						isCompleted: user.isCompleted,
					},
				});

				console.log("🧠 Estado actualizado:", useAuthStore.getState());

				toast.success("Inicio de sesión con Google exitoso", {
					autoClose: 1500,
				});

				// 4️⃣ Redirigir según el estado del perfil
				setTimeout(() => {
					if (!user.isCompleted) {
						router.push(`/complete-register-user?id=${user.id}`);
					} else {
						router.push("/user/services");
					}
				}, 1500);
			} catch (err) {
				console.error("❌ Error al obtener datos del usuario:", err);
				toast.error("Error al recuperar datos de usuario");
				router.push("/loginUser");
			}
		})();
	}, [params, router, setAuth]);

	return (
		<div className="flex items-center justify-center min-h-screen">
			<p>Validando sesión con Google...</p>
		</div>
	);
}
