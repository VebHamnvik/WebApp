import { v4 as uuidv4} from "uuid"


export const createId = (): string => {
    return uuidv4(); // Generates a new version 4 UUID
  };