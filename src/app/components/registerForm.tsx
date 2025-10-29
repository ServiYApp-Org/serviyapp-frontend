"use client";

import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUser,
	faEnvelope,
	faPhone,
	faLock,
	faGlobe,
	faCity,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import ReactCountryFlag from "react-country-flag";
import { ErrorMessage, Field, Form, Formik } from "formik";

// Esquema de validación con Yup
const registerSchema = Yup.object().shape({
	names: Yup.string()
		.matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/, "Solo letras y espacios (2–50 caracteres).")
		.required("El nombre es obligatorio."),

	lastName: Yup.string()
		.matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/, "Solo letras y espacios (2–50 caracteres).")
		.required("El apellido es obligatorio."),

	userName: Yup.string()
		.matches(/^[a-zA-Z0-9.]+$/, "Solo se permiten letras, números y puntos.")
		.min(3, "Debe tener al menos 3 caracteres.")
		.max(20, "No puede superar los 20 caracteres.")
		.test("no-start-dot", "No puede comenzar con punto.", (val) => !val?.startsWith("."))
		.test("no-end-dot", "No puede terminar con punto.", (val) => !val?.endsWith("."))
		.test("no-double-dot", "No puede tener dos puntos seguidos.", (val) => !val?.includes(".."))
		.required("El nombre de usuario es obligatorio."),

	email: Yup.string()
		.email("Correo electrónico no válido.")
		.max(254, "Máximo 254 caracteres.")
		.required("El correo electrónico es obligatorio."),

	phone: Yup.string()
		.matches(/^[0-9]{8,10}$/, "Solo números (8–10 dígitos).")
		.required("El teléfono es obligatorio."),

	country: Yup.string().required("Selecciona un país."),
	city: Yup.string().required("Selecciona una ciudad."),

	password: Yup.string()
		.min(8, "Debe tener al menos 8 caracteres.")
		.max(30, "No puede superar los 30 caracteres.")
		.matches(/[a-z]/, "Debe incluir una letra minúscula.")
		.matches(/[A-Z]/, "Debe incluir una letra mayúscula.")
		.matches(/\d/, "Debe incluir un número.")
		.matches(/[@$!%?&]/, "Debe incluir un carácter especial (@, $, !, %, ?, &).")
		.required("La contraseña es obligatoria."),

	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password")], "Las contraseñas no coinciden.")
		.required("Confirma tu contraseña."),
});

