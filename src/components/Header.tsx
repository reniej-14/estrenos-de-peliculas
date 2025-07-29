import { useLocation, useNavigate } from "react-router-dom"
import { useAppStore } from "../store"

export default function Header() {
    const location = useLocation()
    const navigate = useNavigate()

    const isFavoritas = location.pathname === "/Favoritas"

    const handleClick = () => {
        navigate(isFavoritas ? "/" : "/Favoritas")
    }

    const peliculasFavoritas = useAppStore((store) => store.peliculasFavoritas.results)
    const totalFavoritas = peliculasFavoritas.length

    return (
        <header className="border border-b-gray-300 border-t-0 border-l-0 border-r-0 mb-6 mx-auto">
            <div className="container mx-auto flex flex-col md:flex-row md:justify-between md:items-center w-[95%] md:w-full">
                <div className="py-6">
                    <h1 
                        className="text-2xl md:text-3xl font-bold"
                    >Estrenos de Películas</h1>
                    <p 
                        className="text-gray-500 text-[14px] md:text-[17px]"
                    >Descubre los últimos estrenos y próximos lanzamientos</p>
                </div>

                <button
                    onClick={handleClick}
                    className={`mb-6 md:mb-0 flex gap-2 justify-center items-center border rounded-md py-2 px-3 h-[41px] cursor-pointer transition-colors
                    ${isFavoritas ? "bg-black text-white hover:bg-gray-900" : "border-gray-300 hover:bg-gray-200"}`}
                >
                    <img
                        src={isFavoritas ? "/heart2.svg" : "/heart.svg"}
                        alt="Icono favoritas"
                        className={`w-5 h-5 ${isFavoritas ? "filter brightness-0 invert" : ""}`}
                    />
                    <p 
                        className="text-[14px] md:text-[16px] font-medium"
                    >{isFavoritas ? "Ver todas" : `Favoritas (${totalFavoritas})`}</p>
                </button>
            </div>
        </header>
    )
}
