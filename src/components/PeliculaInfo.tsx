import { useEffect } from "react"
import { useAppStore } from "../store"

export default function PeliculaInfo() {
    const peliculaInfo = useAppStore((state) => state.peliculaInfo.results[0])
    const peliculasFavoritas = useAppStore((state) => state.peliculasFavoritas)
    const actualizarPeliculasFavoritas = useAppStore((state) => state.actualizarPeliculasFavoritas)
    const fetchPeliculaInfo = useAppStore((state) => state.fetchPeliculaInfo)
    const peliculaInfo2 = useAppStore((state) => state.peliculaInfo2)
    const generos = useAppStore((state) => state.generos?.genres)
    const getPeliculaReparto = useAppStore((state) => state.getPeliculaReparto)
    const getPeliculaTrailer = useAppStore((satate) => satate.getPeliculaTrailer)

    const isLike = () => {
        return peliculasFavoritas.results.some((peli) => peli.id === peliculaInfo.id)
    }

    const handleClick = () => {
        actualizarPeliculasFavoritas(peliculaInfo)
    }

    useEffect(() => {
        fetchPeliculaInfo(peliculaInfo.id)
        getPeliculaReparto(peliculaInfo.id)
        getPeliculaTrailer(peliculaInfo.id)
    }, [])

    const trailerYoutube = `https://www.youtube.com/embed/${peliculaInfo2.trailer}`

    console.log(trailerYoutube)

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <div className="flex flex-col md:flex-row max-w-[95%] md:max-w-[80%] mx-auto my-8 gap-8">
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
                            >{peliculaInfo2.duracion}</p>
                        </div>
                    </div>

                    <div className="flex gap-2 flex-wrap mt-2">
                                {(generos ?? [])
                                    .filter((genero) => peliculaInfo.genre_ids.includes(genero.id))
                                    .slice(0, 3)
                                    .map((genero) => (
                                        <p
                                            key={genero.id}
                                            className="mt-2 border border-gray-300 px-3 rounded-2xl text-[12px] font-semibold"
                                        >{genero.name}</p>
                                    )
                                )}
                            </div>

                    <div>
                        <h3 className="text-3xl font-medium mt-8">Sinopsis</h3>
                        <p className="text-gray-500 text-[14px] md:text-[17px] mt-4">{peliculaInfo.overview}</p>
                    </div>

                    <div className="rounded-lg border border-gray-300 mt-6 p-6">
                        <div className="flex gap-2">
                            <img src="/users.svg" alt="Imagen de reparto" />
                            <h2 className="font-medium text-2xl ">Reparto y Equipo</h2>
                        </div>

                        <div className="py-3 border-b border-gray-300">
                            <h3 className="font-medium text-[14px] md:text-[17px]">Director</h3>

                            <p className="text-gray-500 text-[14px] md:text-[17px]">{peliculaInfo2.director}</p>
                        </div>

                        <div className="mt-3">
                            <h3 className="font-medium text-[14px] md:text-[17px]">Reparto Principal</h3>

                            <p className="text-gray-500 text-[14px] md:text-[17px]">{peliculaInfo2.actores?.slice(0, 5).join(", ")}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[95%] md:max-w-[80%] mx-auto my-8 p-6 rounded-lg border border-gray-300">
                <div>
                    <div className="flex items-center gap-2">
                        <img src="/play.svg" alt="imagen play" />
                        <h2 className="font-medium text-2xl">Trailer Oficial</h2>
                    </div>
                    
                    <p className="text-gray-500 text-[13px] md:text-[16px]">Mira el trailer oficial de {peliculaInfo.title}</p>
                </div>

                <div className="mt-6">
                    <div className="aspect-video w-full">
                        <iframe
                            className="w-full h-full rounded-lg" 
                            src={trailerYoutube}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy">
                        </iframe>
                    </div>
                </div>
            </div>
        </>
    )
}