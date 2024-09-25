
import { useEffect } from "react"
import { ProjectType, ProjectArraySchema } from "../backend/types/types"
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import BasicForm from "./components/Main/Forms/BasicForm"
import Title from "./components/Main/Title"
import Projects from "./components/Projects/Projects"
import { useState } from "react"


const App = () => {

  const [ projects, setProjects] = useState<ProjectType[]>([])

	const onAddProject = (project: { title: string, description: string, objective: string, language: string, image: string }) => {
		setProjects((prev: any) => [...prev, project]);
	};

  useEffect(() => {
    const loadProjects = async () => {
      try {
        console.log("Hei")
        const response = await fetch("http://localhost:3999/"); 
        console.log(response)
        const data = await response.json();
        console.log(data)

        
        const validatedProjects = ProjectArraySchema.parse(data);
        setProjects(validatedProjects);
      } catch (error) {
        console.error("Error loading projects:", error);
      }
    };

    loadProjects();
  }, []);

  return (
    <>
    <Header />
    <main id="main">
      <section id="new-project">
        <Title title="Add a new project" />
        <BasicForm onAddProject={onAddProject}/>
      </section>
      <section id="projects-list">
        <Title title="My projects:" />
        <Projects projects={projects}/>
      </section>
    </main>
    <Footer />
    </>
    
  )
}

export default App
