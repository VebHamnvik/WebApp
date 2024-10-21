import { users } from "../data/users"
import type { User } from "../types/userType"


const parseCookie = (cookie: string) => {
  if (!cookie) return {};
  return Object.fromEntries(
    cookie.split(";").map((cookie) => cookie.trim().split("="))
  );
};


export function getUserFromCookies(): User | null {
  const cookies = parseCookie(document.cookie);
  const userRole = cookies["user.role"];

  if (!userRole) return null;

  return users.find((user) => user.role === userRole) ?? null;
}