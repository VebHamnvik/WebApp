import { ProjectType } from "../../../backend/types/projectTypes"
import { dateFormatter } from "../../../backend/util/dateFormatter";

export default function ExpandedProjectView(props: ProjectType) {
    const { title, description, objective, language, createdAt, status, isPublic, tags, image } = props

    const formattedDate = dateFormatter(createdAt)


    return (
      <div className="expanded-project-view">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
        <p className="project-objective">Objective: {objective}</p>
        <p className="project-languages">Language: {language}</p>
        <p className="project-date">Status: {status}</p>
        <p className="project-createdAt">Published At: {formattedDate}</p>
        <p className="project-tags">Tags: {tags.join(", ")}</p>
        <p className="project-ispublic">Public: {isPublic ? "Yes" : "No"}</p>
        <div className="project-image">
            <img src={image} alt={`imagelink`} />
        </div>
      </div>
    );
  };