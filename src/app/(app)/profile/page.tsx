import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCalendar, faHeart, faStar, faUser } from "@fortawesome/free-regular-svg-icons";
import { faChevronRight, faGear } from "@fortawesome/free-solid-svg-icons";

export default function ProfilePage() {


	return (
		<main className="max-w-4xl  mt-8">
			<h1 className="text-[48px] font-bold text-[var(--color-primary)] mb-6">Perfil</h1>
			<div className="bg-[var(--color-primary)] p-6 rounded-3xl text-white flex flex-col gap-8">
				<div className="flex flex-col md:flex-row justify-center items-center gap-6">
					<img
						src="https://i.pravatar.cc/40?img=3"
						alt="User profilePicture"
						className="w-[130px] h-[130px] rounded-full border border-2 border-white object-cover"
					/>
					<div>
						<h3 className="font-bold text-[36px]">Juana Díaz</h3>
						<h5 className="font-Medium text-[24px]">juanadiaz@gmail.com</h5>
					</div>
				</div>
				<span className="flex flex-col md:flex-row justify-around">
					<div className="flex flex-col items-center gap-1">
						<p className="text-[36px] font-regular">10</p>
						<h5 className="text-[24px] font-regular">Servicios</h5>
					</div>
					<div className="flex flex-col items-center gap-1">
						<p className="text-[36px] font-regular">10</p>
						<h5 className="text-[24px] font-regular">Favoritos</h5>
					</div>
					<div className="flex flex-col items-center gap-1">
						<p className="text-[36px] font-regular">10</p>
						<h5 className="text-[24px] font-regular">Reseñas</h5>
					</div>
				</span>
			</div>
			<div className="flex flex-col lg:flex-row justify-around gap-4 mt-8 w-[100%]">
				<div className="flex flex-col gap-6 bg-white w-full p-6 rounded-3xl text-[var(--color-primary)] border border-[#949492]">
						<div className="flex flex-row justify-between items-center text-[24px] font-semiBold pb-4 border-b border-[#949492] hover:scale-105"> <span><FontAwesomeIcon icon={faUser} /> Editar Perfil </span> <FontAwesomeIcon icon={faChevronRight} /></div>
						<div className="flex flex-row justify-between items-center text-[24px] font-semiBold pb-4 border-b border-[#949492] hover:scale-105"> <span><FontAwesomeIcon icon={faHeart} /> Favoritos </span> <FontAwesomeIcon icon={faChevronRight} /></div>
						<div className="flex flex-row justify-between items-center text-[24px] font-semiBold hover:scale-105"> <span><FontAwesomeIcon icon={faStar} /> Mis Reseñas </span> <FontAwesomeIcon icon={faChevronRight} /></div>
				</div>
				<div className="flex flex-col gap-6 bg-white w-full p-6 rounded-3xl text-[var(--color-primary)] border border-[#949492]">
						<div className="flex flex-row justify-between items-center text-[24px] font-semiBold pb-4 border-b border-[#949492] hover:scale-105"><span> <FontAwesomeIcon icon={faCalendar} /> Historial de servicios</span> <FontAwesomeIcon icon={faChevronRight} /></div>
						<div className="flex flex-row justify-between items-center text-[24px] font-semiBold pb-4 border-b border-[#949492] hover:scale-105"><span><FontAwesomeIcon icon={faBell} /> Notificaciones </span><FontAwesomeIcon icon={faChevronRight} /> </div>
						<div className="flex flex-row justify-between items-center text-[24px] font-semiBold hover:scale-105"><span><FontAwesomeIcon icon={faGear} /> Configuracion </span> <FontAwesomeIcon icon={faChevronRight} /></div>
				</div>
			</div>
			{/* Este button probablemente sea un component "use client" */}
			<button className="text-[20px] font-medium mt-4 px-4 py-1 bg-white rounded-lg border border-[#949492] hover:bg-[var(--color-bg-hover)]">Cerrar Sesión</button>
		</main>
	);
}
