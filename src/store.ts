import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Filtros, Generos, Pelicula, PeliculaFavorita, PeliculaInfo, Peliculas, PeliculasFavoritas } from "./types";
import { getGeneros, getPeliculaDuracion, getPeliculas, getPeliculasPorMes, getPeliculasPorYear } from "./services/Peliculas";
import { formatearDuracion } from "./utils/formatearDuracion";

export type AppStoreType = {
    peliculas: Peliculas
    peliculasFavoritas: PeliculasFavoritas
    peliculaInfo: Peliculas
    peliculaInfo2: PeliculaInfo
    generos: Generos
    filtros: Filtros
    fetchPeliculas: () => Promise<void>
    fetchGeneros: () => Promise<void>
    actualizarFiltros: (filtro: string, valor: string) => void
    reiniciarFiltros: () => void
    actualizarPeliculasFavoritas: (pelicula: Pelicula) => void
    actualizarPeliculaInfo: (pelicula: Pelicula) => void
    fetchPeliculaInfo: (id: number) => void
}

export const useAppStore = create<AppStoreType>()(
    persist(
        (set, get) => ({
            peliculas: { 
                results: [] 
            },
            peliculasFavoritas: { 
                results: [] 
            },
            peliculaInfo: { 
                results: [] 
            },
            peliculaInfo2: { 
                duracion: "",
            },
            generos: { 
                genres: [] 
            },
            filtros: { 
                buscar: "", 
                mes: "", 
                year: "2025" 
            },
            fetchPeliculas: async () => {
                const { filtros } = get();

                if (filtros.year !== "2025" && filtros.mes === "" && filtros.buscar === "") {
                    const peliculas = await getPeliculasPorYear(filtros);
                    set({ peliculas });
                    return;
                }

                if (filtros.mes !== "" && filtros.buscar === "") {
                    const peliculas = await getPeliculasPorMes(filtros);
                    set({ peliculas });
                    return;
                }

                if (filtros.buscar === "" && filtros.mes === "" && filtros.year === "2025") {
                    const peliculas = await getPeliculas();
                    set({ peliculas });
                    return;
                }
            },
            fetchGeneros: async () => {
                const generos = await getGeneros();
                set({ generos });
            },
            actualizarFiltros: (filtro, valor) => {
                set({
                    filtros: {
                        ...get().filtros, [filtro]: valor
                    },
                 });
            },
            reiniciarFiltros: () => {
                set({
                    filtros: {
                        buscar: "",
                        mes: "",
                        year: "2025",
                    },
                });
            },
            actualizarPeliculasFavoritas: (pelicula) => {
                const favoritas = get().peliculasFavoritas.results;
                const yaExiste = favoritas.some((peli) => peli.id === pelicula.id);
                const peliculaNueva: PeliculaFavorita = {
                    ...pelicula,
                    like: true,
                };

                if (yaExiste) {
                    const peliculasActualizadas = favoritas.filter((p) => p.id !== pelicula.id);
                    
                    set({
                        peliculasFavoritas: {
                            results: peliculasActualizadas,
                        },
                    });
                    return;
                }

                set({
                    peliculasFavoritas: {
                        results: [...favoritas, peliculaNueva],
                    },
                });
            },
            actualizarPeliculaInfo: (pelicula) => {
                set({
                     peliculaInfo: { 
                        results: [pelicula] 
                    }
                })
            },
            fetchPeliculaInfo: async (id) => {
                const duracionPelicula = await getPeliculaDuracion(id)
                const duracion = formatearDuracion(duracionPelicula)

                set({
                    peliculaInfo2: {
                        duracion
                    }
                })
            }
        }),
        {
            name: "peliculas-favoritas", 
            partialize: (state) => ({
                peliculasFavoritas: state.peliculasFavoritas,
            }),
        }
    )
);
