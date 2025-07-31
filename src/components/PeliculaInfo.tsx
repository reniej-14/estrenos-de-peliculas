import { useAppStore } from "../store"

export default function PeliculaInfo() {
    const peliculaInfo = useAppStore((state) => state.peliculaInfo.results[0])
    const peliculasFavoritas = useAppStore((state) => state.peliculasFavoritas)
    const actualizarPeliculasFavoritas = useAppStore((state) => state.actualizarPeliculasFavoritas)

    const isLike = () => {
        return peliculasFavoritas.results.some((peli) => peli.id === peliculaInfo.id)
    }

    const handleClick = () => {
        actualizarPeliculasFavoritas(peliculaInfo)
    }

    console.log(peliculaInfo)

    return (
        <>
            <div className="flex flex-col md:flex-row max-w-[95%] mx-auto my-8 gap-8">
                <div className="w-100% md:max-w-[380px] rounded-lg border border-gray-300">
                    <img 
                        src={`https://image.tmdb.org/t/p/original${peliculaInfo.poster_path}`} 
                        alt="imagen de la película"
                        className="rounded-t-lg max-w-[100%] object-cover"
                    />

                    <div className="p-4">
                        <button
                            onClick={handleClick}
                            className={`mb-6 md:mb-0 flex gap-2 justify-center items-center border rounded-md py-2 px-3 h-[41px] cursor-pointer transition-colors
                            ${isLike() ? "bg-black text-white hover:bg-gray-900"
                            : "border-gray-300 hover:bg-gray-200"} w-[100%]`}
                        >
                            <img
                                src={isLike() ? "/heart2.svg" : "/heart.svg"}
                                alt="Icono favoritas"
                                className={`w-5 h-5 ${isLike() ? "filter brightness-0 invert" : ""}`}
                            />
                            <p 
                                className="text-[14px] md:text-[16px] font-medium"
                            >{isLike() ? "Quitar de favoritos" : "Añadir a favoritos"}</p>
                        </button>
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl md:text-4xl font-bold">{peliculaInfo.title}</h2>

                    <div className="flex gap-4">
                        <div className="flex gap-1 mt-3">
                            <img src="/calendar-week.svg" alt="imagen calendario" />
                            <p 
                                className="text-[15px] font-semibold"
                            >{peliculaInfo.release_date}</p>
                        </div>
                        <div className="flex gap-1 mt-3">
                            <img src="/reloj.svg" alt="imagen calendario" />
                            <p 
                                className="text-[15px] font-semibold"
                            >{2}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-3xl font-medium mt-6">Sinopsis</h3>
                        <p className="text-gray-500 text-[14px] md:text-[17px] mt-4">{peliculaInfo.overview}</p>
                    </div>
                </div>
            </div>
        </>
    )
}