import { Project } from "../../backend/types/types"

export default function Card(props: Project) {
    const { id, title, description, objective, languages, image } = props


    return (
        <article>
            <h2>{ title }</h2>
            <p>{ description }</p>
            <p>{ objective }</p>
            <p>{ languages }</p>
        </article>
    )
}