// Necesitaria ya hacer el fetch al servicio por id para traer los datos específicos

import Link from "next/link";

import { FontAwesomeIcon,  } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faStar } from "@fortawesome/free-solid-svg-icons";

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
        description: "Servicio de uñas acrílicas con diseño personalizado."
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
        description: "Corte de cabello moderno y estilizado."
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
        description: "Limpieza facial profunda para una piel radiante."
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
        description: "Servicio de uñas acrílicas con diseño personalizado."
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
        description: "Corte de cabello moderno y estilizado."
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
        description: "Limpieza facial profunda para una piel radiante."
    },
]



export default async function ServiceDetailPage({ params }: { params: { id: string } }) {
    
    const { id } = await params;
    
    const service = services.find(service => service.id === parseInt(id));

    if (!service) {
        return (
            <main className="flex flex-col justify-center items-center gap-5">
                <h1 className="font-bold text-[var(--color-primary)] text-5xl mt-10 text-center md:text-left" >Servicio no encontrado</h1>
                <Link href="/services" className=" bg-[var(--foreground)] text-white p-3 rounded-lg hover:bg-[var(--color-accent)] hover:text-[var(--foreground)] hover:border transition">
                    Volver a Servicios
                </Link>
            </main>
        );
    }

    return (
        <main className="flex flex-col max-w-4xl mx-auto mt-8">
            <h1 className="text-[40px] font-bold text-gray-800 mb-6">Detalle del Servicio</h1>
            <Link href={"/services"} className="max-w-[160px] w-auto bg-[var(--foreground)] text-white p-1 my-1 rounded-lg hover:bg-[var(--color-accent)] hover:text-[var(--foreground)] border transition">  
                <FontAwesomeIcon icon={faArrowLeft}   className="text-sm md:text-base" style={{ width: "1rem", height: "1rem" }} /> Volver a Servicios
            </Link>
            <div className="flex flex-col lg:flex-row gap-2 bg-white p-4 rounded-2xl shadow-lg">
                <div>
                <img
                    src={service.photo}
                    alt={service.name}
                    className="w-[500px] h-[350px] object-cover rounded-2xl shadow-lg mb-6"
                />
                </div>
                <div className="flex flex-col items-start h-full">
                    <div className="flex items-center gap-2 mb-2 text-[var(--color-primary)]">
                    <h2 className="text-4xl font-bold text-[var(--color-primary)]">{service.name}</h2>
                    <span className="flex justify-center items-center font-bold bg-gray-200 px-2 py-1 rounded-lg">
                        {service.rating}
                        <FontAwesomeIcon
                        icon={faStar}
                        className="ml-1 text-sm md:text-base"
                        style={{ width: "1rem", height: "1rem" }}
                        />
                    </span>
                </div>
                    <p className="text-lg text-black max-w-[600px] mb-4">
                        {service.description}
                    </p>

                    <span className="text-md text-gray-400 mb-2">
                        <strong>Duración:</strong> {service.duration}
                    </span>

                    <span className="text-md text-gray-400 mb-2">
                        <strong>Proveedor:</strong> {service.provider}
                    </span>

                    <span className="text-md text-gray-400 mb-4">
                        <strong>Categoría:</strong> {service.category}
                    </span>

                    <p className="text-2xl font-bold text-[var(--color-primary)]">
                        ${service.price} mxn
                    </p>
                    <button className="self-center max-w-[180px] w-auto bg-[var(--foreground)] text-white px-2 py-1 mt-5 rounded-lg hover:bg-[var(--color-accent)] hover:text-[var(--foreground)] border transition" >Deseo este Servicio</button>
                </div>
            </div>
        </main>
    );
}