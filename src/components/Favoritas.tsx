import { useAppStore } from "../store"
import PeliculasFavoritas from "./PeliculasFavoritas";

export default function Favoritas() {
    const peliculasFavoritas = useAppStore((state) => state.peliculasFavoritas)

    return (
        <>
            {peliculasFavoritas.results.length ? (
                <>
                    <h2 className="mx-auto text-center font-medium text-[24px] my-10">Películas Favoritas</h2>
                    <PeliculasFavoritas/>
                </>
            ) : (
                <>
                    <div className="my-50 mx-auto text-center w-[95%] md:w-full">
                        <p className="text-6xl">🎬</p>
                        <h2 className="text-[24px] font-medium mt-4">No tienes películas favoritas</h2>
                        <p className="my-0 text-gray-500">Marca algunas películas como favoritas usando el ❤️</p>
                    </div>
                </>
            )}
        </>
    )
}

