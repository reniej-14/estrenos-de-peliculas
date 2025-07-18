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
        const { filtros } = get()

        // Buscar por año diferente
        if (filtros.year !== '2025' && filtros.mes === '' && filtros.buscar === '') {
            const peliculas = await getPeliculasPorYear(filtros)
            set({ 
                peliculas 
            })
            return
        }

        // Buscar por mes (con año)
        if (filtros.mes !== '' && filtros.buscar === '') {
        const peliculas = await getPeliculasPorMes(filtros)
            set({ 
                peliculas 
            })
            return
        }

        // Si no hay ningún filtro
        if (filtros.buscar === '' && filtros.mes === '' && filtros.year === '2025') {
            const peliculas = await getPeliculas()
            set({ 
                peliculas 
            })
            return
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
    },
    reiniciarFiltros: () => {
        set({
            filtros: {
                buscar: '',
                mes: '',
                year: '2025'
            }
        })    
    }
}))