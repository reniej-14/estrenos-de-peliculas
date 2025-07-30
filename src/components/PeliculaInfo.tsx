import { useAppStore } from "../store"


export default function PeliculaInfo() {

    const peliculaInfo = useAppStore((state) => state.peliculaInfo)
    console.log(peliculaInfo)
    return (
        <div>PeliculaInfo</div>
    )
}
