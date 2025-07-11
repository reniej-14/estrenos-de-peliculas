import { useEffect } from "react"
import { useAppStore } from "../store"


export default function Peliculas() {

    const fetchPeliculas = useAppStore((state) => state.fetchPeliculas)

    useEffect(() => {
        fetchPeliculas()
    }, [])

    const peliculas = useAppStore((state) => state.peliculas)
    console.log(peliculas)

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-6 mx-auto w-[95%] md:w-[100%]">
                {peliculas.results.map(pelicula => (
                    <div className="max-w-[300px] mx-auto rounded-lg border border-gray-300 hover:shadow-2xl hover:cursor-pointer transition-shadow">
                        <div>
                            <img 
                                src={`https://image.tmdb.org/t/p/original${pelicula.poster_path}`} 
                                alt="imagen de la película"
                                className="rounded-t-lg max-h-[400px] w-[100%] object-cover" 
                            />
                        </div>

                        <div className="p-4">
                            <h3
                                className="font-medium text-2xl line-clamp-1"
                            >{pelicula.title}</h3>

                            <p
                                className="text-[16px] text-gray-500 my-3 line-clamp-3"
                            >{pelicula.overview}</p>

                            <div className="flex gap-1 mt-3">
                                <img 
                                    src="/calendar-week.svg" alt="imagen calendario"
                                />
                                <p
                                    className="text-[15px] font-semibold"
                                >{pelicula.release_date}</p>
                            </div>

                            <div className="flex">
                                <p
                                    className="mt-2 border border-gray-300 px-3 rounded-2xl text-[14px] font-semibold flex"
                                >Acción</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
