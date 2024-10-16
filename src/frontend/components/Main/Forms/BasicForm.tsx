import { useState } from 'react';
import InputArea from "./InputArea";
import SubmitButton from "./SubmitButton";
import TextArea from "./TextArea";


export default function BasicForm({ onAddProject }: { onAddProject: (project: any) => void }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [objective, setObjective] = useState('');
    const [language, setLanguage] = useState('');
    const [image, setImage] = useState('');

    
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    

        const newProject = {
            
            title,
            description,
            objective,
            language,
            image
        };

        try {
            const response = await fetch("http://localhost:3999/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProject),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Project added successfully:", data);
                onAddProject(newProject);

                setTitle('');
                setDescription('');
                setObjective('');
                setLanguage('');
                setImage('');
            } else {
                console.error("Failed to add project", response.status);
            }
        } catch (error) {
            console.error("Error submitting the project:", error);
        }
    };


    return (
        <>
        <form onSubmit={handleSubmit} id="project-form" method="post">
            <InputArea id="project-title" placeholder="Title:" name="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <TextArea id="project-description" placeholder="Description:" name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            <InputArea id="project-objective" placeholder="Objective:" name="objective" type="text" value={objective} onChange={(e) => setObjective(e.target.value)}/>
            <InputArea id="project-language" placeholder="Languages:" name="language" type="text" value={language} onChange={(e) => setLanguage(e.target.value)}/>
            <InputArea id="project-image" placeholder="Image link:" name="image" type="text" value={image} onChange={(e) => setImage(e.target.value)}/>
            <SubmitButton />
        </form>
        </>
    )
}