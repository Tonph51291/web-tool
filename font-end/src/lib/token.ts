import Cookies from "js-cookie";

const TOKEN_KEY = "access_token";

export const tokenStorage = {
  get: (): string | null => {
    if (typeof window === "undefined") return null;
    return Cookies.get(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);
  },
  set: (token: string): void => {
    if (typeof window === "undefined") return;
    Cookies.set(TOKEN_KEY, token, { expires: 7, sameSite: "lax" });
    localStorage.setItem(TOKEN_KEY, token);
  },
  remove: (): void => {
    if (typeof window === "undefined") return;
    Cookies.remove(TOKEN_KEY);
    localStorage.removeItem(TOKEN_KEY);
  },
};

