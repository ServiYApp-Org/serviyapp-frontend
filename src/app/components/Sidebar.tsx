"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHome,
	faSearch,
	faCalendar,
	faCommentDots,
	faUser,
	faBars,
	faBell,
	faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from "@/app/store/auth.store";

export default function Sidebar({
	isCollapsed,
	setIsCollapsed,
}: {
	isCollapsed: boolean;
	setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const pathname = usePathname();
	const router = useRouter();
	const { role, user, clearAuth } = useAuthStore();

	const roleLabel =
		role === "admin"
			? "Administrador"
			: role === "provider"
			? "Proveedor"
			: "Usuario";

	const getBasePath = () => {
		if (role === "admin") return "/admin";
		if (role === "provider") return "/provider";
		return "/user";
	};

	const basePath = getBasePath();

	const menuItems = [
		{ icon: faHome, label: "Dashboard", href: `${basePath}/dashboard` },
		{ icon: faCalendar, label: "Citas", href: `${basePath}/appointments` },
		{ icon: faSearch, label: "Servicios", href: `${basePath}/services` },
		{
			icon: faCommentDots,
			label: "Mensajes",
			href: `${basePath}/messages`,
		},
		{ icon: faUser, label: "Perfil", href: `${basePath}/profile` },
	];

	const handleLogout = () => {
		clearAuth();
		router.push("/");
	};

	const userHasPhoto = user?.profilePicture && user.profilePicture !== "";

	return (
		<aside
			className="fixed top-0 left-0 h-full flex-col justify-between transition-all duration-400 shadow-lg hidden md:flex"
			style={{
				backgroundColor: "var(--color-primary)",
				width: isCollapsed ? "4.5rem" : "13rem",
			}}
		>
			{/* ==== SECCIÓN SUPERIOR ==== */}
			<div>
				{/* Logo */}
				<div
					className="flex items-center gap-4 px-6 py-5 border-b"
					style={{ borderColor: "var(--color-primary-hover)" }}
				>
					<div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 bg-white text--primary">
						S
					</div>
					<span
						className={`text-lg text-white font-semibold tracking-wide whitespace-nowrap overflow-hidden transition-all duration-400 ${
							isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
						}`}
					>
						serviYApp
					</span>
				</div>

				{/* ==== USUARIO (FIJO, NO SE REDUCE) ==== */}
				<div
					className="flex items-center gap-3 px-4 border-b h-[78px]"
					style={{ borderColor: "var(--color-primary-hover)" }}
				>
					{/* Imagen o ícono por defecto (siempre visible) */}
					<div className="relative group">
						{userHasPhoto ? (
							<img
								src={user.profilePicture}
								alt={`${user.names || "Usuario"} ${
									user.surnames || ""
								}`}
								className="w-10 h-10 rounded-full object-cover border border-white/20 transition-transform duration-300 group-hover:scale-105"
							/>
						) : (
							<div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
								<FontAwesomeIcon
									icon={faUser}
									className="text-gray-300"
									style={{
										width: "1.2rem",
										height: "1.2rem",
									}}
								/>
							</div>
						)}
					</div>

					{/* Datos del usuario (solo visibles si expandido) */}
					<div
						className={`flex flex-col transition-all duration-300 ${
							isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
						}`}
					>
						<p className="text-sm font-semibold text-white leading-tight">
							{user?.names || ""}
						</p>
						<p className="text-xs italic text-gray-300 leading-tight truncate">
							{user?.email || "correo@ejemplo.com"}
						</p>
						<p className="text-[11px] text-gray-400 italic mt-0.5">
							{roleLabel}
						</p>
					</div>
				</div>
			</div>

			{/* ==== MENÚ PRINCIPAL ==== */}
			<nav className="mt-6 flex flex-col items-start relative flex-1">
				{menuItems.map((item) => {
					const active = pathname === item.href;
					return (
						<div key={item.label} className="relative group w-full">
							{active && (
								<div className="absolute left-0 top-0 h-full w-[3px] rounded-l bg-white" />
							)}
							<Link
								href={item.href}
								className={`flex items-center px-6 py-2.5 w-full text-sm font-medium rounded-md transition-all duration-300 ${
									active
										? "text-white"
										: "text-gray-300 hover:text-white"
								}`}
								style={{
									backgroundColor: active
										? "var(--color-selected)"
										: "transparent",
								}}
								onMouseEnter={(e) => {
									if (!active)
										e.currentTarget.style.backgroundColor =
											"var(--color-primary-hover)";
								}}
								onMouseLeave={(e) => {
									if (!active)
										e.currentTarget.style.backgroundColor =
											"transparent";
								}}
							>
								<div className="w-6 flex justify-center">
									<FontAwesomeIcon
										icon={item.icon}
										className="text-base"
										style={{
											width: "1.25rem",
											height: "1.25rem",
										}}
									/>
								</div>
								<span
									className={`ml-3 whitespace-nowrap overflow-hidden transition-all duration-300 ${
										isCollapsed
											? "opacity-0 w-0"
											: "opacity-100 w-auto"
									}`}
								>
									{item.label}
								</span>
							</Link>

							{/* Tooltip */}
							{isCollapsed && (
								<span
									className="absolute left-18 top-1/2 -translate-y-1/2 px-3 py-1 text-xs rounded-md text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
									style={{
										backgroundColor:
											"var(--color-primary-hover)",
										whiteSpace: "nowrap",
									}}
								>
									{item.label}
								</span>
							)}
						</div>
					);
				})}
			</nav>

			{/* ==== SECCIÓN INFERIOR ==== */}
			<div>
				{/* Notificaciones */}
				<div className="relative group">
					<button
						className="flex items-center justify-start gap-3 px-6 py-3 w-full transition-all duration-300 relative"
						style={{
							borderTop: "1px solid var(--color-primary-hover)",
						}}
						onMouseEnter={(e) =>
							(e.currentTarget.style.backgroundColor =
								"var(--color-primary-hover)")
						}
						onMouseLeave={(e) =>
							(e.currentTarget.style.backgroundColor =
								"transparent")
						}
						aria-label="Notificaciones"
					>
						<div className="relative w-6 flex justify-center">
							<FontAwesomeIcon
								icon={faBell}
								className="text-gray-300"
								style={{ width: "1.25rem", height: "1.25rem" }}
							/>
							<span className="absolute -top-1 -right-1 bg-red-500 text-white text-[0.6rem] font-semibold rounded-full h-4 w-4 flex items-center justify-center">
								3
							</span>
						</div>
					</button>
				</div>

				{/* Cerrar sesión */}
				<div
					className="relative group border-t"
					style={{ borderColor: "var(--color-primary-hover)" }}
				>
					<button
						onClick={handleLogout}
						className="flex items-center w-full gap-2 px-6 py-3 text-sm font-medium text-gray-300 hover:text-white transition-all duration-300"
						onMouseEnter={(e) =>
							(e.currentTarget.style.backgroundColor = "#b91c1c")
						}
						onMouseLeave={(e) =>
							(e.currentTarget.style.backgroundColor =
								"transparent")
						}
					>
						<div className="w-6 flex justify-center">
							<FontAwesomeIcon
								icon={faPowerOff}
								className="text-base"
								style={{ width: "1.25rem", height: "1.25rem" }}
							/>
						</div>
						<span
							className={`ml-3 whitespace-nowrap overflow-hidden transition-all duration-300 ${
								isCollapsed
									? "opacity-0 w-0"
									: "opacity-100 w-auto"
							}`}
						>
							Cerrar sesión
						</span>
					</button>

					{/* Tooltip */}
					{isCollapsed && (
						<span
							className="absolute left-18 top-1/2 -translate-y-1/2 px-3 py-1 text-xs rounded-md text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
							style={{
								backgroundColor: "#b91c1c",
								whiteSpace: "nowrap",
							}}
						>
							Cerrar sesión
						</span>
					)}
				</div>

				{/* Botón colapsar */}
				<div className="relative group">
					<div
						className="flex items-center justify-between px-6 py-3 transition-all duration-300"
						style={{
							borderTop: "1px solid var(--color-primary-hover)",
						}}
						onMouseEnter={(e) =>
							(e.currentTarget.style.backgroundColor =
								"var(--color-primary-hover)")
						}
						onMouseLeave={(e) =>
							(e.currentTarget.style.backgroundColor =
								"transparent")
						}
					>
						<button
							onClick={() => setIsCollapsed(!isCollapsed)}
							className="text-gray-300 hover:text-white transition-colors"
							aria-label="Colapsar menú"
						>
							<FontAwesomeIcon
								icon={faBars}
								className="text-lg"
								style={{ width: "1.25rem", height: "1.25rem" }}
							/>
						</button>
					</div>
				</div>
			</div>
		</aside>
	);
}
