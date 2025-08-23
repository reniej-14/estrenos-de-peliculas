import z from "zod"
import { DuracionPeliculaResponseSchema, GenerosAPIResponseSchema, PeliculaAPIResponseShema, PeliculasAPIResponseSchema } from "../utils/peliculas-schema"

export type Peliculas = z.infer<typeof PeliculasAPIResponseSchema>
export type Pelicula = z.infer<typeof PeliculaAPIResponseShema>
export type Generos = z.infer<typeof GenerosAPIResponseSchema>

export type Filtros = {
    buscar: string;
    mes: string;
    year: string;
}

export type PeliculaFavorita = Pelicula & {
    like: boolean
}
export type PeliculasFavoritas = {
    results: PeliculaFavorita[]
}

export type DuracionPelicula = z.infer<typeof DuracionPeliculaResponseSchema>

export type PeliculaInfo = {
    duracion: string
    director: string | undefined
    actores: string[] | undefined
    trailer: string | undefined
}