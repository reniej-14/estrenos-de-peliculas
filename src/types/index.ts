import z from "zod"
import { PeliculaAPIResponseShema, PeliculasAPIResponseSchema } from "../utils/peliculas-schema"

export type Peliculas = z.infer<typeof PeliculasAPIResponseSchema>
export type Pelicula = z.infer<typeof PeliculaAPIResponseShema>