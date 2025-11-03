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
				// 1. guardar token en localStorage
				localStorage.setItem("access_token", token);

				// 2. pedir user con /auth/me
				const { data: user } = await Api.get("/auth/me", {
					headers: { Authorization: `Bearer ${token}` },
				});
				console.log("Respuesta backend:", user);
				// 3. guardar en Zustand
				setAuth({
					token,
					role: user.role,
					user,
				});

				console.log(
					"Usuario guardado en Zustand:",
					useAuthStore.getState().user
				);

				toast.success("Inicio de sesión con Google exitoso", {
					autoClose: 1500,
				});

				// 4. redirigir
				setTimeout(() => {
					if (!user.isCompleted) {
						router.push(`/complete-register-user?id=${user.id}`);
					} else {
						router.push("/user/services");
					}
				}, 1500);
			} catch (err) {
				toast.error("Error al recuperar datos de usuario");
				router.push("/loginUser");
			}
		})();
	}, []);

	return (
		<div className="flex items-center justify-center min-h-screen">
			<p>Validando sesión con Google...</p>
		</div>
	);
}
