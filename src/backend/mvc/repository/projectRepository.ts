import type { DB } from "../../db/db";
import { Result } from "../../types/resultTypes";
import { ProjectType } from "../../types/projectTypes";

import { fromDb, toDb } from "../mappers";


export const createHabitRepository = (db: DB) => {

    const exist = async (id: string): Promise<boolean> => {
        const query = db.prepare(
          "SELECT COUNT(*) as count FROM projects WHERE id = ?"
        );
        const data = query.get(id) as { count: number };
        return data.count > 0;
      };

    const create = async (data: ProjectType): Promise<Result<string>> => {
    try {
        const query = db.prepare(`
        INSERT INTO projects (id, title, description, objective, language, created_at, status, is_public, tags, image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
    
        query.run(
        data.id,
        data.title,
        data.description,
        data.objective,
        data.language,
        data.createdAt,
        data.status,
        data.isPublic ? 1 : 0,
        data.tags.join(","),
        data.image
        );
    
        return {
        success: true,
        data: data.title,
        };
    } catch (error) {
        return {
            success: false,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                message: error instanceof Error ? error.message : "An unknown error occurred",
            },
        };
    }
    };

    const list = async (): Promise<Result<ProjectType[]>> => {
        try {
          const query = db.prepare("SELECT * FROM projects");
          const data = query.all() as ProjectType[];
      
          return {
            success: true,
            data,
          };
        } catch (error) {
            return {
                success: false,
                error: {
                code: "INTERNAL_SERVER_ERROR",
                message: error instanceof Error ? error.message : "An unknown error occurred",
                },
            };
        }
      };

      const update = async (data: Partial<ProjectType>): Promise<Result<Partial<ProjectType>>> => {
        try {
            if (!data.id) {
                return {
                    success: false,
                    error: {
                    code: "INVALID_DATA",
                    message: "Project title is missing",
                    },
                };
                }

            const projectExist = await exist(data.id);
        
            if (!projectExist) {
                return {
                    success: false,
                    error: {
                        code: "NOT_FOUND",
                        message: "Project not found",
                    },
                };
            }
        

            const query = db.prepare(`
                UPDATE projects
                SET title = ?, description = ?, objective = ?, language = ?, status = ?, is_public = ?, tags = ?, image = ?, updated_at = ?
                WHERE id = ?
            `);
        
            query.run(
                data.title,
                data.description,
                data.objective,
                data.language,
                data.status,
                data.isPublic ? 1 : 0, 
                data.tags?.join(","),
                data.image,
                new Date().toISOString(), 
                data.id
            );
        
            return {
                success: true,
                data,
            };
        } catch (error) {
            return {
                success: false,
                error: {
                code: "INTERNAL_SERVER_ERROR",
                message: error instanceof Error ? error.message : "An unknown error occurred",
                },
            };
        }
      };

      const remove = async (id: string): Promise<Result<string>> => {
            try {
                const projectExists = await exist(id);
                if (!projectExists) {
                    return {
                    success: false,
                    error: {
                        code: "NOT_FOUND",
                        message: "Project not found",
                    },
                    };
                }
            
                const query = db.prepare("DELETE FROM projects WHERE id = ?");
                query.run(id);
            
                return {
                    success: true,
                    data: id,
                };
            } catch (error) {
                return {
                    success: false,
                    error: {
                    code: "INTERNAL_SERVER_ERROR",
                    message: error instanceof Error ? error.message : "An unknown error occurred",
                    },
                };
            }
      };

      const getProjectById = async (id: string): Promise<Result<ProjectType | undefined>> => {
        try {
            const projectExists = await exist(id);
            if (!projectExists) {
                return {
                success: false,
                error: {
                    code: "NOT_FOUND",
                    message: "Project not found",
                },
                };
            }
        
            const query = db.prepare("SELECT * FROM projects WHERE id = ?");
            const data = query.get(id) as ProjectType;
        
            return {
                success: true,
                data: fromDb(data),
            };
        } catch (error) {
            return {
                success: false,
                error: {
                code: "INTERNAL_SERVER_ERROR",
                message: error instanceof Error ? error.message : "An unknown error occurred",
                },
            };
        }
      };


  return { create, list, update, remove, getProjectById };
};

export type HabitRepository = ReturnType<typeof createHabitRepository>;