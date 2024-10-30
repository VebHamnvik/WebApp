import { z } from "zod";

export const ProjectSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    objective: z.string(),
    language: z.string(),
    createdAt: z.string().refine(date => {
        const today = new Date();
        const inputDate = new Date(date);
        const earliestDate = new Date("1995-06-02");
        return inputDate <= today && inputDate >= earliestDate;
    }, {
        message: "Date must be between 1995-06-02 and today."
    }),
    status: z.string(),
    isPublic: z.boolean(),
    tags: z.array(z.string()),
    image: z.string()
});

export const ProjectArraySchema = z.array(ProjectSchema);

export type ProjectType = z.infer<typeof ProjectSchema>;

export type CreateProject = z.infer<typeof ProjectSchema>;

export function validateProject(data: unknown) {
    return ProjectSchema.safeParse(data);
}

export type DbProject = {
    id: string;
    title: string;
    description: string;
    objective: string;
    language: string;
    createdAt: string;
    status: string;
    is_public: number;
    tags: string;
    image: string;
  };