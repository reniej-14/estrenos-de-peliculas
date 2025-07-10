import axios from "axios";
import { PeliculasAPIResponseSchema } from "../utils/peliculas-schema";

export async function getPeliculas() {
    const apiKey = 'a3ee459722faa8eaa14416ff37611eeb'
    const url = `https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2025-01-01&primary_release_date.lte=2025-12-31&language=es&api_key=${apiKey}`

    try {
        const { data } = await axios(url)
        const result = PeliculasAPIResponseSchema.safeParse(data)

        if (result.success) {
            return result.data
        }
    } catch (error) {
        console.log(error)
    }
}