export default function RegisterForm() {

	//HARDCODEADO
	const countries = [
		{
			name: "México",
			code: "+52",
			iso: "MX",
			cities: ["Ciudad de México", "Guadalajara", "Monterrey", "Oaxaca"],
		},
		{
			name: "Argentina",
			code: "+54",
			iso: "AR",
			cities: ["Buenos Aires", "Córdoba", "Rosario", "Mendoza"],
		},
		{
			name: "Colombia",
			code: "+57",
			iso: "CO",
			cities: ["Bogotá", "Medellín", "Cali", "Barranquilla"],
		},
	];

	return (
		<div
			className="flex flex-col items-center justify-center min-h-screen px-4"
			style={{ backgroundColor: "var(--background)" }}
		>
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
					Comienza a reservar servicios de belleza a domicilio
				</p>

				<Formik
					initialValues={{
						names: "",
						lastName: "",
						userName: "",
						email: "",
						phone: "",
						password: "",
						confirmPassword: "",
						country: "",
						city: "",
					}}
					validationSchema={registerSchema}
					onSubmit={(values) => {
						console.log("Formulario válido:", values);
					}}
				>
					{({ values, setFieldValue }) => {
						const selectedCountry = countries.find(
							(c) => c.name === values.country
						);
						const cities = selectedCountry?.cities ?? [];

						return (
							<Form className="space-y-4">
								{/* Nombres y Apellido */}
								<div className="grid grid-cols-2 gap-3">
									<div className="relative">
										<FontAwesomeIcon
											icon={faUser}
											className="absolute left-3 top-3 text-gray-400 text-sm"
										/>
										<Field
											type="text"
											name="names"
											placeholder="Nombres"
											className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:outline-none"
										/>
										<ErrorMessage
											name="names"
											component="p"
											className="text-red-500 text-xs mt-1"
										/>
									</div>

									<div className="relative">
										<FontAwesomeIcon
											icon={faUser}
											className="absolute left-3 top-3 text-gray-400 text-sm"
										/>
										<Field
											type="text"
											name="lastName"
											placeholder="Apellido"
											className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:outline-none"
										/>
										<ErrorMessage
											name="lastName"
											component="p"
											className="text-red-500 text-xs mt-1"
										/>
									</div>
								</div>

								{/* Username */}
								<div className="relative">
									<FontAwesomeIcon
										icon={faUser}
										className="absolute left-3 top-3 text-gray-400 text-sm"
									/>
									<Field
										type="text"
										name="userName"
										placeholder="Nombre de usuario"
										className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:outline-none"
									/>
									<ErrorMessage
										name="userName"
										component="p"
										className="text-red-500 text-xs mt-1"
									/>
								</div>

								{/* Correo */}
								<div className="relative">
									<FontAwesomeIcon
										icon={faEnvelope}
										className="absolute left-3 top-3 text-gray-400 text-sm"
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

								{/* País y Ciudad */}
								<div className="grid grid-cols-2 gap-3">
									<div className="relative">
										<FontAwesomeIcon
											icon={faGlobe}
											className="absolute left-3 top-3 text-gray-400 text-sm"
										/>
										<Field
											as="select"
											name="country"
											className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:outline-none"
											onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
												setFieldValue("country", e.target.value);
												setFieldValue("city", "");
											}}
										>
											<option value="">País</option>
											{countries.map((c) => (
												<option key={c.name} value={c.name}>
													{c.name}
												</option>
											))}
										</Field>
										<ErrorMessage
											name="country"
											component="p"
											className="text-red-500 text-xs mt-1"
										/>
									</div>

									<div className="relative">
										<FontAwesomeIcon
											icon={faCity}
											className="absolute left-3 top-3 text-gray-400 text-sm"
										/>
										<Field
											as="select"
											name="city"
											disabled={!values.country}
											className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:outline-none disabled:opacity-60"
										>
											<option value="">
												{values.country ? "Ciudad" : "Selecciona país"}
											</option>
											{cities.map((city) => (
												<option key={city} value={city}>
													{city}
												</option>
											))}
										</Field>
										<ErrorMessage
											name="city"
											component="p"
											className="text-red-500 text-xs mt-1"
										/>
									</div>
								</div>

								{/* Teléfono */}
								<div className="relative flex items-center">
									<FontAwesomeIcon
										icon={faPhone}
										className="absolute left-3 top-3 text-gray-400 text-sm"
									/>
									{values.country && (
										<span className="absolute left-9 top-2.5 text-gray-600 text-sm flex items-center gap-1 select-none">
											<ReactCountryFlag
												countryCode={
													countries.find((c) => c.name === values.country)?.iso||""
												}
												svg
											/>{""}
											{
												countries.find((c) => c.name === values.country)
													?.code
											}
										</span>
									)}
									<Field
										type="tel"
										name="phone"
										placeholder="Teléfono"
										className="w-full pl-36 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:outline-none"
									/>
								</div>
								<ErrorMessage
									name="phone"
									component="p"
									className="text-red-500 text-xs mt-1"
								/>

								{/* Contraseña */}
								<div className="relative">
									<FontAwesomeIcon
										icon={faLock}
										className="absolute left-3 top-3 text-gray-400 text-sm"
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

								{/* Confirmar contraseña */}
								<div className="relative">
									<FontAwesomeIcon
										icon={faLock}
										className="absolute left-3 top-3 text-gray-400 text-sm"
									/>
									<Field
										type="password"
										name="confirmPassword"
										placeholder="Confirmar contraseña"
										className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:outline-none"
									/>
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
									Crear cuenta
								</button>

								{/* Divider */}
								<div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-2">
									<span className="w-1/4 border-b border-gray-300"></span>
									<span>O regístrate con</span>
									<span className="w-1/4 border-b border-gray-300"></span>
								</div>

								{/* Google */}
								<button
									type="button"
									className="w-full flex items-center justify-center gap-2 font-medium py-2 rounded-lg border transition-colors"
									style={{
										borderColor: "var(--color-primary)",
										backgroundColor: "var(--color-bg-light)",
										color: "var(--color-primary)",
									}}
								>
									<FontAwesomeIcon
										icon={faGoogle}
										style={{ color: "var(--color-primary)" }}
									/>
									Continuar con Google
								</button>
							</Form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
}
