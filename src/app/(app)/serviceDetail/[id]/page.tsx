// Necesitaria ya hacer el fetch al servicio por id para traer los datos específicos

import Link from "next/link";

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
                    Volver a la lista de servicios
                </Link>
            </main>
        );
    }

    return (
        <main className="text-white mt-10">
            <div className="flex flex-col items-center justify-self-center bg-black/20 p-4 rounded-xl">
                <h1 className="text-4xl font-bold mb-6">{service.name}</h1>

                <img
                    src={service.photo}
                    alt={service.name}
                    className="w-[500px] h-[350px] object-cover rounded-2xl shadow-lg mb-6"
                    />

                <p className="text-lg text-black max-w-[600px] text-center mb-4">
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
            </div>
        </main>
    );
}