import { useEffect } from "react";
import { useAppStore } from "../store";
import type { Pelicula } from "../types";
import { Link } from "react-router-dom";

export default function Peliculas() {
  const fetchPeliculas = useAppStore((state) => state.fetchPeliculas)
  const fetchGeneros = useAppStore((state) => state.fetchGeneros)
  const filtros = useAppStore((state) => state.filtros)
  const actualizarPeliculasFavoritas = useAppStore(
    (state) => state.actualizarPeliculasFavoritas
  )
  const peliculasFavoritas = useAppStore(
    (state) => state.peliculasFavoritas.results
  )
  const actualizarPeliculaInfo = useAppStore(
    (state) => state.actualizarPeliculaInfo
  )

  useEffect(() => {
    // Solo al montar (una sola vez)
    fetchGeneros()
    fetchPeliculas()
  }, []);

  useEffect(() => {
    // Solo cuando mes o año cambian
    fetchPeliculas()
  }, [filtros.mes, filtros.year])

  const todas = useAppStore((state) => state.peliculas.results)
  const buscar = useAppStore((state) => state.filtros.buscar)

  const peliculas = todas.filter((pelicula) =>
    pelicula.title.toLowerCase().includes(buscar.toLowerCase())
  )
  const generos = useAppStore((state) => state.generos?.genres)

  const handleClick = (pelicula: Pelicula) => {
    actualizarPeliculasFavoritas(pelicula)
  }

  const isLike = (pelicula: Pelicula) => {
    return peliculasFavoritas.some((peli) => peli.id === pelicula.id)
  }

  const handleClickInfo = (pelicula: Pelicula) => {
    actualizarPeliculaInfo(pelicula);
  }

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-6 mx-auto w-[95%] md:w-[100%]">
            {(peliculas ?? []).map((pelicula) => (
                <div
                    key={pelicula.id}
                    className="relative max-w-[300px] mx-auto rounded-lg border border-gray-300 hover:shadow-2xl hover:cursor-pointer transition-shadow"
                >
                    <div
                        className="bg-black/40 hover:bg-black/70 rounded-md p-2 absolute top-2 right-2 z-20"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleClick(pelicula)
                        }}
                    >
                        <img
                            src={isLike(pelicula) ? "/heart2.svg" : "/heart.svg"}
                            alt="Icono favoritas"
                            className="filter w-5 h-5 brightness-0 invert"
                        />
                    </div>

                    <Link 
                        to="/pelicula-info" 
                        onClick={() => handleClickInfo(pelicula)}
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/original${pelicula.poster_path}`}
                            alt="imagen de la película"
                            className="rounded-t-lg max-h-[400px] w-full object-cover"
                        />

                        <div className="p-4">
                            <h3 
                                className="font-medium text-2xl line-clamp-1"
                            >{pelicula.title}</h3>
                            <p 
                                className="text-[16px] text-gray-500 mt-2 mb-3 line-clamp-3"
                            >{pelicula.overview}</p>

                            <div className="flex gap-1 mt-3">
                                <img src="/calendar-week.svg" alt="imagen calendario" />
                                <p 
                                    className="text-[15px] font-semibold"
                                >{pelicula.release_date}</p>
                            </div>

                            <div className="flex gap-2 flex-wrap">
                                {(generos ?? [])
                                    .filter((genero) => pelicula.genre_ids.includes(genero.id))
                                    .slice(0, 3)
                                    .map((genero) => (
                                        <p
                                            key={genero.id}
                                            className="mt-2 border border-gray-300 px-3 rounded-2xl text-[12px] font-semibold"
                                        >{genero.name}</p>
                                    )
                                )}
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}
