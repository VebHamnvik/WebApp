import { z } from "zod";

export const ProjectSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    objective: z.string(),
    language: z.string(),
    createdAt: z.string(),
    status: z.string(),
    isPublic: z.boolean(),
    tags: z.array(z.string()),
    image: z.string()
});

export const ProjectArraySchema = z.array(ProjectSchema);

export type ProjectType = z.infer<typeof ProjectSchema>;

export type CreateProject = z.infer<typeof ProjectSchema>;

export type DbProject = {
    id: string;
    title: string;
    description: string;
    objective: string;
    language: string;
    created_at: string;
    status: string;
    is_public: number;
    tags: string;
    image: string;
  };