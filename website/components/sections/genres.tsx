import { GenresBarChart } from "../subs/genres-bar-chart"
import { GenresUploadDateChart } from "../subs/genres-upload-date-chart"
import { GenresChordChart } from "../subs/genres-chord-chart"


export function Genres() {
    return (
        <section>
            <GenresBarChart />
            <GenresUploadDateChart />
            <GenresChordChart />
        </section>
    )
}