import type { Component } from 'svelte';
import { PROJECT_CATEGORIES } from './types';
import type { ProjectModule, ProjectMeta, ProjectCategory } from './types';

const modules = import.meta.glob<ProjectModule>('/src/lib/projects/*.svelte', { eager: true });

export interface Project extends ProjectMeta {
	slug: string;
}

export interface ProjectGroup {
	category: ProjectCategory;
	label: string;
	projects: Project[];
}

export function getAllProjects(): Project[] {
	return Object.entries(modules)
		.map(([path, mod]) => ({
			slug: path.split('/').pop()!.replace('.svelte', ''),
			...mod.metadata
		}))
		.filter((project) => project.published)
		.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getProjectsByCategory(): ProjectGroup[] {
	const all = getAllProjects();

	return (Object.keys(PROJECT_CATEGORIES) as ProjectCategory[])
		.map((category) => ({
			category,
			label: PROJECT_CATEGORIES[category],
			projects: all.filter((project) => project.category === category)
		}))
		.filter((group) => group.projects.length > 0);
}

export function getProjectComponent(
	slug: string
): { component: Component; meta: ProjectMeta } | null {
	const entry = Object.entries(modules).find(([path]) => path.endsWith(`/${slug}.svelte`));

	if (!entry) return null;

	const [, mod] = entry;

	if (mod.metadata.published === false) return null;

	return { component: mod.default, meta: mod.metadata };
}
