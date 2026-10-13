export const projectFilters = [
  { id: "all", label: "All work" },
  { id: "applied", label: "Applied AI" },
  { id: "operations", label: "AI operations" },
  { id: "workshops", label: "Workshops" },
] as const;

export type ProjectFilter = (typeof projectFilters)[number]["id"];
export type ProjectCategory = Exclude<ProjectFilter, "all">;
export type WritingKind = "article" | "post";
export type WritingFilter = "all" | WritingKind;

export function isProjectFilter(value: string): value is ProjectFilter {
  return projectFilters.some((filter) => filter.id === value);
}

export function isWritingFilter(value: string): value is WritingFilter {
  return value === "all" || value === "article" || value === "post";
}

export function matchesProject(categories: readonly string[], filter: ProjectFilter): boolean {
  return filter === "all" || categories.includes(filter);
}

export function normalizeSearch(value: string): string {
  return value.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase().trim().replace(/\s+/g, " ");
}

export function matchesSearch(text: string, query: string): boolean {
  const haystack = normalizeSearch(text);
  return normalizeSearch(query).split(" ").filter(Boolean).every((term) => haystack.includes(term));
}

export function resultLabel(count: number, noun: string, plural = `${noun}s`): string {
  return `${count} ${count === 1 ? noun : plural}`;
}
