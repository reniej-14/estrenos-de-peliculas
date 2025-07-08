

export default function Header() {
    return (
        <header className="border border-b-gray-300 border-t-0 border-l-0 border-r-0 mb-6 w-[95%] mx-auto md:w-full">
            <div className="container mx-auto flex justify-between items-center">
                <div className="py-6">
                    <h1 className="text-2xl md:text-3xl font-bold">Estrenos de Películas</h1>
                    <p className="text-gray-500 text-[14px] md:text-[17px]">Descubre los últimos estrenos y próximos lanzamientos</p>
                </div>

                <div>
                    <p className="text-gray-500 text-[14px] md:text-[16px] ">6 películas encontradas</p>
                </div>
            </div>
        </header>
    )
}
