import z from "zod";

export const PeliculaAPIResponseShema = z.object({
    backdrop_path: z.string(),
    genre_ids: z.array(z.number()),
    id: z.number(),
    overview: z.string(),
    poster_path: z.string(),
    release_date: z.string(),
    title: z.string()
})

export const PeliculasAPIResponseSchema = z.object({
    results: z.array(
        PeliculaAPIResponseShema
    )
})

export const GeneroAPIResponseSchema = z.object({
    id: z.number(),
    name: z.string()
})

export const GenerosAPIResponseSchema = z.object({
    genres: z.array(
        GeneroAPIResponseSchema
    )
})
