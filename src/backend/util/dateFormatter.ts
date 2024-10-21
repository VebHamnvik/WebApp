import { format } from "date-fns";
import { nb } from "date-fns/locale";

export function dateFormatter(dateString: string): string {
    const date = new Date(dateString);
    return format(date, "PPP", { locale: nb });
}