import { HeatmapChart } from "../subs/heatmap"
import markovTransitionsData from "@/data/markov_matrix.json"

export function Markov() {
    return (
        <section className="h-screen w-screen">
            <HeatmapChart data={markovTransitionsData}/>
        </section>
    )
}