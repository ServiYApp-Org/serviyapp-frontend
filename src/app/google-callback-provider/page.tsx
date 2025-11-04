"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Api } from "@/app/services/api";
import { useAuthStore } from "@/app/store/auth.store";
import { toast } from "react-toastify";
import axios from "axios";

export default function GoogleCallbackProvider() {
	const params = useSearchParams();
	const router = useRouter();
	const setAuth = useAuthStore((s) => s.setAuth);

	useEffect(() => {
		const token = params.get("token");
		const id = params.get("id"); // ID enviado por el backend

		if (!token || !id) {
			toast.error("Datos incompletos de Google (falta token o id)");
			return router.push("/loginProvider");
		}

		(async () => {
			try {
				// 🟢 Log baseURL
				console.log("🌐 API baseURL:", Api.defaults.baseURL);

				// 🟢 Guardar token e ID
				localStorage.setItem("access_token", token);
				localStorage.setItem("provider_id", id);

				console.log("✅ Token guardado:", token);
				console.log("✅ Provider ID guardado:", id);

				// 🟡 Llamada directa (con validación manual del status)
				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
					{
						headers: { Authorization: `Bearer ${token}` },
						validateStatus: () => true,
					}
				);

				console.log("🔍 Status:", response.status);
				console.log("🔍 Data:", response.data);

				// ❌ Si la API responde con error
				if (response.status !== 200) {
					toast.error(`Error ${response.status} al obtener el perfil`);
					return router.push("/loginProvider");
				}

				const provider = response.data;
				console.log("Proveedor recibido desde /auth/me:", provider);

				// 🧠 Guardar en Zustand
				setAuth({
					token,
					role: provider.role,
					provider: {
						id: provider.id,
						email: provider.email,
						names: provider.names,
						surnames: provider.surnames,
						userName: provider.userName,
						phone: provider.phone,
						country: provider.country?.name || "",
						profilePicture: provider.profilePicture || "",
						role: provider.role,
						isCompleted: provider.isCompleted,
						status: provider.status,
					},
				});

				console.log("🧠 Estado AuthStore actualizado:", useAuthStore.getState());

				toast.success("Inicio de sesión con Google exitoso", {
					autoClose: 1500,
				});

				// 🧭 Redirigir según si el perfil está completo
				setTimeout(() => {
					if (!provider.isCompleted) {
						router.push(`/complete-register-provider?id=${provider.id}`);
					} else {
						router.push("/provider/dashboard");
					}
				}, 1500);
			} catch (err) {
				console.error("❌ Error en login Google Provider:", err);
				toast.error("Error al recuperar datos del proveedor");
				router.push("/loginProvider");
			}
		})();
	}, [params, router, setAuth]);

	return (
		<div className="flex items-center justify-center min-h-screen">
			<p>Validando sesión con Google...</p>
		</div>
	);
}
