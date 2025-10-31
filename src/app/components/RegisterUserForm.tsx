"use client";

import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEnvelope,
	faLock,
	faUser,
	faEye,
	faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Api } from "@/app/services/api";

// ✅ Esquema de validación Yup
const registerSchema = Yup.object().shape({
	names: Yup.string()
		.matches(
			/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/,
			"Solo letras y espacios (2–50 caracteres)."
		)
		.required("El nombre es obligatorio."),
	surnames: Yup.string()
		.matches(
			/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/,
			"Solo letras y espacios (2–50 caracteres)."
		)
		.required("El apellido es obligatorio."),
	email: Yup.string()
		.email("Correo electrónico no válido.")
		.required("El correo electrónico es obligatorio."),
	password: Yup.string()
		.min(8, "Debe tener al menos 8 caracteres.")
		.matches(/[A-Z]/, "Debe incluir una mayúscula.")
		.matches(/[a-z]/, "Debe incluir una minúscula.")
		.matches(/\d/, "Debe incluir un número.")
		.matches(/[@$!%*?&]/, "Debe incluir un símbolo especial.")
		.required("La contraseña es obligatoria."),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password")], "Las contraseñas no coinciden.")
		.required("Confirma tu contraseña."),
});

export default function RegisterUserForm() {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const handleSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
		try {
			// 🧹 Eliminar confirmPassword antes de enviar al backend
			const { confirmPassword, ...cleanValues } = values;

			// ✅ Forzar que el rol siempre sea "user"
			const payload = { ...cleanValues, role: "user" };

			await Api.post("/auth/register/user", payload);

			toast.success("Usuario registrado correctamente.", { autoClose: 2000 });
			resetForm();

			setTimeout(() => router.push("/loginUser"), 2000);
		} catch (error: any) {
			const msg =
				error?.response?.data?.message ||
				"Error al registrar usuario. Intenta nuevamente.";
			toast.error(msg, { autoClose: 2500 });
		} finally {
			setSubmitting(false);
		}
	};

	const handleGoogle = () => {
		const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
		window.location.href = `${base}/auth/google/user`;
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
					Crea tu cuenta
				</h1>
				<p
					className="text-center mb-6 text-sm"
					style={{ color: "var(--color-foreground)" }}
				>
					Regístrate para disfrutar de nuestros servicios de belleza
				</p>

				<Formik
					initialValues={{
						names: "",
						surnames: "",
						email: "",
						password: "",
						confirmPassword: "",
					}}
					validationSchema={registerSchema}
					onSubmit={handleSubmit}
				>
					<Form className="space-y-4">
						{/* Nombres */}
						<div className="relative">
							<FontAwesomeIcon
								icon={faUser}
								className="absolute left-3 top-3 text-gray-400"
							/>
							<Field
								type="text"
								name="names"
								placeholder="Nombre(s)"
								className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:outline-none"
							/>
							<ErrorMessage
								name="names"
								component="p"
								className="text-red-500 text-xs mt-1"
							/>
						</div>

						{/* Apellidos */}
						<div className="relative">
							<FontAwesomeIcon
								icon={faUser}
								className="absolute left-3 top-3 text-gray-400"
							/>
							<Field
								type="text"
								name="surnames"
								placeholder="Apellidos"
								className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:outline-none"
							/>
							<ErrorMessage
								name="surnames"
								component="p"
								className="text-red-500 text-xs mt-1"
							/>
						</div>

						{/* Correo */}
						<div className="relative">
							<FontAwesomeIcon
								icon={faEnvelope}
								className="absolute left-3 top-3 text-gray-400"
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
								className="absolute left-3 top-3 text-gray-400"
							/>
							<Field
								type={showPassword ? "text" : "password"}
								name="password"
								placeholder="Contraseña"
								className="w-full pl-9 pr-10 py-2 border rounded-lg text-sm focus:ring-2 focus:outline-none"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-3 text-gray-400"
							>
								<FontAwesomeIcon
									icon={showPassword ? faEyeSlash : faEye}
								/>
							</button>
							<ErrorMessage
								name="password"
								component="p"
								className="text-red-500 text-xs mt-1"
							/>
						</div>

						{/* Confirmar contraseña */}
						<div className="relative">
							<FontAwesomeIcon
								icon={faLock}
								className="absolute left-3 top-3 text-gray-400"
							/>
							<Field
								type={showConfirmPassword ? "text" : "password"}
								name="confirmPassword"
								placeholder="Confirmar contraseña"
								className="w-full pl-9 pr-10 py-2 border rounded-lg text-sm focus:ring-2 focus:outline-none"
							/>
							<button
								type="button"
								onClick={() =>
									setShowConfirmPassword(!showConfirmPassword)
								}
								className="absolute right-3 top-3 text-gray-400"
							>
								<FontAwesomeIcon
									icon={
										showConfirmPassword ? faEyeSlash : faEye
									}
								/>
							</button>
							<ErrorMessage
								name="confirmPassword"
								component="p"
								className="text-red-500 text-xs mt-1"
							/>
						</div>

						{/* Botón principal */}
						<button
							type="submit"
							className="w-full font-semibold py-2 rounded-lg transition-colors"
							style={{
								backgroundColor: "var(--color-primary)",
								color: "var(--color-bg-light)",
							}}
						>
							Registrarme
						</button>

						{/* Divider */}
						<div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-2">
							<span className="w-1/4 border-b border-gray-300"></span>
							<span>O continúa con</span>
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
							Registrarme con Google
						</button>
					</Form>
				</Formik>
			</div>
		</div>
	);
}
