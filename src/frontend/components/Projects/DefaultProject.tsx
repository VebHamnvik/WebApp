import { ProjectType } from "../../../backend/types/projectTypes"
import { dateFormatter } from "../../../backend/util/dateFormatter"

export default function DefaultProject(props: ProjectType) {
    const { id, title, description, objective, language, createdAt, status, isPublic, tags, image } = props
    const formattedDate = dateFormatter(createdAt)

    return (
        <>
            <h3 className="project-title">{title}</h3>
            <p className="project-objective">{objective}</p>
            <p className="project-languages">{language}</p>
            <p className="project-date">{formattedDate}</p>
            <div className="project-image">
                <img src={image} alt={`${title} project`} />
            </div>
        </>
    )
}