import { getProjectsByCategory } from '$lib/projects';

export const prerender = true;

export function load() {
	return { groups: getProjectsByCategory() };
}
