"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPhone,
	faGlobe,
	faCity,
	faHome,
	faUser,
	faLock,
	faEye,
	faEyeSlash,
	faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import ReactCountryFlag from "react-country-flag";
import axios from "axios";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "@/app/store/auth.store";

const completeSchema = Yup.object().shape({
	userName: Yup.string()
		.min(3, "Mínimo 3 caracteres")
		.max(20, "Máximo 20 caracteres")
		.required("El nombre de usuario es obligatorio."),
	createPassword: Yup.boolean(),
	password: Yup.string().when("createPassword", {
		is: true,
		then: (schema) =>
			schema
				.min(8, "Debe tener al menos 8 caracteres.")
				.matches(/[A-Z]/, "Debe incluir una mayúscula.")
				.matches(/[a-z]/, "Debe incluir una minúscula.")
				.matches(/\d/, "Debe incluir un número.")
				.matches(/[@$!%*?&]/, "Debe incluir un símbolo especial.")
				.required("La contraseña es obligatoria."),
	}),
	confirmPassword: Yup.string().when("createPassword", {
		is: true,
		then: (schema) =>
			schema
				.oneOf([Yup.ref("password")], "Las contraseñas no coinciden.")
				.required("Confirma tu contraseña."),
	}),
	country: Yup.string().required("Selecciona un país."),
	region: Yup.string().required("Selecciona una región."),
	city: Yup.string().required("Selecciona una ciudad."),
	address: Yup.string()
		.min(3, "La dirección es demasiado corta.")
		.required("La dirección es obligatoria."),
	phone: Yup.string()
		.matches(/^[0-9]{8,10}$/, "Solo números (8–10 dígitos).")
		.required("El teléfono es obligatorio."),
});

