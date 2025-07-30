import { BrowserRouter, Routes, Route } from "react-router-dom"
import Inicio from "./views/Inicio"
import Layout from "./layouts/Layout"
import Favorite from "./views/Favorite"
import PeliculaInfo from "./components/PeliculaInfo"

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<Inicio/>} index/>
                    <Route path="/Favoritas" element={<Favorite/>}/>
                    <Route path="/pelicula-info" element={<PeliculaInfo/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
