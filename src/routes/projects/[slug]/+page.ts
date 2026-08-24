import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getAllProjects, getProjectComponent } from '$lib/projects';

export const prerender = true;

export const entries = () => getAllProjects().map((project) => ({ slug: project.slug }));

export const load: PageLoad = ({ params }) => {
	const project = getProjectComponent(params.slug);

	if (!project) {
		throw error(404, `Проект "${params.slug}" не найден`);
	}

	return project;
};