export default function CompleteRegisterProvider() {
	const router = useRouter();
	const [countries, setCountries] = useState<any[]>([]);
	const [regions, setRegions] = useState<any[]>([]);
	const [cities, setCities] = useState<any[]>([]);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	// ✅ Obtenemos token y provider desde Zustand
	const { token, provider } = useAuthStore();

	// Países
	useEffect(() => {
		const fetchCountries = async () => {
			try {
				const res = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/locations/countries`
				);
				setCountries(res.data);
			} catch (error) {
				console.error("Error cargando países:", error);
			}
		};
		fetchCountries();
	}, []);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.4 }}
			className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 py-6"
			style={{ backgroundColor: "var(--background)" }}
		>
			<ToastContainer position="top-center" />
			<div
				className="w-full max-w-md rounded-2xl shadow-sm p-6 sm:p-8 md:p-10 border"
				style={{
					backgroundColor: "var(--color-bg-light)",
					borderColor: "var(--color-bg-hover)",
				}}
			>
				<h1
					className="text-2xl font-bold text-center mb-1"
					style={{ color: "var(--color-primary)" }}
				>
					Completa tu perfil
				</h1>
				<p
					className="text-center mb-6 text-sm"
					style={{ color: "var(--color-foreground)" }}
				>
					Falta poco para terminar tu registro
				</p>

				<Formik
					initialValues={{
						userName: "",
						createPassword: false,
						password: "",
						confirmPassword: "",
						country: "",
						region: "",
						city: "",
						address: "",
						phone: "",
					}}
					validationSchema={completeSchema}
					onSubmit={async (values, { setSubmitting }) => {
						try {
							if (!provider?.id || !token)
								throw new Error(
									"Faltan datos de autenticación."
								);

							const selectedCountry = countries.find(
								(c) => c.id === values.country
							);
							const lada =
								selectedCountry?.lada?.replace("+", "") || "52";

							const payload: any = {
								userName: values.userName,
								phone: `${lada}${values.phone}`,
								countryId: values.country,
								regionId: values.region,
								cityId: values.city,
								address: values.address,
							};

							if (values.createPassword && values.password)
								payload.password = values.password;

							await axios.patch(
								`${process.env.NEXT_PUBLIC_API_URL}/providers/complete/${provider.id}`,
								payload,
								{
									headers: {
										Authorization: `Bearer ${token}`,
									},
								}
							);

							toast.success(
								"¡Perfil completado correctamente! Serás redirigido...",
								{ autoClose: 2000 }
							);

							setTimeout(
								() => router.push("/loginProvider"),
								2000
							);
						} catch (error: any) {
							console.error(
								"❌ Error completando perfil:",
								error
							);
							if (error.response?.status === 409) {
								Swal.fire({
									icon: "error",
									title: "Nombre de usuario ya registrado",
									text: "Elige otro nombre de usuario.",
								});
							} else {
								Swal.fire({
									icon: "error",
									title: "Error al guardar",
									text: "Ocurrió un problema, intenta más tarde.",
								});
							}
						} finally {
							setSubmitting(false);
						}
					}}
				>
					{({ values, setFieldValue, isSubmitting, isValid }) => (
						<Form className="space-y-4">
							{/* Username */}
							<div className="relative">
								<FontAwesomeIcon
									icon={faUser}
									className="absolute left-3 top-3 text-gray-400"
								/>
								<Field
									type="text"
									name="userName"
									placeholder="Nombre de usuario"
									className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2"
								/>
								<ErrorMessage
									name="userName"
									component="p"
									className="text-red-500 text-xs mt-1"
								/>
							</div>

							{/* Contraseña */}
							<div className="flex items-center gap-2">
								<Field
									type="checkbox"
									name="createPassword"
									className="w-4 h-4 accent-color-primary"
								/>
								<label className="text-sm text-gray-700 select-none">
									¿Deseas crear una contraseña?
								</label>
							</div>

							{values.createPassword && (
								<div className="space-y-3">
									<div className="relative">
										<FontAwesomeIcon
											icon={faLock}
											className="absolute left-3 top-3 text-gray-400"
										/>
										<Field
											type={
												showPassword
													? "text"
													: "password"
											}
											name="password"
											placeholder="Contraseña"
											className="w-full pl-9 pr-10 py-2 border rounded-lg text-sm focus:ring-2"
										/>
										<button
											type="button"
											onClick={() =>
												setShowPassword(!showPassword)
											}
											className="absolute right-3 top-3 text-gray-400"
										>
											<FontAwesomeIcon
												icon={
													showPassword
														? faEyeSlash
														: faEye
												}
											/>
										</button>
										<ErrorMessage
											name="password"
											component="p"
											className="text-red-500 text-xs mt-1"
										/>
									</div>

									<div className="relative">
										<FontAwesomeIcon
											icon={faLock}
											className="absolute left-3 top-3 text-gray-400"
										/>
										<Field
											type={
												showConfirmPassword
													? "text"
													: "password"
											}
											name="confirmPassword"
											placeholder="Confirmar contraseña"
											className="w-full pl-9 pr-10 py-2 border rounded-lg text-sm focus:ring-2"
										/>
										<button
											type="button"
											onClick={() =>
												setShowConfirmPassword(
													!showConfirmPassword
												)
											}
											className="absolute right-3 top-3 text-gray-400"
										>
											<FontAwesomeIcon
												icon={
													showConfirmPassword
														? faEyeSlash
														: faEye
												}
											/>
										</button>
										<ErrorMessage
											name="confirmPassword"
											component="p"
											className="text-red-500 text-xs mt-1"
										/>
									</div>
								</div>
							)}

							{/* País / Región / Ciudad / Dirección / Teléfono */}
							{/* (igual que el tuyo original, no lo cambio por diseño) */}

							{/* Botón */}
							<button
								type="submit"
								disabled={!isValid || isSubmitting}
								style={{
									backgroundColor: "var(--color-primary)",
								}}
								className={`w-full font-semibold text-white py-2 rounded-lg text-sm sm:text-base flex justify-center items-center ${
									!isValid || isSubmitting
										? "cursor-not-allowed"
										: ""
								}`}
							>
								{isSubmitting ? (
									<FontAwesomeIcon icon={faSpinner} spin />
								) : (
									"Guardar perfil"
								)}
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</motion.div>
	);
}
