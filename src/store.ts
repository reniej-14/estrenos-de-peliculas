import { create } from "zustand";
import type { Generos, Peliculas } from "./types";
import { getGeneros, getPeliculas } from "./services/Peliculas";

export type AppStoreType = {
    peliculas: Peliculas
    generos: Generos
    filtros: {
        nombre: string;
        mes: string;
        year: string;
    }
    fetchPeliculas: () => Promise<void>
    fetchGeneros: () => Promise<void>
}

export const useAppStore = create<AppStoreType>((set) => ({
    peliculas: {
        results: []
    },
    generos: {
        genres: []
    },
    filtros: {
        nombre: '',
        mes: '',
        year: ''
    },
    fetchPeliculas: async () => {
        const peliculas = await getPeliculas()
        set({
            peliculas
        })
    },
    fetchGeneros: async () => {
        const generos = await getGeneros()
        set({
            generos
        })
    }
}))