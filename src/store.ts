import { create } from "zustand";
import type { Filtros, Generos, Peliculas } from "./types";
import { getGeneros, getPeliculas, getPeliculasPorMes, getPeliculasPorYear } from "./services/Peliculas";

export type AppStoreType = {
    peliculas: Peliculas
    generos: Generos
    filtros: Filtros
    fetchPeliculas: () => Promise<void>
    fetchGeneros: () => Promise<void>
    actualizarFiltros: (filtro: string, valor: string) => void
    reiniciarFiltros: () => void
}

export const useAppStore = create<AppStoreType>((set, get) => ({
    peliculas: {
        results: []
    },
    generos: {
        genres: []
    },
    filtros: {
        buscar: '',
        mes: '',
        year: '2025'
    },
    fetchPeliculas: async () => {
        if (get().filtros.buscar === "" && get().filtros.mes === "" && get().filtros.year === '2025') {
            const peliculas = await getPeliculas()
            set({
                peliculas
            })
            console.log('sigue siendo el mismo')
            return
        }

        if (get().filtros.buscar !== '') {
            const arrayPeliculas = get().peliculas.results
            const peliculas = arrayPeliculas.filter(resultados => {
                const nombre = resultados.title.toLowerCase()
                return nombre.includes(get().filtros.buscar.toLowerCase())
            })

            set({
                peliculas: {
                    results: peliculas
                }
            })

            console.log('Buscando...')
            console.log(peliculas)
        }

        if (get().filtros.mes !== '') {
            const peliculas = await getPeliculasPorMes(get().filtros)
            set({
                peliculas
            })
            console.log('Ahora es mes')
            return
        }

        if (get().filtros.year !== '2025') {
            const peliculas = await getPeliculasPorYear(get().filtros)
            set({
                peliculas
            })
            console.log('Ahora es año')
        }
    },
    fetchGeneros: async () => {
        const generos = await getGeneros()
        set({
            generos
        })
    },
    actualizarFiltros: (filtro, valor) => {
        set({
            filtros: {
                ...get().filtros,
                [filtro]: valor
            }
        })
        console.log(get().filtros)
    },
    reiniciarFiltros: () => {
        set({
            filtros: {
                buscar: '',
                mes: '',
                year: '2025'
            }
        })    
        console.log(get().filtros)
    }
}))