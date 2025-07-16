import axios from "axios";
import { GenerosAPIResponseSchema, PeliculasAPIResponseSchema } from "../utils/peliculas-schema";
import type { Filtros } from "../types";
import { obtenerRangoDeMes } from "../utils/obtenerRangoDeMes";
import { number } from "zod";

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

export async function getPeliculasPorMes(filtro: Filtros) {
    /* const { inicio, fin } = obtenerRangoDeMes(Number(filtro.year), Number(filtro.mes)); */
    const apiKey = 'a3ee459722faa8eaa14416ff37611eeb'
    const url = `https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${filtro.year}-${filtro.mes}-01&primary_release_date.lte=${filtro.year}-${filtro.mes}-28&language=es&api_key=${apiKey}`

    try {
        const { data } = await axios(url)
        const result = PeliculasAPIResponseSchema.safeParse(data)

        if (result.success) {
            console.log(result.data)
            return result.data
        } else {
            console.log(result.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getPeliculasPorYear(filtro: Filtros) {
    const apiKey = 'a3ee459722faa8eaa14416ff37611eeb'
    const url = `https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${filtro.year}-01-01&primary_release_date.lte=${filtro.year}-12-28&language=es&api_key=${apiKey}`

    try {
        const { data } = await axios(url)
        const result = PeliculasAPIResponseSchema.safeParse(data)

        if (result.success) {
            console.log(result.data)
            return result.data
        } else {
            console.log(result.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getGeneros() {
    const apiKey = 'a3ee459722faa8eaa14416ff37611eeb'
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=es`

    try {
        const { data } = await axios(url)
        const result = GenerosAPIResponseSchema.safeParse(data)

        if (result.success) {
            return result.data
        } 
    } catch (error) {
        console.log(error)
    }   
}
