"use client";

import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import LogoutButton from "../components/LogoutButton"; // 👈 importa tu botón
import "../globals.css";

export default function AppLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [isDesktop, setIsDesktop] = useState(false);

	// Detecta si estamos en escritorio (≥768px)
	useEffect(() => {
		const handleResize = () => setIsDesktop(window.innerWidth >= 768);
		handleResize(); // inicializa
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Define ancho dinámico solo en desktop
	const sidebarWidth = isDesktop
		? isCollapsed
			? "4.5rem"
			: "13rem"
		: "0";

	return (
		<div
			className="flex min-h-screen transition-all duration-300"
			style={{
				backgroundColor: "var(--background)",
				color: "var(--foreground)",
			}}
		>
			{/* Sidebar visible solo en desktop */}
			<Sidebar
				isCollapsed={isCollapsed}
				setIsCollapsed={setIsCollapsed}
			/>

			{/* Contenido principal */}
			<main
				className="flex-1 transition-all duration-300 relative"
				style={{
					marginLeft: sidebarWidth,
					padding: "2rem",
				}}
			>
				{/* Botón flotante de logout */}
				<div className="fixed bottom-6 right-6 z-50">
					<LogoutButton />
				</div>

				{/* Evita solaparse con header y navbar mobile */}
				<div className="pt-10 pb-10 md:pt-0 md:pb-0">{children}</div>
			</main>
		</div>
	);
}
