import { ProjectType } from "../../../backend/types/types"

export default function Project(props: ProjectType) {
    const { title, description, objective, language, image } = props


    return (
        <>
            <h3 className="project-title">{title}</h3>
            <p className="project-objective">{objective}</p>
            <p className="project-languages">{language}</p>
            <div className="project-image">
                <img src={image} alt={`${title} project`} />
            </div>
        </>
    )
}