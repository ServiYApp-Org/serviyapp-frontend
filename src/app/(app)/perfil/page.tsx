"use client";

export default function PerfilPage() {
	return (
		<div className="max-w-4xl mx-auto mt-8">
			<h2 className="text-2xl font-bold text-gray-800 mb-6">Mi perfil</h2>

			<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
				{/* Info general */}
				<div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
					
					<div className="flex-1 text-center sm:text-left">
						<h3 className="text-xl font-semibold text-gray-900">
							Ariadna Ramírez
						</h3>
						<p className="text-gray-500">ariadna@example.com</p>
						<p className="text-gray-500">+52 555 123 4567</p>
					</div>
				</div>

				{/* Detalles */}
				<div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
					<div>
						<p className="font-semibold text-gray-800">País</p>
						<p>México</p>
					</div>
					<div>
						<p className="font-semibold text-gray-800">Ciudad</p>
						<p>Oaxaca</p>
					</div>
					<div>
						<p className="font-semibold text-gray-800">
							Cumpleaños
						</p>
						<p>12 de mayo, 1998</p>
					</div>
					<div>
						<p className="font-semibold text-gray-800">Dirección</p>
						<p>Calle Las Rosas #123</p>
						
					</div>
					<p>texto de relleno</p>
					<p>texto de relleno</p>
					<p>texto de relleno</p>
					<p>texto de relleno</p>
					<p>texto de relleno</p>
					<p>texto de relleno</p>
					<p>texto de relleno</p>
					<p>texto de relleno</p>
					<p>texto de relleno</p>
					<p>texto de relleno</p>
					<p>texto de relleno</p>
					<p>texto de relleno</p>
					<p>texto de relleno</p>
					<p>texto de relleno</p>
					<p>texto de relleno</p>
					<p>texto de relleno</p>
					<p>texto de relleno</p>
					
				</div>

				{/* Botón editar */}
				<div className="flex justify-end">
					<button
						className="px-4 py-2 rounded-lg font-medium text-white transition-colors"
						style={{ backgroundColor: "var(--color-primary)" }}
						onMouseOver={(e) =>
							((
								e.target as HTMLButtonElement
							).style.backgroundColor =
								"var(--color-primary-hover)")
						}
						onMouseOut={(e) =>
							((
								e.target as HTMLButtonElement
							).style.backgroundColor = "var(--color-primary)")
						}
					>
						Editar perfil
					</button>
				</div>
			</div>
		</div>
	);
}
