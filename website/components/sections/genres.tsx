import { GenresBarChart } from "../subs/genres-bar-chart"
import { GenresChordChart } from "../subs/genres-chord-chart"
import { GenresUploadDateChart } from "../subs/genres-upload-date-chart"


export function Genres() {
    return (
        <section>
            <GenresChordChart />
            <GenresBarChart />
            <GenresUploadDateChart />
        </section>
    )
}