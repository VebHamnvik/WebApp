import { z } from "zod";

export const ProjectSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    objective: z.string(),
    languages: z.string(),
    image: z.string()
});

export const ProjectCreateSchema = ProjectSchema.omit({ id:true });

export const ProjectArraySchema = z.array(ProjectSchema);

export type ProjectType = z.infer<typeof ProjectSchema>;

export type CreateProject = z.infer<typeof ProjectCreateSchema>;