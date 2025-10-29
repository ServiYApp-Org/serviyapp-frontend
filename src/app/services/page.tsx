


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
        <main className="flex flex-col bg--background ml-10">
            <h1 className="font-bold text-[var(--color-primary)] text-3xl mt-10">Servicios</h1>
            <div className="flex-end w-[70%] bg-[var(--color-primary)] rounded-2xl py-1 mt-6">
                <h4 className="mt-4 mx-4 text-white text-xl font-semibold">Ecuentra tu servicio de belleza ideal</h4>
                <span className="m-4 text-sm text-white">Profesionales certificados a tu domicilio</span>

                {/* Barra de busqueda -Va a ser un componente "use client" pero necesito que pusheen para traerme la carpeta- */}
                <ul className="flex justify-around gap-4 bg-white p-2 rounded-lg m-4">
                    <li className="flex flex-col text-black ">Servicio <span className="text-black/30 text-sm">Escribe el servicio</span></li>
                    <li className="flex flex-col text-black ">Provincia o Estado <span className="text-black/30 text-sm">Ingresa tu provincia</span></li>
                    <li className="flex flex-col text-black ">Ciudad <span className="text-black/30 text-sm">Ingresa tu ciudad</span></li>
                    <li className="flex flex-col text-black ">Fecha <span className="text-black/30 text-sm">Agrega la fecha</span></li>
                    <button className="bg-[var(--color-primary)] rounded-full w-[40px] h-[40px]"> 🔍 </button>
                </ul>
            </div>
            <span className="text-black/30 mt-5"> Filtra por:
                    <ul className="flex text-black font-semibold gap-2 p-2 rounded-lg mb-4 mx-4 ">
                        <li className="border border-black/10 rounded-2xl px-4 py-2">Menor precio</li>
                        <li className="border border-black/10 rounded-2xl px-4 py-2">Mejor Valorado</li>
                        <li className="border border-black/10 rounded-2xl px-4 py-2">Menor Duracion</li>
                        <li className="border border-black/10 rounded-2xl px-4 py-2">Categoria</li>
                    </ul>
            </span>
            <div>
                {/* Aquí se listarán los servicios disponibles */}
                <span className="text-black/30 mt-5">128 servicios disponibles</span>
                <div className="grid grid-cols-3 justify-items-center gap-4 mt-4">
                    {services.map((service) => (
                        // Tarjeta de servicio (que va a ser un componente aparte)
                        <div key={service.id} className="flex flex-col w-[330px] h-[440px] border border-black/50 rounded-lg">
                            <div className="relative h-[60%]">
                                <img
                                src={service.photo}
                                alt={`Imagen de ${service.name}`}
                                className="w-full h-full object-cover"
                                />
                                <button className="absolute top-2 right-2 bg-white/80 px-2 py-1 rounded-full text-sm font-medium hover:scale-105 transition-transform">
                                ❤
                                </button>
                                <span className="absolute bottom-2 left-2 bg-white/80 px-2 py-1 rounded-lg text-sm font-medium">
                                Category
                                </span>
                            </div>
                            <p className="pt-2 px-2 text-2xl font-semibold text-[var(--color-primary)] "> {service.name} </p>
                            <span className="px-2 text-md text-black/40 font-medium">Por {service.provider}</span>
                            <span className="flex flex-row justify-between mt-8 px-1 border-b">
                                <p className="px-2 text-md text-black/40 font-medium">🕓{service.duration}</p>
                                <p className="px-2 text-md text-[var(--color-primary)] font-bold">{service.rating}⭐</p>
                            </span>
                            <span className="flex flex-row justify-between px-1 mt-2">
                                <p className="px-2 text-md text-[var(--color-primary)] font-bold">${service.price}.mx</p>
                                <button className="bg-[var(--color-primary)] px-3 py-1 rounded-xl text-white hover:scale-[1.05] hover:bg-[var(--color-primary)]/95 transition "> Ver más</button>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}