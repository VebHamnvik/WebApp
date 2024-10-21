import { useState } from 'react';
import InputArea from "./InputArea";
import SubmitButton from "./SubmitButton";
import TextArea from "./TextArea";
import SelectArea from './SelectArea';


export default function BasicForm({ onAddProject }: { onAddProject: (project: any) => void }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [objective, setObjective] = useState('');
    const [language, setLanguage] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [status, setStatus] = useState('');
    const [isPublic, setIsPublic] = useState('');
    const [tags, setTags] = useState('');
    const [image, setImage] = useState('');

    const handleTagsInput = (tags: string) => {
        const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ""); // Split by comma, trim, and remove empty tags
        return tagsArray;
    };

    const publicOptions = [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" }
      ];

    
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const today = new Date();
        const inputDate = new Date(createdAt);

        if (inputDate > today) {
            alert("The date cannot be in the future.");
            return;
        }

        const earliestDate = new Date("1995-06-02");
        if (inputDate < earliestDate) {
            alert("The project date cannot be before I was born.");
            return;
        }
    

        const tagsArray = handleTagsInput(tags)

        const newProject = {
            
            title,
            description,
            objective,
            language,
            createdAt,
            status,
            isPublic: isPublic === 'Yes',
            tags: tagsArray,
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
                setCreatedAt('');
                setStatus('');
                setIsPublic('');
                setTags('');
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
            <InputArea id="project-date" placeholder="Date:" name="createdAt" type="date" value={createdAt} onChange={(e) => setCreatedAt(e.target.value)}/>
            <InputArea id="project-status" placeholder="Status:" name="status" type="text" value={status} onChange={(e) => setStatus(e.target.value)}/>
            <SelectArea id="project-isPublic" label="Public:" name="isPublic" value={isPublic} onChange={(e) => setIsPublic(e.target.value)} options={publicOptions} />
            <InputArea id="project-tags" placeholder="Tags (comma-separated):" name="tags" type="text" value={tags} onChange={(e) => setTags(e.target.value)}/>
            <InputArea id="project-image" placeholder="Image link:" name="image" type="text" value={image} onChange={(e) => setImage(e.target.value)}/>
            <SubmitButton />
        </form>
        </>
    )
}