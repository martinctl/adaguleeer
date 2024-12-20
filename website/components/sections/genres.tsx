import { GenresBarChart } from "../subs/genres-bar-chart"
import { GenresChordChart } from "../subs/genres-chord-chart"


export function Genres() {
    return (
        <section>
            <GenresBarChart />
            <GenresChordChart />
        </section>
    )
}