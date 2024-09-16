import { ProjectType } from "../../../backend/types/types"

export default function Project(props: ProjectType) {
    const { id, title, description, objective, languages, image } = props


    return (
        <>
            <h3 className="project-title">{title}</h3>
            <p className="project-objective">{objective}</p>
            <p className="project-languages">{languages}</p>
            <div className="project-image">
                <img src={image} alt={`${title} project`} />
            </div>
        </>
    )
}