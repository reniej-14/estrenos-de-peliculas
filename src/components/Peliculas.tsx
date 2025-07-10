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
            {peliculas.results.map(pelicula => (
                <p
                    key={pelicula.id}
                    >{pelicula.title}</p>
            ))}
        </>
    )
}
