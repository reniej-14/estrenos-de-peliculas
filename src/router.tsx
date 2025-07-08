import { BrowserRouter, Routes, Route } from "react-router-dom"
import Inicio from "./views/Inicio"
import Layout from "./layouts/Layout"

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<Inicio/>} index/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
