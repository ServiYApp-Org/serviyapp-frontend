import ServiceCard from "@/app/components/ServiceCard";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faStar, faClock, faTag, faDollarSign } from "@fortawesome/free-solid-svg-icons";


const services = [
    {
        id: 1,
        name: "Uñas Acrilicas",
        photo: "https://img.freepik.com/foto-gratis/manicurista-cerca-esmalte-unas_23-2149171334.jpg?semt=ais_hybrid&w=740&q=80",
        provider: "Ariadna Ramirez",
        duration: "1:30 hr",
        rating: 4.5,
        price: 500,
        category: "Uñas",
    },
    {
        id: 2,
        name: "Corte de Cabello",
        photo: "https://img.freepik.com/foto-gratis/manicurista-cerca-esmalte-unas_23-2149171334.jpg?semt=ais_hybrid&w=740&q=80",
        provider: "Stefano Masotti",
        duration: "1:30 hr",
        rating: 4.0,
        price: 5.000,
        category: "Cabello",
    },
    {
        id: 3,
        name: "Limpieza Facial",
        photo: "https://img.freepik.com/foto-gratis/manicurista-cerca-esmalte-unas_23-2149171334.jpg?semt=ais_hybrid&w=740&q=80",
        provider: "Florencia Bustos",
        duration: "2:00 hr",
        rating: 4.8,
        price: 8000,
        category: "Spa",
    },
        {
        id: 4,
        name: "Uñas Acrilicas",
        photo: "https://img.freepik.com/foto-gratis/manicurista-cerca-esmalte-unas_23-2149171334.jpg?semt=ais_hybrid&w=740&q=80",
        provider: "Ariadna Ramirez",
        duration: "1:30 hr",
        rating: 4.5,
        price: 500,
        category: "Uñas",
    },
    {
        id: 5,
        name: "Corte de Cabello",
        photo: "https://img.freepik.com/foto-gratis/manicurista-cerca-esmalte-unas_23-2149171334.jpg?semt=ais_hybrid&w=740&q=80",
        provider: "Stefano Masotti",
        duration: "1:30 hr",
        rating: 4.0,
        price: 5.000,
        category: "Cabello",
    },
    {
        id: 6,
        name: "Limpieza Facial",
        photo: "https://img.freepik.com/foto-gratis/manicurista-cerca-esmalte-unas_23-2149171334.jpg?semt=ais_hybrid&w=740&q=80",
        provider: "Florencia Bustos",
        duration: "2:00 hr",
        rating: 4.8,
        price: 8000,
        category: "Spa",
    },
]

export default function PageServices() {
    return (
        <main
        className="
            flex flex-col justify-start 
            bg--background 
            overflow-x-hidden
            overflow-y-hidden
            min-h-screen 
            px-2
            pb-20 md:pb-4
            max-w-[1300px] mx-auto
        "
        >
        <h1 className="font-bold text-[var(--color-primary)] text-5xl mt-10 text-center md:text-left">
            Servicios
        </h1>

        {/* Barra superior con búsqueda */}
        <div className="w-full bg-[var(--color-primary)] rounded-2xl py-4 mt-6 flex flex-col items-start">
            <h4 className="mx-4 text-white text-2xl font-semibold text-center md:text-left">
            Encuentra tu servicio de belleza ideal
            </h4>
            <span className="m-4 text-md text-white text-center md:text-left">
            Profesionales certificados a tu domicilio
            </span>

            {/* Barra de búsqueda */}
            <form
            className="
                flex flex-col lg:flex-row 
                justify-around items-center 
                gap-4 bg-white p-4 
                rounded-3xl m-4 max-w-[900px] mx-auto
            "
            >
            {/* Servicio */}
            <div className="flex flex-col text-black px-3 w-full lg:w-auto">
                <label className="text-sm font-medium">Servicio</label>
                <input
                type="text"
                placeholder="Escribe el servicio"
                className="text-black/70 text-sm focus:outline-none placeholder:text-black/40 border-b border-black/10 lg:border-none"
                />
            </div>

            {/* Provincia */}
            <div className="flex flex-col text-black px-3 w-full lg:w-auto lg:border-l md:border-black/10">
                <label className="text-sm font-medium">Provincia o Estado</label>
                <select className="text-black/70 text-sm focus:outline-none border-b border-black/10 lg:border-none">
                <option value="">Selecciona una provincia</option>
                <option value="buenosaires">Buenos Aires</option>
                <option value="cordoba">Córdoba</option>
                <option value="santafe">Santa Fe</option>
                </select>
            </div>

            {/* Ciudad */}
            <div className="flex flex-col text-black px-3 w-full lg:w-auto lg:border-l md:border-black/10">
                <label className="text-sm font-medium">Ciudad</label>
                <select className="text-black/70 text-sm focus:outline-none border-b border-black/10 lg:border-none">
                <option value="">Selecciona una ciudad</option>
                </select>
            </div>

            {/* Fecha */}
            <div className="flex flex-col text-black px-3 w-full lg:w-auto lg:border-l md:border-black/10">
                <label className="text-sm font-medium">Fecha</label>
                <input
                type="date"
                className="text-black/70 text-sm focus:outline-none border-b border-black/10 lg:border-none"
                />
            </div>

            {/* Botón buscar */}
            <button
                type="button"
                className="bg-[var(--color-primary)] rounded-full w-[40px] h-[40px] hover:bg-[var(--color-primary-hover)] flex items-center justify-center text-white text-lg mt-2 md:mt-0"
            >
                <FontAwesomeIcon icon={faSearch} />
            </button>
            </form>
        </div>

        {/* Filtros */}
        <span className="text-black/30 mt-5">
            Filtra por:
            <ul className="flex flex-col lg:flex-row text-black font-semibold gap-2 p-2 rounded-lg mb-4 mx-4">
            <li className="max-w-[250px] border border-black/10 rounded-2xl px-4 py-2 hover:bg-black/5">
                <FontAwesomeIcon icon={faDollarSign} /> Menor precio
            </li>
            <li className="max-w-[250px] border border-black/10 rounded-2xl px-4 py-2 hover:bg-black/5">
                <FontAwesomeIcon icon={faStar} /> Mejor Valorado
            </li>
            <li className="max-w-[250px] border border-black/10 rounded-2xl px-4 py-2 hover:bg-black/5">
                <FontAwesomeIcon icon={faClock} /> Menor Duración
            </li>
            <li className="max-w-[250px] border border-black/10 rounded-2xl px-4 py-2 hover:bg-black/5">
                <FontAwesomeIcon icon={faTag} /> Categoría
            </li>
            </ul>
        </span>

        {/* Cards */}
        <div>
            <span className="text-black/30 mt-5">128 servicios disponibles</span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 justify-items-center gap-4 mt-4">
            {services.map((service) => (
                <ServiceCard
                key={service.id}
                id ={service.id}
                name={service.name}
                photo={service.photo}
                provider={service.provider}
                duration={service.duration}
                rating={service.rating}
                price={service.price}
                category={service.category}
                />
            ))}
            </div>
        </div>
        </main>
    );
}