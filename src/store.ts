import { create } from "zustand";
import type { Peliculas } from "./types";
import { getPeliculas } from "./services/Peliculas";

export type AppStoreType = {
    peliculas: Peliculas
    fetchPeliculas: () => Promise<void>
}

export const useAppStore = create<AppStoreType>((set) => ({
    peliculas: {
        results: []
    },
    fetchPeliculas: async () => {
        const peliculas = await getPeliculas()
        set({
            peliculas
        })
    }
}))