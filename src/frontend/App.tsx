
import BasicForm from "./components/Main/Forms/BasicForm"
import Title from "./components/Main/Title"
import Projects from "./components/Projects/Projects"
import Layout from "./components/Structure/Layout"
import { useProjects } from "./hooks/useProjects"


const App = () => {
  const { projects, setProjects, error, loading } = useProjects();

  

	const onAddProject = (project: { title: string, description: string, objective: string, language: string, createdAt: string, image: string }) => {
		setProjects((prev: any) => [...prev, project]);
	};

  

  return (
    <>
    <Layout>
      <section id="new-project">
        <Title id="new-project-title" title="Add a new project" />
        <BasicForm onAddProject={onAddProject}/>
      </section>
      <section id="projects-list">
        <Title id="project-list-title" title="My projects:" />
        {loading ? <p>Loading projects...</p> : <Projects projects={projects}/>}
      </section>
    </Layout>
    </>
    
  )
}

export default App
