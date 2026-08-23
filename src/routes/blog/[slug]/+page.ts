import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getAllPosts, getPostComponent } from '$lib/posts';

export const prerender = true;

export const entries = () => getAllPosts().map((post) => ({ slug: post.slug }));

export const load: PageLoad = ({ params }) => {
	const post = getPostComponent(params.slug);

	if (!post) {
		throw error(404, `Пост "${params.slug}" не найден`);
	}

	return post;
};
