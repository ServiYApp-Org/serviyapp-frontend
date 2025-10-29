

export default function PageServices() {
    return (
        <main className="flex flex-col ">
            <h1 className="font-bold text-blue-800 text-3xl mt-10">Servicios</h1>
            <div className="flex-end w-[70%] bg-blue-400 rounded-2xl py-1 mt-6">
                <h4 className="mt-4 mx-4 text-white text-xl font-semibold">Ecuentra tu servicio de belleza ideal</h4>
                <span className="m-4 text-sm text-white">Profesionales certificados a tu domicilio</span>

                <ul className="flex justify-around gap-4 bg-white/60 p-2 rounded-lg m-4">
                    <li>Categoria</li>
                    <li>Provincia o Estado</li>
                    <li>Ciudad</li>
                    <li>Fecha</li>
                    <button>🔍</button>
                </ul>
            </div>
            <span className="text-black/20"> Filtra por:
                <ul className="flex text-black font-semibold gap-2 bg-white/60 p-2 rounded-lg m-4">
                    <li className="bg-black/5 border border-black/10 rounded-xl px-2">Menor precio</li>
                    <li className="bg-black/5 border border-black/10 rounded-xl px-2">Mejor Valorado</li>
                    <li className="bg-black/5 border border-black/10 rounded-xl px-2">Menor Duracion</li>
                    <li className="bg-black/5 border border-black/10 rounded-xl px-2">Categoria</li>
                </ul>
            </span>
            <div>
                {/* Aquí se listarán los servicios disponibles */}
                128 servicios disponibles
                <div className="grid grid-cols-3 justify-items-center gap-4 mt-4">
                    <div className="w-[200px] h-[300px] border border-black/50 rounded-lg">
                        <img src="" alt="" className="h-[50%]"/>
                        <p> Titulo </p>
                        <span>Por Profesional Oficio</span>

                        <span className="flex flex-row justify-between px-1 border-b">
                            <p>1:30 hr</p>
                            <p>4.5</p>
                        </span>
                        <span className="flex flex-row justify-between px-1 mt-2">
                            <p>$500.mx</p>
                            <button className="bg-blue-600 px-1 rounded-xl text-white"> Ver más</button>
                        </span>

                    </div>
                    <div className="w-[200px] h-[300px] border border-black/50 rounded-lg">
                        <img src="" alt="" className="h-[50%]"/>
                        <p> Titulo </p>
                        <span>Por Profesional Oficio</span>

                        <span className="flex flex-row justify-between px-1 border-b">
                            <p>1:30 hr</p>
                            <p>4.5</p>
                        </span>
                        <span className="flex flex-row justify-between px-1 mt-2">
                            <p>$500.mx</p>
                            <button className="bg-blue-600 px-1 rounded-xl text-white"> Ver más</button>
                        </span>

                    </div>
                    <div className="w-[200px] h-[300px] border border-black/50 rounded-lg">
                        <img src="" alt="" className="h-[50%]"/>
                        <p> Titulo </p>
                        <span>Por Profesional Oficio</span>

                        <span className="flex flex-row justify-between px-1 border-b">
                            <p>1:30 hr</p>
                            <p>4.5</p>
                        </span>
                        <span className="flex flex-row justify-between px-1 mt-2">
                            <p>$500.mx</p>
                            <button className="bg-blue-600 px-1 rounded-xl text-white"> Ver más</button>
                        </span>

                    </div>
                    <div className="w-[200px] h-[300px] border border-black/50 rounded-lg">
                        <img src="" alt="" className="h-[50%]"/>
                        <p> Titulo </p>
                        <span>Por Profesional Oficio</span>

                        <span className="flex flex-row justify-between px-1 border-b">
                            <p>1:30 hr</p>
                            <p>4.5</p>
                        </span>
                        <span className="flex flex-row justify-between px-1 mt-2">
                            <p>$500.mx</p>
                            <button className="bg-blue-600 px-1 rounded-xl text-white"> Ver más</button>
                        </span>

                    </div>
                    <div className="w-[200px] h-[300px] border border-black/50 rounded-lg">
                        <img src="" alt="" className="h-[50%]"/>
                        <p> Titulo </p>
                        <span>Por Profesional Oficio</span>

                        <span className="flex flex-row justify-between px-1 border-b">
                            <p>1:30 hr</p>
                            <p>4.5</p>
                        </span>
                        <span className="flex flex-row justify-between px-1 mt-2">
                            <p>$500.mx</p>
                            <button className="bg-blue-600 px-1 rounded-xl text-white"> Ver más</button>
                        </span>

                    </div>
                    <div className="w-[200px] h-[300px] border border-black/50 rounded-lg">
                        <img src="" alt="" className="h-[50%]"/>
                        <p> Titulo </p>
                        <span>Por Profesional Oficio</span>

                        <span className="flex flex-row justify-between px-1 border-b">
                            <p>1:30 hr</p>
                            <p>4.5</p>
                        </span>
                        <span className="flex flex-row justify-between px-1 mt-2">
                            <p>$500.mx</p>
                            <button className="bg-blue-600 px-1 rounded-xl text-white"> Ver más</button>
                        </span>

                    </div>
                    <div className="w-[200px] h-[300px] border border-black/50 rounded-lg">
                        <img src="" alt="" className="h-[50%]"/>
                        <p> Titulo </p>
                        <span>Por Profesional Oficio</span>

                        <span className="flex flex-row justify-between px-1 border-b">
                            <p>1:30 hr</p>
                            <p>4.5</p>
                        </span>
                        <span className="flex flex-row justify-between px-1 mt-2">
                            <p>$500.mx</p>
                            <button className="bg-blue-600 px-1 rounded-xl text-white"> Ver más</button>
                        </span>

                    </div>
                    <div className="w-[200px] h-[300px] border border-black/50 rounded-lg">
                        <img src="" alt="" className="h-[50%]"/>
                        <p> Titulo </p>
                        <span>Por Profesional Oficio</span>

                        <span className="flex flex-row justify-between px-1 border-b">
                            <p>1:30 hr</p>
                            <p>4.5</p>
                        </span>
                        <span className="flex flex-row justify-between px-1 mt-2">
                            <p>$500.mx</p>
                            <button className="bg-blue-600 px-1 rounded-xl text-white"> Ver más</button>
                        </span>

                    </div>
                    <div className="w-[200px] h-[300px] border border-black/50 rounded-lg">
                        <img src="" alt="" className="h-[50%]"/>
                        <p> Titulo </p>
                        <span>Por Profesional Oficio</span>

                        <span className="flex flex-row justify-between px-1 border-b">
                            <p>1:30 hr</p>
                            <p>4.5</p>
                        </span>
                        <span className="flex flex-row justify-between px-1 mt-2">
                            <p>$500.mx</p>
                            <button className="bg-blue-600 px-1 rounded-xl text-white"> Ver más</button>
                        </span>

                    </div>
                </div>

            </div>
        </main>
    );
}