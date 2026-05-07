import type { PujRoute } from "../types/puj";

const FAVORITES_KEY = "puj-favorites";
const RECENT_KEY = "puj-recent";
const MAX_RECENT = 6;

export function getFavoriteCodes(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function saveFavoriteCodes(codes: string[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(new Set(codes))));
}

export function toggleFavoriteCode(code: string): string[] {
  const favorites = getFavoriteCodes();
  const next = favorites.includes(code)
    ? favorites.filter((item) => item !== code)
    : [...favorites, code];
  saveFavoriteCodes(next);
  return next;
}

export function getRecentRoutes(): PujRoute[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (route): route is PujRoute =>
        route && typeof route === "object" && typeof route.code === "string"
    );
  } catch {
    return [];
  }
}

export function saveRecentRoutes(routes: PujRoute[]) {
  localStorage.setItem(RECENT_KEY, JSON.stringify(routes.slice(0, MAX_RECENT)));
}

export function addRecentRoute(route: PujRoute): PujRoute[] {
  const recent = getRecentRoutes();
  const next = [route, ...recent.filter((item) => item.code !== route.code)].slice(0, MAX_RECENT);
  saveRecentRoutes(next);
  return next;
}
