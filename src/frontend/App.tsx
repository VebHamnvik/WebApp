import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import BasicForm from "./components/Main/Forms/BasicForm"
import Title from "./components/Main/Title"
import Projects from "./components/Projects/Projects"

const App = () => {
  return (
    <>
    <Header />
    <main id="main">
      <section id="new-project">
        <Title title="Add a new project" />
        <BasicForm />
      </section>
      <section id="projects-list">
        <Title title="My projects:" />
        <Projects />
      </section>
    </main>
    <Footer />
    </>
    
  )
}

export default App
