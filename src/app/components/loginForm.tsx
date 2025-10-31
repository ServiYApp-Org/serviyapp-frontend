"use client";

import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Api } from "@/app/services/api";
import { useAuthStore } from "@/app/store/auth.store";

type Role = "provider" | "user";

interface LoginFormProps {
	role: Role;
}

const loginSchema = Yup.object().shape({
	email: Yup.string()
		.email("El formato del correo electrónico no es válido.")
		.required("El correo electrónico es obligatorio."),
	password: Yup.string().required("La contraseña es obligatoria."),
});

export default function LoginForm({ role }: LoginFormProps) {
	const router = useRouter();
	const setAuth = useAuthStore((s) => s.setAuth);

	const handleSubmit = async (values: {
		email: string;
		password: string;
	}) => {
		try {
			// Endpoint ajustado
			const endpoint =
				role === "provider"
					? "/auth/login/provider"
					: "/auth/login/user";

			const { data } = await Api.post(endpoint, values);

			// Guardar sesión en Zustand
			setAuth({
				token: data.access_token,
				role,
				user: data.provider || data.user,
			});

			toast.success("Inicio de sesión exitoso", { autoClose: 2000 });

			setTimeout(() => {
				// 🔹 Si es proveedor
				if (role === "provider") {
					router.push("/provider/dashboard");
					return;
				}

				// 🔹 Si es usuario
				if (role === "user") {
					const userRole = data.user?.role?.toLowerCase();

					if (userRole === "admin") router.push("/admin/dashboard");
					else router.push("/user/home");

					return;
				}
			}, 2000);
		} catch (error: any) {
			console.error(error);
			const msg =
				error?.response?.data?.message ||
				"Credenciales incorrectas o error en el servidor.";
			toast.error(msg, { autoClose: 2500 });
		}
	};

	const handleGoogle = () => {
		const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
		const endpoint =
			role === "provider" ? "/auth/google/provider" : "/auth/google/user";
		window.location.href = `${base}${endpoint}`;
	};

	return (
		<div
			className="flex flex-col items-center justify-center min-h-screen px-4"
			style={{ backgroundColor: "var(--background)" }}
		>
			<ToastContainer position="top-right" />

			<div
				className="w-full max-w-md rounded-2xl shadow-sm p-8 border"
				style={{
					backgroundColor: "var(--color-bg-light)",
					borderColor: "var(--color-bg-hover)",
				}}
			>
				<h1
					className="text-2xl font-bold text-center mb-1"
					style={{ color: "var(--color-primary)" }}
				>
					Inicio de Sesión
				</h1>

				<p
					className="text-center mb-6 text-sm"
					style={{ color: "var(--color-foreground)" }}
				>
					{role === "provider"
						? "Inicia sesión como prestador para gestionar tus servicios"
						: "Inicia sesión para reservar servicios de belleza a domicilio"}
				</p>

				<Formik
					initialValues={{ email: "", password: "" }}
					validationSchema={loginSchema}
					onSubmit={handleSubmit}
				>
					<Form className="space-y-4">
						{/* Correo */}
						<div className="relative">
							<FontAwesomeIcon
								icon={faEnvelope}
								className="fa-icon absolute left-3 top-3 text-gray-400"
							/>
							<Field
								type="email"
								name="email"
								placeholder="Correo electrónico"
								className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:outline-none"
							/>
							<ErrorMessage
								name="email"
								component="p"
								className="text-red-500 text-xs mt-1"
							/>
						</div>

						{/* Contraseña */}
						<div className="relative">
							<FontAwesomeIcon
								icon={faLock}
								className="fa-icon absolute left-3 top-3 text-gray-400"
							/>
							<Field
								type="password"
								name="password"
								placeholder="Contraseña"
								className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:outline-none"
							/>
							<ErrorMessage
								name="password"
								component="p"
								className="text-red-500 text-xs mt-1"
							/>
						</div>

						<a
							href="/forgot-password"
							className="block text-right text-sm font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded"
							style={{ color: "var(--color-primary)" }}
						>
							¿Olvidaste tu contraseña?
						</a>

						{/* Botón principal */}
						<button
							type="submit"
							className="w-full font-semibold py-2 rounded-lg transition-colors"
							style={{
								backgroundColor: "var(--color-primary)",
								color: "var(--color-bg-light)",
							}}
						>
							Iniciar Sesión
						</button>

						{/* Divider */}
						<div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-2">
							<span className="w-1/4 border-b border-gray-300"></span>
							<span>O intenta</span>
							<span className="w-1/4 border-b border-gray-300"></span>
						</div>

						{/* Google */}
						<button
							type="button"
							onClick={handleGoogle}
							className="w-full flex items-center justify-center gap-2 font-medium py-2 rounded-lg border transition-colors"
							style={{
								borderColor: "var(--color-primary)",
								backgroundColor: "var(--color-bg-light)",
								color: "var(--color-primary)",
							}}
						>
							<FontAwesomeIcon icon={faGoogle} />
							Iniciar Sesión con Google
						</button>
					</Form>
				</Formik>
			</div>
		</div>
	);
}
