"use client";

import { useState } from "react";
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
import { Field, Form, Formik, ErrorMessage } from "formik";
import ReactCountryFlag from "react-country-flag";

// ---------------------------
// 🔹 VALIDACIONES
// ---------------------------
const stepOneSchema = Yup.object().shape({
	names: Yup.string()
		.matches(
			/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/,
			"Solo letras y espacios (2–50 caracteres)."
		)
		.required("El nombre es obligatorio."),
	lastName: Yup.string()
		.matches(
			/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/,
			"Solo letras y espacios (2–50 caracteres)."
		)
		.required("El apellido es obligatorio."),
	email: Yup.string()
		.email("Correo electrónico no válido.")
		.max(254, "Máximo 254 caracteres.")
		.required("El correo es obligatorio."),
});

const stepTwoSchema = Yup.object().shape({
	userName: Yup.string()
		.matches(
			/^[a-zA-Z0-9.]+$/,
			"Solo se permiten letras, números y puntos."
		)
		.min(3, "Debe tener al menos 3 caracteres.")
		.max(20, "No puede superar los 20 caracteres.")
		.required("El nombre de usuario es obligatorio."),
	country: Yup.string().required("Selecciona un país."),
	city: Yup.string().required("Selecciona una ciudad."),
	countryCode: Yup.string().required("Selecciona una lada."),
	phone: Yup.string()
		.matches(/^[0-9]{8,10}$/, "Solo números (8–10 dígitos).")
		.required("El teléfono es obligatorio."),
	password: Yup.string()
		.min(8, "Debe tener al menos 8 caracteres.")
		.max(30, "No puede superar los 30 caracteres.")
		.matches(/[a-z]/, "Debe incluir una letra minúscula.")
		.matches(/[A-Z]/, "Debe incluir una letra mayúscula.")
		.matches(/\d/, "Debe incluir un número.")
		.matches(
			/[@$!%?&]/,
			"Debe incluir un carácter especial (@, $, !, %, ?, &)."
		)
		.required("La contraseña es obligatoria."),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password")], "Las contraseñas no coinciden.")
		.required("Confirma tu contraseña."),
});

