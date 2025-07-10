import { useState } from "react"
import { meses, years } from "../data/data"

export default function Filtros() {

    const [filtros, setFiltros] = useState({
        buscar: '',
        mes: '0',
        year: '2025'
    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        setFiltros({
            ...filtros,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFiltros({
            buscar: '',
            mes: '0',
            year: '2025'
        })
    }

    return (
        <div className="border border-gray-300 rounded-lg p-6 w-[95%] md:w-[76%] mx-auto">
            <div>
                <div className="flex gap-1">
                    <img src="/filter.svg" alt="imagen de filtro" />
                    <h2 className="text-2xl font-semibold">Filtros</h2>
                </div>
                <p className="text-gray-500">Filtra las películas por mes y año</p>
            </div>

            <form 
                className="mt-6 flex flex-col md:flex-row md:items-end gap-6"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col gap-1 w-[100%] md:w-[260px]">
                    <label 
                        htmlFor="buscar"
                        className="font-semibold"
                    >Buscar</label>
                    <input 
                        type="text"
                        placeholder="Buscar películas..."
                        name="buscar" id="buscar"
                        className="border border-gray-300 rounded-md py-2 px-3"
                        value={filtros.buscar}
                        onChange={handleChange}
                    />
                </div>


                <div className="flex flex-col gap-1 w-[100%] md:w-[260px]">
                    <label 
                        htmlFor="mes"
                        className="font-semibold"
                    >Mes</label>
                    <select 
                        name="mes" 
                        id="mes"
                        className="border border-gray-300 rounded-md py-2 px-3"
                        value={filtros.mes}
                        onChange={handleChange}
                    >
                        <option value="0">Todos los meses</option>
                        {meses.map(mes => (
                            <option 
                                key={mes.value}
                                value={mes.value}
                            >{mes.name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-1 w-[100%] md:w-[260px]">
                    <label 
                        htmlFor="year"
                        className="font-semibold"
                    >Año</label>
                    <select 
                        name="year" id="year"
                        className="border border-gray-300 rounded-md py-2 px-3"
                        value={filtros.year}
                        onChange={handleChange}
                    >
                        {years.map(year => (
                            <option 
                                key={year}
                                value={year}
                            >{year}</option>
                        ))}
                    </select>
                </div>

                <button
                    className="border border-gray-300 rounded-md py-2 px-3 h-[41px] cursor-pointer hover:bg-gray-200 w-[100%] md:w-[260px] font-medium transition-colors"
                >Limpiar filtros</button>
            </form>
        </div>
    )
}