export default function RegisterProviderForm() {
	const [step, setStep] = useState(1);

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
			className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 py-6"
			style={{ backgroundColor: "var(--background)" }}
		>
			<div
				className="w-full max-w-md rounded-2xl shadow-sm p-6 sm:p-8 md:p-10 border"
				style={{
					backgroundColor: "var(--color-bg-light)",
					borderColor: "var(--color-bg-hover)",
				}}
			>
				<h1
					className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-1"
					style={{ color: "var(--color-primary)" }}
				>
					{step === 1 ? "Crea tu cuenta" : "Completa tu perfil"}
				</h1>
				<p
					className="text-center mb-6 text-xs sm:text-sm"
					style={{ color: "var(--color-foreground)" }}
				>
					{step === 1
						? "Comienza a reservar servicios de belleza a domicilio"
						: "Solo un paso más para finalizar tu registro"}
				</p>

				<Formik
					initialValues={{
						names: "",
						lastName: "",
						userName: "",
						email: "",
						countryCode: "+52",
						phone: "",
						password: "",
						confirmPassword: "",
						country: "",
						city: "",
					}}
					validationSchema={
						step === 1 ? stepOneSchema : stepTwoSchema
					}
					validateOnChange={false}
					validateOnBlur={true}
					onSubmit={async (values, { setTouched, validateForm }) => {
						if (step === 1) {
							setStep(2);
							setTouched({});
							return;
						}

						const errors = await validateForm();
						if (Object.keys(errors).length > 0) {
							setTouched(
								Object.keys(errors).reduce((acc, key) => {
									acc[key as keyof typeof values] = true;
									return acc;
								}, {} as Record<string, boolean>)
							);
							return;
						}

						console.log("Datos finales:", values);
					}}
				>
					{({ values, setFieldValue, errors, touched }) => {
						const selectedCountry = countries.find(
							(c) => c.name === values.country
						);
						const cities = selectedCountry?.cities ?? [];

						return (
							<Form className="space-y-4">
								{/* PASO 1 */}
								{step === 1 && (
									<>
										{/* Nombres y Apellido */}
										<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
											<div className="relative">
												<FontAwesomeIcon
													icon={faUser}
													className="fa-icon absolute left-3 top-3 text-gray-400"
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
													className="fa-icon absolute left-3 top-3 text-gray-400"
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

										{/* Botón siguiente */}
										<button
											type="submit"
											className="w-full font-semibold py-2 rounded-lg text-sm sm:text-base"
											style={{
												backgroundColor:
													"var(--color-primary)",
												color: "var(--color-bg-light)",
											}}
										>
											Siguiente
										</button>

										{/* Divider */}
										<div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500 mt-2">
											<span className="w-1/4 border-b border-gray-300"></span>
											<span>O intenta</span>
											<span className="w-1/4 border-b border-gray-300"></span>
										</div>

										{/* Google */}
										<button
											type="button"
											className="w-full flex items-center justify-center gap-2 font-medium py-2 rounded-lg border text-sm sm:text-base"
											style={{
												borderColor:
													"var(--color-primary)",
												backgroundColor:
													"var(--color-bg-light)",
												color: "var(--color-primary)",
											}}
										>
											<FontAwesomeIcon
												icon={faGoogle}
												className="fa-icon"
											/>
											Registrarse con Google
										</button>
									</>
								)}

								{/* PASO 2 */}
								{step === 2 && (
									<>
										{/* Nombre de usuario */}
										<div className="relative">
											<FontAwesomeIcon
												icon={faUser}
												className="fa-icon absolute left-3 top-3 text-gray-400"
											/>
											<Field
												type="text"
												name="userName"
												placeholder="Nombre de usuario"
												className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:outline-none"
											/>
											{touched.userName &&
												errors.userName && (
													<p className="text-red-500 text-xs mt-1">
														{errors.userName}
													</p>
												)}
										</div>

										{/* País y ciudad */}
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
											{/* País */}
											<div className="relative w-full sm:w-[175px]">
												<FontAwesomeIcon
													icon={faGlobe}
													className="fa-icon absolute left-3 top-3 text-gray-400"
												/>
												<Field
													as="select"
													name="country"
													className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:outline-none"
													onChange={(
														e: React.ChangeEvent<HTMLSelectElement>
													) => {
														const country =
															countries.find(
																(c) =>
																	c.name ===
																	e.target
																		.value
															);
														setFieldValue(
															"country",
															e.target.value
														);
														setFieldValue(
															"city",
															""
														);
														if (country) {
															setFieldValue(
																"countryCode",
																country.code
															);
														}
													}}
												>
													<option value="">
														País
													</option>
													{countries.map((c) => (
														<option
															key={c.name}
															value={c.name}
														>
															{c.name}
														</option>
													))}
												</Field>
												{touched.country &&
													errors.country && (
														<p className="text-red-500 text-xs mt-1">
															{errors.country}
														</p>
													)}
											</div>

											{/* Ciudad */}
											<div className="relative w-full sm:w-[175px] ">
												<FontAwesomeIcon
													icon={faCity}
													className="fa-icon absolute left-3 top-3 text-gray-400"
												/>
												<Field
													as="select"
													name="city"
													disabled={!values.country}
													className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:outline-none disabled:opacity-60"
												>
													<option value="">
														{values.country
															? "Ciudad"
															: "Selecciona país"}
													</option>
													{cities.map((city) => (
														<option
															key={city}
															value={city}
														>
															{city}
														</option>
													))}
												</Field>
												{touched.city &&
													errors.city && (
														<p className="text-red-500 text-xs mt-1">
															{errors.city}
														</p>
													)}
											</div>
										</div>

										{/* Teléfono con bandera y lada */}
										<div className="relative flex items-center">
											<FontAwesomeIcon
												icon={faPhone}
												className="fa-icon absolute left-3 top-3 text-gray-400"
											/>

											{/* Bloque bandera + lada */}
											<div
												className="absolute left-9 top-2 flex items-center gap-1"
												style={{ width: "95px" }} // ancho fijo para que no se mueva el input
											>
												{/* Si hay país → bandera + lada */}
												{values.country ? (
													<>
														<ReactCountryFlag
															countryCode={
																countries.find(
																	(c) =>
																		c.name ===
																		values.country
																)?.iso || "MX"
															}
															svg
															style={{
																width: "1.3em",
																height: "1.3em",
																marginRight:
																	"4px",
															}}
														/>
														<span className="text-sm text-gray-700 font-medium">
															{
																countries.find(
																	(c) =>
																		c.name ===
																		values.country
																)?.code
															}
														</span>
													</>
												) : (
													<>
														<div
															className="rounded-sm mr-1"
															style={{
																width: "1.3em",
																height: "1.3em",
																backgroundColor:
																	"#e5e7eb",
															}}
														></div>
														<span className="text-sm text-gray-400 select-none">
															LADA
														</span>
													</>
												)}
											</div>

											{/* Input teléfono */}
											<Field
												type="tel"
												name="phone"
												placeholder="Teléfono"
												className="w-full pl-[125px] pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:outline-none transition-all duration-200"
											/>
										</div>

										{/* Error */}
										{touched.phone && errors.phone && (
											<p className="text-red-500 text-xs mt-1">
												{errors.phone}
											</p>
										)}

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
											{touched.password &&
												errors.password && (
													<p className="text-red-500 text-xs mt-1">
														{errors.password}
													</p>
												)}
										</div>

										{/* Confirmar contraseña */}
										<div className="relative">
											<FontAwesomeIcon
												icon={faLock}
												className="fa-icon absolute left-3 top-3 text-gray-400"
											/>
											<Field
												type="password"
												name="confirmPassword"
												placeholder="Confirmar contraseña"
												className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:outline-none"
											/>
											{touched.confirmPassword &&
												errors.confirmPassword && (
													<p className="text-red-500 text-xs mt-1">
														{errors.confirmPassword}
													</p>
												)}
										</div>

										{/* Botones */}
										<div className="flex gap-2">
											<button
												type="button"
												onClick={() => setStep(1)}
												className="w-1/2 py-2 rounded-lg border text-sm"
											>
												Atrás
											</button>
											<button
												type="submit"
												className="w-1/2 font-semibold py-2 rounded-lg text-sm"
												style={{
													backgroundColor:
														"var(--color-primary)",
													color: "var(--color-bg-light)",
												}}
											>
												Finalizar registro
											</button>
										</div>
									</>
								)}
							</Form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
}
